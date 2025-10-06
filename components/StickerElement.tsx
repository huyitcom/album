
import React, { useState, useRef, useEffect } from 'react';
import { StickerElement as StickerElementType } from '../types';
import { XMarkIcon, ArrowPathIcon } from './icons';
import { useI18n } from './i18n';

interface StickerElementProps {
  spreadId: string;
  data: StickerElementType;
  isSelected: boolean;
  onSelect: (stickerId: string | null) => void;
  onUpdate: (spreadId: string, stickerId: string, newStickerData: Partial<StickerElementType>) => void;
  onRemove: (spreadId: string, stickerId: string) => void;
}

const StickerElement: React.FC<StickerElementProps> = ({ spreadId, data, isSelected, onSelect, onUpdate, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const { t } = useI18n();

  const elementRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ 
    x: 0, y: 0, 
    elX: 0, elY: 0, elW: 0, elH: 0, 
    centerX: 0, centerY: 0,
    startAngle: 0
  });
  
  const handleActionMouseDown = (e: React.MouseEvent<HTMLDivElement>, action: 'drag' | 'resize' | 'rotate', handle?: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(data.id);
    
    if (action === 'drag') setIsDragging(true);
    if (action === 'resize' && handle) setIsResizing(handle);
    if (action === 'rotate') setIsRotating(true);
    
    const elRect = elementRef.current?.getBoundingClientRect();
    if (!elRect) return;

    const centerX = elRect.left + elRect.width / 2;
    const centerY = elRect.top + elRect.height / 2;
    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    
    dragStartRef.current = {
      x: e.clientX, y: e.clientY,
      elX: data.x, elY: data.y, elW: data.width, elH: data.height,
      centerX, centerY,
      startAngle: startAngle - data.rotation
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (!elementRef.current) return;
      const parentRect = elementRef.current.parentElement?.getBoundingClientRect();
      if (!parentRect || parentRect.width === 0 || parentRect.height === 0) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      if (isDragging) {
        const newX = dragStartRef.current.elX + (dx / parentRect.width) * 100;
        const newY = dragStartRef.current.elY + (dy / parentRect.height) * 100;
        onUpdate(spreadId, data.id, { x: newX, y: newY });
      } else if (isResizing) {
          const startVisualWidth = dragStartRef.current.elW / 100 * parentRect.width;
          const startVisualHeight = dragStartRef.current.elH / 100 * parentRect.height;
          
          if (startVisualHeight === 0) return; // Avoid division by zero
          const visualAspectRatio = startVisualWidth / startVisualHeight;

          let newVisualWidth = startVisualWidth;
          if (isResizing.includes('right')) newVisualWidth += dx;
          if (isResizing.includes('left')) newVisualWidth -= dx;

          const newVisualHeight = newVisualWidth / visualAspectRatio;
          
          const newWidthPercent = (newVisualWidth / parentRect.width) * 100;
          const newHeightPercent = (newVisualHeight / parentRect.height) * 100;

          onUpdate(spreadId, data.id, { width: Math.max(3, newWidthPercent), height: Math.max(3, newHeightPercent) });
      } else if (isRotating) {
        const { centerX, centerY, startAngle } = dragStartRef.current;
        const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        onUpdate(spreadId, data.id, { rotation: currentAngle - startAngle });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      setIsRotating(false);
    };

    if (isDragging || isResizing || isRotating) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, isRotating, onUpdate, spreadId, data.id]);

  const resizeHandles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

  return (
    <div
      ref={elementRef}
      className="absolute cursor-move pointer-events-auto"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        width: `${data.width}%`,
        height: `${data.height}%`,
        transform: `rotate(${data.rotation}deg)`,
        zIndex: isSelected ? 30 : 20,
      }}
      onMouseDown={(e) => handleActionMouseDown(e, 'drag')}
      data-sticker-element="true"
    >
      <div className={`w-full h-full ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}>
        <img src={data.url} alt="sticker" className="w-full h-full object-contain pointer-events-none" draggable="false" />
      </div>

      {isSelected && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(spreadId, data.id); }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow z-50 transform-none"
            title={t('removeStickerTitle')}
            data-hide-on-capture="true"
          >
            <XMarkIcon className="w-3 h-3"/>
          </button>
          {resizeHandles.map(handle => (
              <div 
                key={handle}
                className={`absolute w-3 h-3 bg-white border border-gray-500 rounded-full z-40 ${handle.includes('left') ? '-left-1.5' : '-right-1.5'} ${handle.includes('top') ? '-top-1.5' : '-bottom-1.5'} 
                ${(handle === 'top-left' || handle === 'bottom-right') ? 'cursor-nwse-resize' : 'cursor-nesw-resize'}`}
                onMouseDown={(e) => handleActionMouseDown(e, 'resize', handle)}
                data-hide-on-capture="true"
              />
          ))}
          <div
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border border-gray-500 rounded-full flex items-center justify-center cursor-alias z-40"
            onMouseDown={(e) => handleActionMouseDown(e, 'rotate')}
            title={t('rotateStickerTitle')}
            data-hide-on-capture="true"
          >
            <ArrowPathIcon className="w-3 h-3 text-gray-700" />
          </div>
        </>
      )}
    </div>
  );
};

export default StickerElement;