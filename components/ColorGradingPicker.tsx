import React from 'react';
import { useI18n } from './i18n';
import { colorFilters } from './colorFilters';
import { XMarkIcon } from './icons';

interface ColorGradingPickerProps {
  onSelectFilter: (filterClassName: string) => void;
  onClose: () => void;
}

const SAMPLE_IMAGE_URL = 'https://api.allorigins.win/raw?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1500964757637-c85e8a162699%3Fq%3D80%26w%3D400';

const ColorGradingPicker: React.FC<ColorGradingPickerProps> = ({ onSelectFilter, onClose }) => {
  const { t } = useI18n();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">{t('colorGrading')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {colorFilters.map((filter) => (
              <div 
                key={filter.id} 
                className="cursor-pointer group"
                onClick={() => {
                  onSelectFilter(filter.className);
                  onClose();
                }}
              >
                <div className="aspect-square bg-gray-700 rounded-md overflow-hidden border-2 border-transparent group-hover:border-blue-500 group-hover:scale-105 transition-all duration-200">
                    <img src={SAMPLE_IMAGE_URL} alt={t(filter.name)} className={`w-full h-full object-cover ${filter.className}`} />
                </div>
                <p className="text-center text-sm mt-2 text-gray-300 group-hover:text-white">
                  {t(filter.name)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorGradingPicker;
