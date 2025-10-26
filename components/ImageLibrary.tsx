

import React, { useRef, useState } from 'react';
import { AlbumImage } from '../types';
import { LinkIcon, XMarkIcon } from './icons';
import { useI18n } from './i18n';

interface ImageLibraryProps {
  images: AlbumImage[];
  totalImages: number;
  onAddImages: (files: FileList) => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onRemoveImage: (imageId: string) => void;
  onClearLibrary: () => void;
  isMobile: boolean;
  onImageTouchStart: (image: AlbumImage, event: React.TouchEvent<HTMLDivElement>) => void;
}

const ImageLibrary: React.FC<ImageLibraryProps> = ({ images, totalImages, onAddImages, onReorder, onRemoveImage, onClearLibrary, isMobile, onImageTouchStart }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { t } = useI18n();

  const draggedItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onAddImages(e.target.files);
    }
  };

  const handleDragOverFile = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Check if files are being dragged
    if (e.dataTransfer.types.includes('Files')) {
      setIsDraggingOver(true);
    }
  };
  
  const handleDragLeaveFile = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // A brief timeout helps prevent flickering when moving over child elements
    setTimeout(() => {
        setIsDraggingOver(false);
    }, 50);
  };
  
  const handleDropFile = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddImages(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, imageId: string, index: number) => {
    // For dropping on album spreads
    e.dataTransfer.setData('album/image-id', imageId);
    e.dataTransfer.effectAllowed = 'copy';

    // For reordering within the library
    draggedItemIndex.current = index;
    setTimeout(() => {
        const draggedElement = document.getElementById(`lib-img-thumb-${imageId}`);
        if(draggedElement) draggedElement.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnter = (index: number) => {
    if (draggedItemIndex.current !== null && draggedItemIndex.current !== index) {
      dragOverItemIndex.current = index;
    }
  };
  
  const handleDragEnd = (imageId: string) => {
    if (draggedItemIndex.current !== null) {
      const draggedElement = document.getElementById(`lib-img-thumb-${imageId}`);
      if(draggedElement) draggedElement.style.opacity = '1';

      if (dragOverItemIndex.current !== null && dragOverItemIndex.current !== draggedItemIndex.current) {
        onReorder(draggedItemIndex.current, dragOverItemIndex.current);
      }
    }
    draggedItemIndex.current = null;
    dragOverItemIndex.current = null;
  };
  
  const gridContainerClass = isMobile 
    ? "flex items-center gap-2 h-full" 
    : "grid gap-2";

  const gridContainerStyle = isMobile 
    ? {} 
    : { gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' };
    
  const gridItemClass = isMobile ? "w-[70px] flex-shrink-0" : "w-full";

  return (
    <div 
      className="relative flex flex-col h-full"
      onDragOver={handleDragOverFile}
      onDragLeave={handleDragLeaveFile}
      onDrop={handleDropFile}
    >
      {isDraggingOver && (
        <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-sm flex items-center justify-center border-4 border-dashed border-white rounded-lg z-20 pointer-events-none">
          <p className="text-white font-bold text-xl drop-shadow-md">{t('dropImagesToUpload')}</p>
        </div>
      )}
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        className="hidden"
      />
      
      {/* Image Grid */}
      <div className={`flex-grow ${isMobile ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto'} p-2`}>
        <div className={gridContainerClass} style={gridContainerStyle}>
          {images.map((image, index) => (
            <div 
              key={image.id}
              id={`lib-img-thumb-${image.id}`}
              className={`relative ${gridItemClass} aspect-square bg-gray-300 rounded-sm overflow-hidden shadow-md group cursor-grab transition-all duration-200`}
              draggable
              onDragStart={(e) => handleDragStart(e, image.id, index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={() => handleDragEnd(image.id)}
              onTouchStart={(e) => onImageTouchStart(image, e)}
            >
              <img src={image.url} alt={`library image ${image.id}`} className="w-full h-full object-cover pointer-events-none" />
              <button 
                onClick={() => onRemoveImage(image.id)}
                className="absolute top-0.5 right-0.5 p-0.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all z-10"
                title={t('removeImageTitle')}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
              {image.used > 0 && (
                <div className="absolute top-1 left-1 w-5 h-5 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
                  {image.used}
                </div>
              )}
              {image.linked && (
                <div className="absolute bottom-1 left-1 p-0.5 bg-white/70 backdrop-blur-sm rounded-full">
                    <LinkIcon className="w-4 h-4 text-gray-800" />
                </div>
              )}
            </div>
          ))}

          {/* Add Photos Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`relative ${gridItemClass} aspect-square bg-gray-200 border-2 border-dashed border-gray-400 rounded-sm flex flex-col items-center justify-center text-center text-gray-500 hover:bg-gray-300 hover:border-gray-500 transition-colors cursor-pointer p-2`}
            title={t('addPhotos')}
          >
            <span className="font-semibold text-xs md:text-base">{t('addPhotos')}</span>
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-200/90 border-t border-gray-300">
        <div className="text-xs text-gray-500">
            <p>{t('totalImages')} <span className="font-bold text-gray-800">{totalImages}</span></p>
        </div>
        <button
          onClick={onClearLibrary}
          disabled={images.length === 0}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {t('clear')}
        </button>
      </div>
    </div>
  );
};

export default ImageLibrary;