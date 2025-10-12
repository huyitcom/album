

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PlacedImageData, ImageTransform } from '../types';
import { XMarkIcon, PencilIcon, ArrowUturnRightIcon, ArrowsRightLeftIcon, ArrowsUpDownIcon, CheckIcon } from './icons';
import { useI18n } from './i18n';

interface PlacedImageProps {
  data: PlacedImageData;
  spreadId: string;
  slotId: string;
  isMobile: boolean;
  isOverviewMode: boolean;
  onTransformChange: (newTransform: ImageTransform) => void;
  onRemove: () => void;
  onEnterEditMode?: (slotId: string) => void;
  onExitEditMode?: () => void;
}

const PlacedImage: React.FC<PlacedImageProps> = ({ data, spreadId, slotId, isMobile, onTransformChange, onRemove, isOverviewMode, onEnterEditMode, onExitEditMode }) => {
  const { image, transform } = data;
  const { x, y, scale, rotation, flipHorizontal, flipVertical } = transform;

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMouseDragging, setIsMouseDragging] = useState(false); // For mouse panning only
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, imageX: 0, imageY: 0 });
  const [coverStyle, setCoverStyle] = useState<{ width?: string; height?: string }>({});
  const lastTap = useRef(0);
  const { t } = useI18n();

  useEffect(() => {
    const img = imageRef.current;
    const container = containerRef.current;

    const calculateCoverStyle = () => {
        if (!img || !container) return;
        const { naturalWidth, naturalHeight } = img;
        const { offsetWidth, offsetHeight } = container;

        if (!naturalWidth || !naturalHeight || !offsetWidth || !offsetHeight) return;

        const imgRatio = naturalWidth / naturalHeight;
        const containerRatio = offsetWidth / offsetHeight;

        if (imgRatio > containerRatio) {
            setCoverStyle({ height: '100%', width: 'auto' });
        } else {
            setCoverStyle({ width: '100%', height: 'auto' });
        }
    };

    if (img?.complete && img.naturalWidth > 0) {
        calculateCoverStyle();
    } else if (img) {
        img.onload = calculateCoverStyle;
    }

    const observer = new ResizeObserver(calculateCoverStyle);
    if(container) observer.observe(container);

    return () => {
        if(img) img.onload = null;
        if(container) observer.disconnect();
    }
  }, [image.url]);

  
  const getConstrainedPosition = useCallback((newX: number, newY: number, currentScale: number) => {
    if (!containerRef.current || !imageRef.current) {
        return { constrainedX: newX, constrainedY: newY };
    }
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
    const { naturalWidth, naturalHeight } = imageRef.current;
    
    if (naturalWidth === 0 || naturalHeight === 0) {
      return { constrainedX: newX, constrainedY: newY };
    }
    
    const imgAspectRatio = naturalWidth / naturalHeight;
    const containerAspectRatio = containerW / containerH;

    let scaledW, scaledH;
    if (imgAspectRatio > containerAspectRatio) {
        scaledH = containerH * currentScale;
        scaledW = scaledH * imgAspectRatio;
    } else {
        scaledW = containerW * currentScale;
        scaledH = scaledW / imgAspectRatio;
    }

    const xOverhang = Math.max(0, (scaledW - containerW) / 2);
    const yOverhang = Math.max(0, (scaledH - containerH) / 2);

    const xMaxPercentage = (xOverhang / containerW) * 100;
    const yMaxPercentage = (yOverhang / containerH) * 100;

    const constrainedX = Math.max(50 - xMaxPercentage, Math.min(newX, 50 + xMaxPercentage));
    const constrainedY = Math.max(50 - yMaxPercentage, Math.min(newY, 50 + yMaxPercentage));
    
    return { constrainedX, constrainedY };
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation(); 
    e.dataTransfer.setData('album/placed-image', JSON.stringify({ spreadId, slotId }));
    e.dataTransfer.effectAllowed = 'move';
    
    setTimeout(() => {
        if(containerRef.current) containerRef.current.style.opacity = '0.5';
    }, 0);
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
     if(containerRef.current) containerRef.current.style.opacity = '1';
  };

  // --- Mouse Panning Logic ---
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();
    setIsMouseDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      imageX: transform.x,
      imageY: transform.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDragging || !containerRef.current) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
      if (containerW === 0 || containerH === 0) return;
      
      const newX = dragStartRef.current.imageX + (dx / containerW) * 100;
      const newY = dragStartRef.current.imageY + (dy / containerH) * 100;

      const { constrainedX, constrainedY } = getConstrainedPosition(newX, newY, scale);
      onTransformChange({ ...transform, x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => {
      setIsMouseDragging(false);
    };

    if (isMouseDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDragging, onTransformChange, scale, transform, getConstrainedPosition]);


  // --- Touch Panning Logic ---
  const handleTouchStartPan = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isEditing || e.touches.length !== 1) return;
    
    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    const dragStart = {
        x: touch.clientX,
        y: touch.clientY,
        imageX: transform.x,
        imageY: transform.y,
    };
    
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault();
      
      if (moveEvent.touches.length !== 1) return;

      const moveTouch = moveEvent.touches[0];
      const dx = moveTouch.clientX - dragStart.x;
      const dy = moveTouch.clientY - dragStart.y;
      
      const { width: containerW, height: containerH } = container.getBoundingClientRect();
      if (containerW === 0 || containerH === 0) return;
      
      const newX = dragStart.imageX + (dx / containerW) * 100;
      const newY = dragStart.imageY + (dy / containerH) * 100;

      const { constrainedX, constrainedY } = getConstrainedPosition(newX, newY, scale);
      onTransformChange({ ...transform, x: constrainedX, y: constrainedY });
    };

    const handleTouchEnd = (endEvent: TouchEvent) => {
      endEvent.preventDefault();
      
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('touchcancel', handleTouchEnd, { passive: false });
  };


  const handleZoomChange = (newScale: number) => {
    const { constrainedX, constrainedY } = getConstrainedPosition(transform.x, transform.y, newScale);
    onTransformChange({ ...transform, scale: newScale, x: constrainedX, y: constrainedY });
  };
  
  const handleRotate = (degrees: number) => {
    onTransformChange({ ...transform, rotation: (transform.rotation + degrees + 360) % 360 });
  };

  const handleFlipHorizontal = () => {
    onTransformChange({ ...transform, flipHorizontal: !transform.flipHorizontal });
  };

  const handleFlipVertical = () => {
    onTransformChange({ ...transform, flipVertical: !transform.flipVertical });
  };
  
  const handleEnterEditMode = useCallback(() => {
    if (!isOverviewMode) {
      setIsEditing(true);
      onEnterEditMode?.(slotId);
    }
  }, [isOverviewMode, onEnterEditMode, slotId]);
  
  const handleExitEditMode = useCallback(() => {
    setIsEditing(false);
    onExitEditMode?.();
  }, [onExitEditMode]);
  
  const handleTouchStartForEdit = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isEditing) return;
    const now = new Date().getTime();
    if ((now - lastTap.current) < 300) {
        e.preventDefault();
        handleEnterEditMode();
    }
    lastTap.current = now;
  };

  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleExitEditMode();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, handleExitEditMode]);

  const renderDesktopToolbar = () => (
    <div className="grid grid-cols-2 gap-2 items-center">
      <div className="flex items-center space-x-2">
        <label htmlFor={`zoom-${image.id}`} className="text-xs font-medium text-white whitespace-nowrap">{t('zoom')}</label>
        <input
          id={`zoom-${image.id}`}
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={scale}
          onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-end space-x-1">
        <button onClick={() => handleRotate(90)} title={t('rotateRightTitle')} className="p-1.5 text-white bg-gray-700/50 rounded hover:bg-gray-600/50"><ArrowUturnRightIcon className="w-4 h-4" /></button>
        <div className="h-5 border-l border-gray-600 mx-1"></div>
        <button onClick={handleFlipHorizontal} title={t('flipHorizontalTitle')} className="p-1.5 text-white bg-gray-700/50 rounded hover:bg-gray-600/50"><ArrowsRightLeftIcon className="w-4 h-4" /></button>
        <button onClick={handleFlipVertical} title={t('flipVerticalTitle')} className="p-1.5 text-white bg-gray-700/50 rounded hover:bg-gray-600/50"><ArrowsUpDownIcon className="w-4 h-4" /></button>
          <div className="h-5 border-l border-gray-600 mx-1"></div>
        <button onClick={handleExitEditMode} className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
            <CheckIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderMobileToolbar = () => (
    <div className="flex flex-col gap-2">
      {/* Row 1: Zoom Slider */}
      <input
        aria-label={t('zoom')}
        type="range"
        min="1"
        max="3"
        step="0.01"
        value={scale}
        onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
      />
      {/* Row 2: Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
            <button onClick={() => handleRotate(90)} title={t('rotateRightTitle')} className="p-2 text-white bg-gray-700/50 rounded-md hover:bg-gray-600/50"><ArrowUturnRightIcon className="w-5 h-5" /></button>
            <div className="h-6 border-l border-gray-600 mx-1"></div>
            <button onClick={handleFlipHorizontal} title={t('flipHorizontalTitle')} className="p-2 text-white bg-gray-700/50 rounded-md hover:bg-gray-600/50"><ArrowsRightLeftIcon className="w-5 h-5" /></button>
            <button onClick={handleFlipVertical} title={t('flipVerticalTitle')} className="p-2 text-white bg-gray-700/50 rounded-md hover:bg-gray-600/50"><ArrowsUpDownIcon className="w-5 h-5" /></button>
        </div>
        <button onClick={handleExitEditMode} className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <CheckIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div 
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden select-none ${!isEditing && !isOverviewMode ? 'cursor-move' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        draggable={!isEditing && !isOverviewMode}
        onDragStart={!isEditing && !isOverviewMode ? handleDragStart : undefined}
        onDragEnd={!isEditing && !isOverviewMode ? handleDragEnd : undefined}
        onDoubleClick={handleEnterEditMode}
        onTouchStart={handleTouchStartForEdit}
        title={!isEditing && !isOverviewMode ? t(isMobile ? 'doubleTapToEdit' : 'doubleClickToEdit') : undefined}
    >
        <div 
            className={`w-full h-full ${isEditing ? (isMouseDragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStartPan}
        >
            <img
                ref={imageRef}
                src={image.url}
                alt={image.id}
                className="absolute pointer-events-none"
                style={{
                  transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg) scaleX(${flipHorizontal ? -1 : 1}) scaleY(${flipVertical ? -1 : 1})`,
                  top: `${y}%`,
                  left: `${x}%`,
                  ...coverStyle,
                  maxWidth: 'none',
                  maxHeight: 'none',
                }}
            />
        </div>

      {/* Hover Controls (Edit/Remove) */}
      {isHovered && !isEditing && !isOverviewMode && (
        <div 
            data-hide-on-capture="true"
            className="absolute top-1 right-1 flex items-center space-x-1 bg-black/50 p-0.5 rounded-md z-10"
        >
            <button onClick={handleEnterEditMode} className="p-1 text-white hover:bg-white/30 rounded">
                <PencilIcon className="w-4 h-4" />
            </button>
            <button onClick={onRemove} className="p-1 text-white hover:bg-red-500/80 rounded">
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
      )}

      {/* In-place Editing Toolbar */}
      {isEditing && (
        <div 
            data-hide-on-capture="true"
            className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 z-20"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
        >
          {isMobile ? renderMobileToolbar() : renderDesktopToolbar()}
        </div>
      )}
    </div>
  );
};

export default PlacedImage;
