
import React, { useState } from 'react';
import { SpreadData, ImageTransform, AlbumSize, TextElement as TextElementType, StickerElement as StickerElementType } from '../types';
import { LayoutIcon, TypeIcon, SparklesIcon } from './icons';
import { layouts } from '../layouts';
import LayoutPicker from './LayoutPicker';
import PlacedImage from './PlacedImage';
import TextElement from './TextElement';
import StickerElement from './StickerElement';
import { useI18n } from './i18n';

interface SlotProps {
  gridArea: string;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

const Slot: React.FC<SlotProps> = ({ gridArea, onDrop, children }) => {
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

    return (
        <div 
            style={{ gridArea }}
            className={`relative w-full h-full bg-gray-50 rounded-sm transition-all duration-200 overflow-hidden ${isDraggingOver ? 'outline-dashed outline-2 outline-offset-2 outline-blue-500' : ''}`}
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
  albumSize: AlbumSize;
  isOverviewMode: boolean;
  selectedTextId: string | null;
  selectedStickerId: string | null;
  onDropImageInSlot: (imageId: string, spreadId:string, slotId: string) => void;
  onSwapImagesInSlots: (source: { spreadId: string; slotId: string }, target: { spreadId: string; slotId: string }) => void;
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
}

const Spread: React.FC<SpreadProps> = (props) => {
  const { data, albumSize, isOverviewMode, onDropImageInSlot, onSwapImagesInSlots, onChangeLayout, onUpdateImageTransform, onRemoveImageFromSlot, onOpenTextPicker, onUpdateText, onRemoveText, onSelectText, selectedTextId, onOpenStickerPicker, onUpdateSticker, onRemoveSticker, onSelectSticker, selectedStickerId } = props;
  const [isLayoutPickerOpen, setIsLayoutPickerOpen] = useState(false);
  const layout = layouts[data.layoutId] || layouts['single-full'];
  const { t } = useI18n();

  const handleSelectLayout = (layoutId: string) => {
    onChangeLayout(data.id, layoutId);
    setIsLayoutPickerOpen(false);
  };
  
  const aspectRatio = albumSize === '30x30' ? '2 / 1' : '50 / 35';

  return (
    <div data-spread-id={data.id}>
        {isLayoutPickerOpen && (
            <LayoutPicker 
                onSelectLayout={handleSelectLayout}
                onClose={() => setIsLayoutPickerOpen(false)}
            />
        )}
      <h3 className="text-sm text-gray-500 mb-2">{t('pagesLabel', { start: data.pages[0], end: data.pages[1] })}</h3>
      <div className={`relative ${!isOverviewMode ? 'group' : ''}`}>
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
                              onTransformChange={(newTransform) => onUpdateImageTransform(data.id, slot.id, newTransform)}
                              onRemove={() => onRemoveImageFromSlot(data.id, slot.id)}
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
              className="absolute top-2 left-2 flex items-center space-x-2 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <button 
                  onClick={() => setIsLayoutPickerOpen(true)}
                  className="flex items-center space-x-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md shadow hover:bg-white text-xs font-semibold"
              >
                  <LayoutIcon className="w-4 h-4" />
                  <span>{t('changeLayout')}</span>
              </button>
              <button
                  onClick={() => onOpenTextPicker(data.id)}
                  className="flex items-center space-x-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md shadow hover:bg-white text-xs font-semibold"
              >
                  <TypeIcon className="w-4 h-4" />
                  <span>{t('addText')}</span>
              </button>
              <button
                  onClick={() => onOpenStickerPicker(data.id)}
                  className="flex items-center space-x-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md shadow hover:bg-white text-xs font-semibold"
              >
                  <SparklesIcon className="w-4 h-4" />
                  <span>{t('addSticker')}</span>
              </button>
            </div>
         )}
      </div>
    </div>
  );
};

export default Spread;
