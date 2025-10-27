import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LoadingScreen: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-fadeIn">
      <dotlottie-wc
        src="https://lottie.host/4a79efb0-e77e-460c-85de-9e54b8c6eb6c/mubwv3ARiO.lottie"
        style={{width: '300px', height: '300px'}}
        autoplay
        loop
      />
      <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">{t('loading_message')}</p>
    </div>
  );
};

export default LoadingScreen;
