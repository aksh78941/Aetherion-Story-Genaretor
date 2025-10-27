import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const switchLang = (lang: 'en' | 'bn') => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
      <button
        onClick={() => switchLang('en')}
        className={`px-3 py-1 rounded-full transition-colors ${language === 'en' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-bold shadow' : 'text-gray-500 dark:text-gray-400'}`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => switchLang('bn')}
        className={`px-3 py-1 rounded-full transition-colors ${language === 'bn' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-bold shadow' : 'text-gray-500 dark:text-gray-400'}`}
        aria-pressed={language === 'bn'}
      >
        BN
      </button>
    </div>
  );
};

export default LanguageToggle;
