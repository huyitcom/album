



import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { DuplicateIcon, PencilIcon, DownloadIcon, GlobeAltIcon, CheckIcon } from './icons';
import { AlbumSize } from '../types';
import { useI18n } from './i18n';

interface HeaderProps {
  totalPages: number;
  albumSize: AlbumSize;
  isOverviewMode: boolean;
  onSizeChangeClick: () => void;
  onDownload: () => void;
  onToggleOverview: () => void;
  onDesignForMe: () => void;
  onDesignRandom: () => void;
  isDesignDisabled: boolean;
}

const Header: React.FC<HeaderProps> = ({ totalPages, albumSize, isOverviewMode, onSizeChangeClick, onDownload, onToggleOverview, onDesignForMe, onDesignRandom, isDesignDisabled }) => {
  const [isLangPickerOpen, setIsLangPickerOpen] = useState(false);
  const langPickerRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useI18n();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langPickerRef.current && !langPickerRef.current.contains(event.target as Node)) {
        setIsLangPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-white border-b border-gray-300 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Logo />
          <button 
            onClick={onSizeChangeClick}
            className="flex items-center space-x-1 px-3 py-1 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
          >
            <span className="text-sm font-medium">{t('albumSize')}: {albumSize}</span>
            <PencilIcon className="w-3 h-3 text-gray-500" />
          </button>
          
          <div className="h-6 border-l border-gray-300"></div>

          <button 
            onClick={onDesignForMe}
            disabled={isDesignDisabled}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {t('designForMe')}
          </button>
          <button 
            onClick={onDesignRandom}
            disabled={isDesignDisabled}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-50 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {t('designRandom')}
          </button>
        </div>

        {/* Middle Section - Icons */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={onToggleOverview}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isOverviewMode ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title={t('toggleOverviewTitle')}
          >
            <DuplicateIcon className="w-5 h-5" />
            <span className="text-sm font-semibold">{t('pagesOverview')}</span>
          </button>
          
          {/* Language Picker */}
          <div className="relative" ref={langPickerRef}>
            <button
              onClick={() => setIsLangPickerOpen(prev => !prev)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              title={t('changeLanguageTitle')}
            >
              <GlobeAltIcon className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase">{language}</span>
            </button>
            {isLangPickerOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <button
                  onClick={() => { setLanguage('en'); setIsLangPickerOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between ${language === 'en' ? 'font-bold' : ''}`}
                >
                  <span>{t('langEN')}</span>
                  {language === 'en' && <CheckIcon className="w-4 h-4 text-blue-500" />}
                </button>
                <button
                  onClick={() => { setLanguage('vn'); setIsLangPickerOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between ${language === 'vn' ? 'font-bold' : ''}`}
                >
                  <span>{t('langVN')}</span>
                  {language === 'vn' && <CheckIcon className="w-4 h-4 text-blue-500" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="text-right text-xs">
            <p>{t('totalPages')} <span className="font-bold text-gray-800">{totalPages}</span></p>
          </div>
          <div className="flex items-center space-x-3 text-gray-500">
            <button 
              onClick={onDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 text-sm transition-colors"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>{t('download')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;