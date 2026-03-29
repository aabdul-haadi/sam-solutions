import React from 'react';
import { OptimizedImage } from './OptimizedImage';

const Hero: React.FC = () => {
  const heroImage = (
    <div className="relative flex items-center justify-center mt-8 lg:mt-0">
      <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden shadow-2xl z-10 border-4 md:border-8 border-white">
        <OptimizedImage
          src="/banner-sam-2.webp"
          alt="IT Solution Team"
          className="w-full h-full object-cover"
          priority
          placeholder="/banner-sam-2-placeholder.webp"
        />
      </div>
    </div>
  );

  return (
    <section className="relative bg-white pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden font-sans">
      {/* Background Shapes */}
      <div
        className="absolute top-0 right-0 w-full h-full bg-gray-900"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <svg className="absolute inset-0 w-full h-full text-gray-800" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 100,0 0,100" />
        </svg>
      </div>
      <div className="absolute top-48 left-20 w-8 h-8 opacity-30 text-gray-400 hidden md:block">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
      </div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-amber-500 rounded-full opacity-20 blur-2xl hidden md:block" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text and mobile image */}
          <div className="flex flex-col">
            <div className="z-10 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Not Another "It Takes Time" Agency
              </h1>
              <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-lg mx-auto lg:mx-0">
                We focus on efficiency and innovation to deliver result-driven strategies that drive quick and measurable growth. No more waiting, just real results.
              </p>
            </div>

            <div className="lg:hidden">
              {heroImage}
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                className="w-full sm:w-auto relative bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 text-base overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-3 h-3 bg-amber-500" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}></div>
                <span className="z-10">GET STARTED</span>
                <span className="z-10 font-thin text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <button
                className="w-full sm:w-auto relative bg-amber-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-amber-600 transition-all duration-300 flex items-center justify-center space-x-2 text-base overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-3 h-3 bg-gray-900" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-900" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}></div>
                <span className="z-10">GET QUOTE</span>
                <span className="z-10 font-thin text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Image for desktop */}
          <div className="hidden lg:block">
            {heroImage}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
