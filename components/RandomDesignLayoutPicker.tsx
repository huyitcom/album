import React, { useState } from 'react';
import { layoutList } from '../layouts';
import { XMarkIcon, CheckIcon } from './icons';
import { useI18n } from './i18n';

interface RandomDesignLayoutPickerProps {
  isMobile: boolean;
  onConfirm: (selectedLayoutIds: string[]) => void;
  onClose: () => void;
}

const RandomDesignLayoutPicker: React.FC<RandomDesignLayoutPickerProps> = ({ isMobile, onConfirm, onClose }) => {
  const { language, t } = useI18n();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleSelection = (layoutId: string) => {
    setSelectedIds(prev => 
      prev.includes(layoutId) 
        ? prev.filter(id => id !== layoutId)
        : [...prev, layoutId]
    );
  };
  
  const handleConfirm = () => {
    if (selectedIds.length > 0) {
      onConfirm(selectedIds);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">{t('randomDesignTitle')}</h2>
            <p className="text-sm text-gray-500">{t('randomDesignSubtitle')}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 ml-auto">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {layoutList.map((layout) => {
              const isSelected = selectedIds.includes(layout.id);
              return (
                <div 
                  key={layout.id} 
                  className="cursor-pointer group"
                  onClick={() => handleToggleSelection(layout.id)}
                >
                  <div 
                    className={`relative bg-gray-100 border-2 rounded-md aspect-[2/1] p-1 grid transition-all duration-200 ${isSelected ? 'border-blue-500 scale-105' : 'border-gray-300 group-hover:border-blue-400'}`}
                    style={{
                      gridTemplateColumns: layout.gridTemplateColumns,
                      gridTemplateRows: layout.gridTemplateRows,
                      gap: '4px'
                    }}
                  >
                    {layout.slots.map(slot => (
                      <div 
                        key={slot.id} 
                        className="bg-gray-300 rounded-sm"
                        style={{ gridArea: slot.gridArea }}
                      ></div>
                    ))}
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <p className="text-center text-sm mt-2 text-gray-600 group-hover:text-gray-900">
                    {language === 'vn' ? layout.name_vn : layout.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <footer className="flex items-center justify-end p-4 border-t space-x-4 bg-gray-50">
           {!isMobile && (
            <>
              <button 
                  onClick={() => setSelectedIds(layoutList.map(l => l.id))}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-100 text-sm"
              >
                  {t('selectAll')}
              </button>
              <button 
                  onClick={() => setSelectedIds([])}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-100 text-sm"
              >
                  {t('selectNone')}
              </button>
            </>
           )}
            <div className="flex-grow"></div>
            <button 
                onClick={onClose}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-100 text-sm"
            >
                {t('cancel')}
            </button>
            <button
                onClick={handleConfirm}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {t('confirmRandomization', { count: selectedIds.length })}
            </button>
        </footer>
      </div>
    </div>
  );
};

export default RandomDesignLayoutPicker;
