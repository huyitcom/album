import React from 'react';
import { backgroundTemplates } from './backgroundTemplates';
import { XMarkIcon } from './icons';
import { useI18n } from './i18n';

interface BackgroundTemplatePickerProps {
  onSelectTemplate: (prompt: string) => void;
  onClose: () => void;
}

const BackgroundTemplatePicker: React.FC<BackgroundTemplatePickerProps> = ({ onSelectTemplate, onClose }) => {
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
          <h2 className="text-lg font-semibold">{t('chooseBackground')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {backgroundTemplates.map((template) => (
              <div 
                key={template.id} 
                className="cursor-pointer group"
                onClick={() => onSelectTemplate(template.prompt)}
              >
                <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-blue-500 group-hover:scale-105 transition-all duration-200">
                    <img src={template.thumbnailUrl} alt={template.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-sm mt-2 text-gray-600 group-hover:text-gray-900">
                  {language === 'vn' ? template.name_vn : template.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundTemplatePicker;