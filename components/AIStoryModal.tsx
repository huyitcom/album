
import React, { useState } from 'react';
import { XMarkIcon } from './icons';
import { useI18n } from './i18n';
import { SparklesIcon } from './icons';

interface AIStoryModalProps {
  story: string;
  isLoading: boolean;
  onClose: () => void;
}

const AIStoryModal: React.FC<AIStoryModalProps> = ({ story, isLoading, onClose }) => {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-xl flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-6 h-6 text-purple-500" />
            <h2 className="text-lg font-semibold">{t('aiStoryTitle')}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="p-6 overflow-y-auto min-h-[200px] flex items-center justify-center">
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">{t('aiStoryGenerating')}</p>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">{story}</p>
          )}
        </div>
        
        {!isLoading && story && (
            <footer className="p-4 border-t bg-gray-50 flex justify-end">
                <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
                >
                {copied ? t('copied') : t('copyToClipboard')}
                </button>
            </footer>
        )}
      </div>
    </div>
  );
};

export default AIStoryModal;
