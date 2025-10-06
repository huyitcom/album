import React from 'react';
import { TextStyle } from '../types';
import { textTemplates } from './textTemplates';
import { XMarkIcon } from './icons';
import { useI18n } from './i18n';

interface TextTemplatePickerProps {
  onSelectTemplate: (template: { name: string; style: TextStyle; defaultContent?: string; }) => void;
  onClose: () => void;
}

const TextTemplatePicker: React.FC<TextTemplatePickerProps> = ({ onSelectTemplate, onClose }) => {
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
          <h2 className="text-lg font-semibold">{t('chooseTextStyle')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {textTemplates.map((template) => (
              <div 
                key={template.name} 
                className="cursor-pointer group flex flex-col items-center"
                onClick={() => onSelectTemplate(template)}
              >
                <div 
                  className="w-full h-32 flex items-center justify-center bg-gray-100 border-2 border-gray-300 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-200 rounded-md p-2"
                >
                  <p
                    style={{
                      ...template.style,
                      fontSize: template.style.fontSize > 32 ? 28 : template.style.fontSize, // Cap font size for preview
                      textAlign: 'center',
                      ...(template.style.background && {
                        background: template.style.background,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                      })
                    }}
                  >
                    {template.defaultContent || 'Text Style'}
                  </p>
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

export default TextTemplatePicker;