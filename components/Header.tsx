

import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { DuplicateIcon, CheckIcon, FolderIcon, PaperAirplaneIcon, Bars3Icon, ArrowPathIcon, Cog6ToothIcon } from './icons';
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
  aiResolution: '2K' | '4K';
  setAiResolution: (res: '2K' | '4K') => void;
}

const Header: React.FC<HeaderProps> = ({ totalPages, isOverviewMode, onSubmitProject, onToggleOverview, onDesignForMe, onDesignRandom, isDesignDisabled, onOpenProjectManager, isMobile, onOpenMobileDesignPicker, aiResolution, setAiResolution }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useI18n();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
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
      <div className="bg-cyan-500 flex-shrink-0 flex items-center space-x-2 px-2 md:px-4 py-2">
        {/* Mobile Menu */}
        <div className="relative md:hidden" ref={mobileMenuRef}>
          <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-lg text-black hover:bg-cyan-600/50"
              aria-label="Open menu"
              aria-haspopup="true"
              aria-expanded={isMobileMenuOpen}
          >
              <Bars3Icon className="w-6 h-6" />
          </button>
          {isMobileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-700 rounded-md shadow-lg z-50 border border-gray-600 text-gray-200" role="menu">
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
                      
                      <div className="px-3 pt-2 pb-1 text-xs text-gray-400 font-semibold uppercase">{t('settings')}</div>
                      {/* Language Selection Mobile */}
                       <div className="px-3 py-1">
                          <span className="text-xs text-gray-500 block mb-1">{t('language')}</span>
                          <div className="flex space-x-2">
                             <button
                                onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}
                                className={`flex-1 py-1 rounded text-sm ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                             >
                                EN
                             </button>
                             <button
                                onClick={() => { setLanguage('vn'); setIsMobileMenuOpen(false); }}
                                className={`flex-1 py-1 rounded text-sm ${language === 'vn' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                             >
                                VN
                             </button>
                          </div>
                       </div>
                       
                       {/* Resolution Selection Mobile */}
                       <div className="px-3 py-1 pb-3">
                          <span className="text-xs text-gray-500 block mb-1">{t('aiResolution')}</span>
                          <div className="flex space-x-2">
                             <button
                                onClick={() => { setAiResolution('2K'); setIsMobileMenuOpen(false); }}
                                className={`flex-1 py-1 rounded text-sm ${aiResolution === '2K' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                             >
                                2K
                             </button>
                             <button
                                onClick={() => { setAiResolution('4K'); setIsMobileMenuOpen(false); }}
                                className={`flex-1 py-1 rounded text-sm ${aiResolution === '4K' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                             >
                                4K
                             </button>
                          </div>
                       </div>
                  </div>
              </div>
          )}
        </div>
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
          
          {/* Settings Button (Replaces Language Button) */}
          <div className="relative hidden md:block" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(prev => !prev)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
              title={t('settings')}
            >
              <Cog6ToothIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">{t('settings')}</span>
            </button>
            
            {isSettingsOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200 p-4">
                 <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">{t('settings')}</h3>
                 
                 {/* Language Section */}
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('language')}</label>
                    <div className="flex space-x-2">
                        <button
                           onClick={() => setLanguage('en')}
                           className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md border text-sm transition-colors ${language === 'en' ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        >
                           <span>{t('langEN')}</span>
                           {language === 'en' && <CheckIcon className="w-4 h-4 ml-1" />}
                        </button>
                        <button
                           onClick={() => setLanguage('vn')}
                           className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md border text-sm transition-colors ${language === 'vn' ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        >
                           <span>{t('langVN')}</span>
                           {language === 'vn' && <CheckIcon className="w-4 h-4 ml-1" />}
                        </button>
                    </div>
                 </div>

                 {/* AI Resolution Section */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('aiResolution')}</label>
                    <div className="flex space-x-2">
                        <button
                           onClick={() => setAiResolution('2K')}
                           className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md border text-sm transition-colors ${aiResolution === '2K' ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        >
                           <span>2K</span>
                           {aiResolution === '2K' && <CheckIcon className="w-4 h-4 ml-1" />}
                        </button>
                        <button
                           onClick={() => setAiResolution('4K')}
                           className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md border text-sm transition-colors ${aiResolution === '4K' ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        >
                           <span>4K</span>
                           {aiResolution === '4K' && <CheckIcon className="w-4 h-4 ml-1" />}
                        </button>
                    </div>
                 </div>
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
              <span className="md:hidden">{t('submitProjectMobile')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;