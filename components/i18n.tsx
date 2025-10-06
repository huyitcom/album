import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../i18n';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, replacements?: { [key: string]: string | number }): string => {
    // Ensure we have a defined language object, default to 'en'
    const langTranslations = translations[language] || translations['en'];
    // Get the string, fall back to english if not found, then to the key itself
    let text = langTranslations[key] || translations['en'][key] || key;
    
    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            const regex = new RegExp(`\\{${rKey}\\}`, 'g');
            text = text.replace(regex, String(replacements[rKey]));
        });
    }
    return text;
  };
  
  const value = { language, setLanguage, t };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
