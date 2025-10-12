
import React from 'react';
import { AlbumSize } from '../types';
import { useI18n } from './i18n';
import Logo from './Logo';
import { FolderIcon } from './icons';

interface WelcomeScreenProps {
  isMobile: boolean;
  onSelectSize: (size: AlbumSize) => void;
  onOpenProjectManager: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ isMobile, onSelectSize, onOpenProjectManager }) => {
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
    <div className="bg-gray-200 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl flex flex-col p-8 text-center">
        <div className="mx-auto mb-4">
            <Logo forceFull={true} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('welcomeTitle')}</h1>
        <p className="text-gray-600 mb-8">{t('welcomeSubtitle')}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {sizes.map(({ size, label, aspectRatio }) => (
            <div 
                key={size} 
                className="cursor-pointer group flex flex-col items-center"
                onClick={() => onSelectSize(size)}
            >
                <div 
                className="w-full bg-gray-100 border-2 rounded-md p-1 h-auto transition-all duration-200 border-gray-300 group-hover:border-blue-500 group-hover:scale-105"
                style={{ aspectRatio }}
                >
                <div className="w-full h-full flex">
                    <div className="w-1/2 h-full bg-gray-300 rounded-sm"></div>
                    <div className="w-1/2 h-full bg-gray-300 rounded-sm ml-px"></div>
                </div>
                </div>
                <p className="text-center text-lg font-semibold mt-3 transition-colors text-gray-700 group-hover:text-blue-600">{label}</p>
            </div>
            ))}
        </div>

        {!isMobile && (
          <div className="flex items-center justify-center space-x-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="text-gray-500 text-sm">{t('or')}</span>
              <div className="flex-grow border-t border-gray-300"></div>
          </div>
        )}

        <button 
            onClick={onOpenProjectManager} 
            className="mt-6 mx-auto flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
            <FolderIcon className="w-5 h-5" />
            <span>{t('loadExistingProject')}</span>
        </button>

      </div>
    </div>
  );
};

export default WelcomeScreen;