import React from 'react';
import { stickerList } from './stickers';
import { XMarkIcon } from './icons';
import { useI18n } from './i18n';

interface StickerPickerProps {
  onSelectSticker: (stickerUrl: string) => void;
  onClose: () => void;
}

const StickerPicker: React.FC<StickerPickerProps> = ({ onSelectSticker, onClose }) => {
  const { t } = useI18n();
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('chooseSticker')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {stickerList.map((stickerUrl, index) => (
              <div 
                key={index} 
                className="cursor-pointer group flex flex-col items-center p-2 bg-gray-100 rounded-md hover:bg-blue-100 hover:scale-110 transition-transform"
                onClick={() => onSelectSticker(stickerUrl)}
              >
                <img src={stickerUrl} alt={`Sticker ${index + 1}`} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerPicker;