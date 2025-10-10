import React from 'react';
import { AlbumSize } from '../types';
import { XMarkIcon } from './icons';
import { useI18n } from './i18n';

interface AlbumSizePickerProps {
  currentSize: AlbumSize;
  onSelectSize: (size: AlbumSize) => void;
  onClose: () => void;
}

const AlbumSizePicker: React.FC<AlbumSizePickerProps> = ({ currentSize, onSelectSize, onClose }) => {
  const { t } = useI18n();
  const sizes: { size: AlbumSize, label: string, aspectRatio: string }[] = [
    { size: '15x15', label: '15x15', aspectRatio: '2 / 1' },
    { size: '20x20', label: '20x20', aspectRatio: '2 / 1' },
    { size: '21x15', label: '21x15', aspectRatio: '42 / 15' },
    { size: '30x20', label: '30x20', aspectRatio: '60 / 20' },
    { size: '25x35', label: '25x35', aspectRatio: '50 / 35' },
    { size: '30x30', label: '30x30', aspectRatio: '2 / 1' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('selectAlbumSize')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8">
            {sizes.map(({ size, label, aspectRatio }) => (
              <div 
                key={size} 
                className="cursor-pointer group flex flex-col items-center"
                onClick={() => onSelectSize(size)}
              >
                <div 
                  className={`w-full bg-gray-100 border-2 rounded-md p-1 h-auto transition-all duration-200 ${currentSize === size ? 'border-blue-500 scale-105' : 'border-gray-300 group-hover:border-blue-400'}`}
                  style={{ aspectRatio }}
                >
                  <div className="w-full h-full flex">
                    <div className="w-1/2 h-full bg-gray-300 rounded-sm"></div>
                    <div className="w-1/2 h-full bg-gray-300 rounded-sm ml-px"></div>
                  </div>
                </div>
                <p className={`text-center text-lg font-semibold mt-3 transition-colors ${currentSize === size ? 'text-blue-600' : 'text-gray-700 group-hover:text-gray-900'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumSizePicker;
