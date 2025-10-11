import React from 'react';
import { XMarkIcon, SparklesIcon, ArrowPathIcon } from './icons';
import { useI18n } from './i18n';

interface MobileDesignPickerProps {
  onAutoDesign: () => void;
  onRandomDesign: () => void;
  onClose: () => void;
}

const MobileDesignPicker: React.FC<MobileDesignPickerProps> = ({ onAutoDesign, onRandomDesign, onClose }) => {
  const { t } = useI18n();

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-xs flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('designOptionsTitle')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-4 space-y-3">
          <button
            onClick={onAutoDesign}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 text-white font-semibold rounded-md shadow hover:bg-gray-600 transition-colors"
          >
            <SparklesIcon className="w-5 h-5" />
            <span>{t('designForMe')}</span>
          </button>
          <button
            onClick={onRandomDesign}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 transition-colors"
          >
            <ArrowPathIcon className="w-5 h-5" />
            <span>{t('designRandom')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileDesignPicker;
