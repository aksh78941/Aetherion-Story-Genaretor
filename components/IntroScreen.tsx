import React from 'react';

const IntroScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center animate-fadeIn">
      <dotlottie-wc
        src="https://lottie.host/33b51fed-8cc5-462d-b36c-7e94c3d1988d/CsKIrd0U0e.lottie"
        style={{width: '300px', height: '300px'}}
        autoplay
        loop
      />
    </div>
  );
};

export default IntroScreen;