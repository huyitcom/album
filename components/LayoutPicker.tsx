import React from 'react';
import { layoutList, LayoutTemplate } from '../layouts';
import { XMarkIcon } from './icons';
import { useI18n } from './i18n';

interface LayoutPickerProps {
  onSelectLayout: (layoutId: string) => void;
  onClose: () => void;
}

const LayoutPicker: React.FC<LayoutPickerProps> = ({ onSelectLayout, onClose }) => {
  const { language, t } = useI18n();
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('chooseLayout')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {layoutList.map((layout) => (
              <div 
                key={layout.id} 
                className="cursor-pointer group"
                onClick={() => onSelectLayout(layout.id)}
              >
                <div 
                  className="bg-gray-100 border-2 border-gray-300 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-200 rounded-md aspect-[2/1] p-1 grid"
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
                </div>
                <p className="text-center text-sm mt-2 text-gray-600 group-hover:text-gray-900">
                  {language === 'vn' ? layout.name_vn : layout.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutPicker;