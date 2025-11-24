

import React from 'react';
import { SpreadData, ImageTransform, AlbumSize, TextElement, StickerElement } from '../types';
import Spread from './Spread';
import { PlusIcon } from './icons';
import { useI18n } from './i18n';

interface AlbumViewProps {
  spreads: SpreadData[];
  albumSize: AlbumSize;
  isMobile: boolean;
  isOverviewMode: boolean;
  selectedTextId: string | null;
  selectedStickerId: string | null;
  touchDragOverSlot: { spreadId: string; slotId: string } | null;
  onDropImageInSlot: (imageId: string, spreadId: string, slotId: string) => void;
  onSwapImagesInSlots: (source: { spreadId: string; slotId: string }, target: { spreadId: string; slotId: string }) => void;
  onChangeLayout: (spreadId: string, layoutId: string) => void;
  onUpdateImageTransform: (spreadId: string, slotId: string, transform: ImageTransform) => void;
  onRemoveImageFromSlot: (spreadId: string, slotId: string) => void;
  onAddSpread: () => void;
  onReorderSpreads: (dragIndex: number, hoverIndex: number) => void;
  onOpenTextPicker: (spreadId: string) => void;
  onUpdateText: (spreadId: string, textId: string, newTextData: Partial<TextElement>) => void;
  onRemoveText: (spreadId: string, textId: string) => void;
  onSelectText: (textId: string | null) => void;
  onOpenStickerPicker: (spreadId: string) => void;
  onUpdateSticker: (spreadId: string, stickerId: string, newStickerData: Partial<StickerElement>) => void;
  onRemoveSticker: (spreadId: string, stickerId: string) => void;
  onSelectSticker: (stickerId: string | null) => void;
  onAiRetouchImage: (originalImageId: string, slotId: string, spreadId: string, newImageBase64: string, mimeType: string) => void;
  onTriggerAddOverlayImage: (spreadId: string) => void;
  aiResolution: '2K' | '4K';
}

const AlbumView: React.FC<AlbumViewProps> = (props) => {
  const { spreads, albumSize, isMobile, isOverviewMode, onAddSpread, onReorderSpreads, aiResolution, ...spreadProps } = props;
  const { t } = useI18n();

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className={`max-w-7xl mx-auto ${isOverviewMode ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}`}>
        {spreads.map((spread, index) => (
          <Spread 
            key={spread.id} 
            index={index}
            data={spread} 
            albumSize={albumSize}
            isMobile={isMobile}
            isOverviewMode={isOverviewMode}
            onReorderSpreads={onReorderSpreads}
            aiResolution={aiResolution}
            {...spreadProps}
          />
        ))}
        {!isOverviewMode && (
            <div className="flex justify-center pt-8">
            <button 
                onClick={onAddSpread}
                className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
                <PlusIcon className="w-5 h-5" />
                <span>{t('addSpread')}</span>
            </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default AlbumView;