import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LoadingScreen: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-fadeIn">
      <dotlottie-wc
        src="https://lottie.host/33b51fed-8cc5-462d-b36c-7e94c3d1988d/CsKIrd0U0e.lottie"
        style={{width: '300px', height: '300px'}}
        autoplay
        loop
      />
      <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">{t('loading_message')}</p>
    </div>
  );
};

export default LoadingScreen;