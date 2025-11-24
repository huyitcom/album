

import React, { useState, useRef } from 'react';
import { SpreadData, ImageTransform, AlbumSize, TextElement as TextElementType, StickerElement as StickerElementType } from '../types';
import { LayoutIcon, TypeIcon, SparklesIcon, PhotoIcon, PhotoPlusIcon } from './icons';
import { layouts } from '../layouts';
import LayoutPicker from './LayoutPicker';
import PlacedImage from './PlacedImage';
import TextElement from './TextElement';
import StickerElement from './StickerElement';
import { useI18n } from './i18n';

interface SlotProps {
  gridArea: string;
  slotId: string;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  isTouchDraggingOver?: boolean;
}

const Slot: React.FC<SlotProps> = ({ gridArea, slotId, onDrop, children, isTouchDraggingOver }) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(true);
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        onDrop(e);
    };

    const isHighlighted = isDraggingOver || isTouchDraggingOver;

    return (
        <div 
            style={{ gridArea }}
            data-slot-id={slotId}
            className={`relative w-full h-full bg-gray-50 rounded-sm transition-all duration-200 overflow-hidden ${isHighlighted ? 'outline-dashed outline-2 outline-offset-2 outline-blue-500' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {children}
        </div>
    )
}

interface SpreadProps {
  data: SpreadData;
  index: number;
  albumSize: AlbumSize;
  isMobile: boolean;
  isOverviewMode: boolean;
  selectedTextId: string | null;
  selectedStickerId: string | null;
  touchDragOverSlot: { spreadId: string; slotId: string } | null;
  onDropImageInSlot: (imageId: string, spreadId:string, slotId: string) => void;
  onSwapImagesInSlots: (source: { spreadId: string; slotId: string }, target: { spreadId: string; slotId: string }) => void;
  onReorderSpreads: (dragIndex: number, hoverIndex: number) => void;
  onChangeLayout: (spreadId: string, layoutId: string) => void;
  onUpdateImageTransform: (spreadId: string, slotId: string, transform: ImageTransform) => void;
  onRemoveImageFromSlot: (spreadId: string, slotId: string) => void;
  onOpenTextPicker: (spreadId: string) => void;
  onUpdateText: (spreadId: string, textId: string, newTextData: Partial<TextElementType>) => void;
  onRemoveText: (spreadId: string, textId: string) => void;
  onSelectText: (textId: string | null) => void;
  onOpenStickerPicker: (spreadId: string) => void;
  onUpdateSticker: (spreadId: string, stickerId: string, newStickerData: Partial<StickerElementType>) => void;
  onRemoveSticker: (spreadId: string, stickerId: string) => void;
  onSelectSticker: (stickerId: string | null) => void;
  onAiRetouchImage: (originalImageId: string, slotId: string, spreadId: string, newImageBase64: string, mimeType: string) => void;
  onTriggerAddOverlayImage: (spreadId: string) => void;
  aiResolution: '2K' | '4K';
}

const getAspectRatioForSize = (size: AlbumSize): string => {
  switch (size) {
    case '15x15':
    case '20x20':
    case '30x30':
      return '2 / 1';
    case '21x15':
      return '42 / 15';
    case '30x20':
      return '60 / 20';
    case '25x35':
      return '50 / 35';
    default:
      return '2 / 1'; // Fallback for any unknown sizes
  }
};

const Spread: React.FC<SpreadProps> = (props) => {
  const { data, index, albumSize, isMobile, isOverviewMode, onDropImageInSlot, onSwapImagesInSlots, onReorderSpreads, onChangeLayout, onUpdateImageTransform, onRemoveImageFromSlot, onOpenTextPicker, onUpdateText, onRemoveText, onSelectText, selectedTextId, onOpenStickerPicker, onUpdateSticker, onRemoveSticker, onSelectSticker, selectedStickerId, onAiRetouchImage, onTriggerAddOverlayImage, touchDragOverSlot, aiResolution } = props;
  const [isLayoutPickerOpen, setIsLayoutPickerOpen] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [isAnyImageEditing, setIsAnyImageEditing] = useState(false);
  const layout = layouts[data.layoutId] || layouts['single-full'];
  const { t } = useI18n();

  const spreadRef = useRef<HTMLDivElement>(null);
  const [isDragHovering, setIsDragHovering] = useState(false);

  const handleSelectLayout = (layoutId: string) => {
    onChangeLayout(data.id, layoutId);
    setIsLayoutPickerOpen(false);
  };
  
  const aspectRatio = getAspectRatioForSize(albumSize);

  // --- Drag and Drop for Reordering Spreads ---
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('album/spread-index', String(index));
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
        if (spreadRef.current) {
            spreadRef.current.style.visibility = 'hidden';
        }
    }, 0);
  };

  const handleDragEnd = () => {
      if (spreadRef.current) {
          spreadRef.current.style.visibility = 'visible';
      }
      setIsDragHovering(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragHovering(false);
      const dragIndexStr = e.dataTransfer.getData('album/spread-index');
      if (dragIndexStr) {
          const dragIndex = parseInt(dragIndexStr, 10);
          const hoverIndex = index;
          if (dragIndex !== hoverIndex) {
              onReorderSpreads(dragIndex, hoverIndex);
          }
      }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const dragIndexStr = e.dataTransfer.getData('album/spread-index');
      if (dragIndexStr) {
          setIsDragHovering(true);
      }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragHovering(false);
  };


  return (
    <div 
        ref={spreadRef}
        data-spread-id={data.id}
        draggable={isOverviewMode}
        onDragStart={isOverviewMode ? handleDragStart : undefined}
        onDragEnd={isOverviewMode ? handleDragEnd : undefined}
        onDrop={isOverviewMode ? handleDrop : undefined}
        onDragOver={isOverviewMode ? handleDragOver : undefined}
        onDragEnter={isOverviewMode ? handleDragEnter : undefined}
        onDragLeave={isOverviewMode ? handleDragLeave : undefined}
        className={isOverviewMode ? 'cursor-move' : ''}
    >
        {isLayoutPickerOpen && (
            <LayoutPicker 
                isMobile={isMobile}
                onSelectLayout={handleSelectLayout}
                onClose={() => setIsLayoutPickerOpen(false)}
            />
        )}
      <h3 className="text-sm text-gray-500 mb-2">{t('pagesLabel', { start: data.pages[0], end: data.pages[1] })}</h3>
      <div className={`relative transition-all ${!isOverviewMode ? 'group' : ''} ${isDragHovering ? 'outline-dashed outline-2 outline-blue-500' : ''}`}>
        <div 
          data-spread-capture-target="true"
          className="bg-white p-1 shadow-lg"
          style={{ aspectRatio }}
        >
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 grid"
              style={{
                  gridTemplateColumns: layout.gridTemplateColumns,
                  gridTemplateRows: layout.gridTemplateRows,
                  gap: layout.gap,
              }}
            >
              {layout.slots.map(slot => (
                  <Slot 
                      key={slot.id} 
                      gridArea={slot.gridArea}
                      slotId={slot.id}
                      isTouchDraggingOver={touchDragOverSlot?.spreadId === data.id && touchDragOverSlot?.slotId === slot.id}
                      onDrop={(e) => {
                          const imageIdFromLibrary = e.dataTransfer.getData('album/image-id');
                          const placedImageDataSource = e.dataTransfer.getData('album/placed-image');

                          if (imageIdFromLibrary && !isOverviewMode) {
                              onDropImageInSlot(imageIdFromLibrary, data.id, slot.id);
                          } else if (placedImageDataSource && !isOverviewMode) {
                              try {
                                  const source = JSON.parse(placedImageDataSource);
                                  const target = { spreadId: data.id, slotId: slot.id };
                                  onSwapImagesInSlots(source, target);
                              } catch (err) {
                                  console.error("Failed to parse dropped image data", err);
                              }
                          }
                      }}
                  >
                      {data.images[slot.id] ? (
                          <PlacedImage 
                              data={data.images[slot.id]}
                              spreadId={data.id}
                              slotId={slot.id}
                              isMobile={isMobile}
                              isOverviewMode={isOverviewMode}
                              onTransformChange={(newTransform) => onUpdateImageTransform(data.id, slot.id, newTransform)}
                              onRemove={() => onRemoveImageFromSlot(data.id, slot.id)}
                              onEnterEditMode={() => setIsAnyImageEditing(true)}
                              onExitEditMode={() => setIsAnyImageEditing(false)}
                              onAiRetouchImage={onAiRetouchImage}
                              aiResolution={aiResolution}
                          />
                      ) : (
                          <div className="flex items-center justify-center w-full h-full text-xs text-gray-400 p-2 text-center">
                            {!isOverviewMode && t('dropPhotoHere')}
                          </div>
                      )}
                  </Slot>
              ))}
            </div>
            {/* Elements Layer */}
            <div
              data-elements-layer="true" 
              className="absolute inset-0 pointer-events-none"
            >
              {data.texts.map(text => (
                <TextElement
                  key={text.id}
                  spreadId={data.id}
                  data={text}
                  isSelected={selectedTextId === text.id}
                  isOverviewMode={isOverviewMode}
                  onSelect={onSelectText}
                  onUpdate={onUpdateText}
                  onRemove={onRemoveText}
                />
              ))}
              {data.stickers.map(sticker => (
                <StickerElement
                  key={sticker.id}
                  spreadId={data.id}
                  data={sticker}
                  isSelected={selectedStickerId === sticker.id}
                  onSelect={onSelectSticker}
                  onUpdate={onUpdateSticker}
                  onRemove={onRemoveSticker}
                />
              ))}
            </div>
          </div>
        </div>
         {!isOverviewMode && (
            <div 
              data-hide-on-capture="true"
              className={`absolute top-2 left-2 flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2 z-40 transition-opacity duration-200 ${isAnyImageEditing ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <button 
                  onClick={() => setIsLayoutPickerOpen(true)}
                  className="flex items-center justify-center p-3 md:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white text-xs font-semibold"
                  title={t('changeLayout')}
              >
                  <LayoutIcon className="w-5 h-5 md:w-4 md:h-4" />
                  <span className="hidden">{t('changeLayout')}</span>
              </button>
              <button
                  onClick={() => onOpenTextPicker(data.id)}
                  className="flex items-center justify-center p-3 md:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white text-xs font-semibold"
                  title={t('addText')}
              >
                  <TypeIcon className="w-5 h-5 md:w-4 md:h-4" />
                  <span className="hidden">{t('addText')}</span>
              </button>
              <button
                  onClick={() => onTriggerAddOverlayImage(data.id)}
                  className="flex items-center justify-center p-3 md:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white text-xs font-semibold"
                  title={t('addOverlayImage')}
              >
                  <PhotoPlusIcon className="w-5 h-5 md:w-4 md:h-4" />
                  <span className="hidden">{t('addOverlayImage')}</span>
              </button>
              <button
                  onClick={() => onOpenStickerPicker(data.id)}
                  className="flex items-center justify-center p-3 md:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white text-xs font-semibold"
                  title={t('addSticker')}
              >
                  <SparklesIcon className="w-5 h-5 md:w-4 md:h-4" />
                  <span className="hidden">{t('addSticker')}</span>
              </button>
            </div>
         )}
      </div>
    </div>
  );
};

export default Spread;