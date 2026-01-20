import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Brand Logo & Name */}
        <div className="mb-10">
          <div className="flex justify-center mb-6">
            <img
              src="/icon-04.png"
              alt="SAM CREATIVE Logo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto animate-pulse"
            />
          </div>

          <h1
            style={{ fontFamily: 'BigerOver' }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 animate-fade-in-up"
          >
            SAM CREATIVE
          </h1>

          <p
            className="text-yellow-400 text-xl md:text-2xl font-medium animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            solutions
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-72 md:w-80 mx-auto">
          <div className="bg-gray-800 rounded-full h-1.5 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full transition-all duration-300 ease-out shadow-lg shadow-yellow-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-300 text-base font-medium">Loading {progress}%</p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-60 blur-sm"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-40 blur-sm"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-50 blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;