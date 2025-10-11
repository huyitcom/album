import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { DuplicateIcon, GlobeAltIcon, CheckIcon, FolderIcon, PaperAirplaneIcon, SparklesIcon, Bars3Icon, ArrowPathIcon } from './icons';
import { useI18n } from './i18n';

interface HeaderProps {
  totalPages: number;
  isOverviewMode: boolean;
  onSubmitProject: () => void;
  onToggleOverview: () => void;
  onDesignForMe: () => void;
  onDesignRandom: () => void;
  isDesignDisabled: boolean;
  onOpenProjectManager: () => void;
  isMobile: boolean;
  onOpenMobileDesignPicker: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalPages, isOverviewMode, onSubmitProject, onToggleOverview, onDesignForMe, onDesignRandom, isDesignDisabled, onOpenProjectManager, isMobile, onOpenMobileDesignPicker }) => {
  const [isLangPickerOpen, setIsLangPickerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langPickerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useI18n();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langPickerRef.current && !langPickerRef.current.contains(event.target as Node)) {
        setIsLangPickerOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="flex items-stretch shadow-sm border-b border-gray-300">
      {/* Left Section */}
      <div className="bg-cyan-500 flex-shrink-0 flex items-center px-2 md:px-4 py-2">
        <Logo />
      </div>

      {/* Right Section */}
      <div className="bg-gray-800 flex-grow flex items-center justify-between px-2 md:px-4 py-2">
        {/* Left-aligned controls */}
        <div className="flex items-center space-x-2">
            <button
                onClick={onOpenProjectManager}
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
                title={t('myProjects')}
            >
                <FolderIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">{t('myProjects')}</span>
            </button>
            <div className="h-6 border-l border-gray-600 hidden md:block"></div>
            <button 
              onClick={isMobile ? onOpenMobileDesignPicker : onDesignForMe}
              disabled={isDesignDisabled}
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-colors"
              title={isMobile ? t('designForMeMobile') : t('designForMe')}
            >
              {isMobile ? t('designForMeMobile') : t('designForMe')}
            </button>
            <button 
              onClick={onDesignRandom}
              disabled={isDesignDisabled}
              className="hidden md:block px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {t('designRandom')}
            </button>
        </div>

        {/* Right-aligned controls */}
        <div className="flex items-center space-x-2 md:space-x-6">
          <button 
            onClick={onToggleOverview}
            className={`hidden md:flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg transition-colors ${isOverviewMode ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
            title={t('toggleOverviewTitle')}
          >
            <DuplicateIcon className="w-5 h-5" />
            <span className="hidden md:inline text-sm font-semibold">{t('pagesOverview')}</span>
          </button>
          
          <div className="relative hidden md:block" ref={langPickerRef}>
            <button
              onClick={() => setIsLangPickerOpen(prev => !prev)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
              title={t('changeLanguageTitle')}
            >
              <GlobeAltIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">{t(`lang${language.toUpperCase()}`)}</span>
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

          <div className="h-6 border-l border-gray-600 hidden md:block"></div>

          <div className="text-right text-xs hidden md:block">
            <p className="text-gray-400">{t('totalPages')} <span className="font-bold text-white">{totalPages}</span></p>
          </div>
          <div className="flex items-center">
            <button 
              onClick={onSubmitProject}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 text-sm transition-colors"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              <span className="hidden md:inline">{t('submitProject')}</span>
              <span className="md:hidden">Submit</span>
            </button>
          </div>
          
          {/* Mobile Menu */}
          <div className="relative md:hidden" ref={mobileMenuRef}>
            <button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="p-2 ml-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
                aria-label="Open menu"
                aria-haspopup="true"
                aria-expanded={isMobileMenuOpen}
            >
                <Bars3Icon className="w-6 h-6" />
            </button>
            {isMobileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-gray-700 rounded-md shadow-lg z-50 border border-gray-600 text-gray-200" role="menu">
                    <div className="p-2 space-y-1">
                        <button
                          onClick={() => { onOpenProjectManager(); setIsMobileMenuOpen(false); }}
                          className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-600"
                          role="menuitem"
                        >
                          <FolderIcon className="w-5 h-5 text-gray-300" />
                          <span>{t('myProjects')}</span>
                        </button>
                        <button 
                          onClick={() => { onDesignRandom(); setIsMobileMenuOpen(false); }}
                          disabled={isDesignDisabled}
                          className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          role="menuitem"
                        >
                            <ArrowPathIcon className="w-5 h-5 text-green-400" />
                            <span>{t('designRandom')}</span>
                        </button>
                        
                        <div className="border-t border-gray-600 my-1 !mx-2"></div>
                        
                        <div className="px-3 pt-2 pb-1 text-xs text-gray-400 font-semibold uppercase">{t('changeLanguageTitle')}</div>
                        <button
                          onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}
                          className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-600 ${language === 'en' ? 'font-bold' : ''}`}
                          role="menuitem"
                        >
                          <span>{t('langEN')}</span>
                          {language === 'en' && <CheckIcon className="w-4 h-4 text-blue-400" />}
                        </button>
                        <button
                          onClick={() => { setLanguage('vn'); setIsMobileMenuOpen(false); }}
                          className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-600 ${language === 'vn' ? 'font-bold' : ''}`}
                          role="menuitem"
                        >
                          <span>{t('langVN')}</span>
                          {language === 'vn' && <CheckIcon className="w-4 h-4 text-blue-400" />}
                        </button>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
