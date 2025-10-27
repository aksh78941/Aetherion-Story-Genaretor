import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { en } from '../locales/en';
import { bn } from '../locales/bn';

type Language = 'en' | 'bn';
type Translations = typeof en;

const translations = { en, bn };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: keyof Translations, replacements?: Record<string, string>) => {
    let translation = translations[language][key] || translations['en'][key];
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{{${placeholder}}}`, replacements[placeholder]);
      });
    }
    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
