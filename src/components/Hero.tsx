import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles, Zap, Globe } from 'lucide-react';
import bgVideo from '../assets/bg2.webm';

interface HeroProps {
  openConsultation?: () => void;
}

const Hero: React.FC<HeroProps> = ({ openConsultation }) => {
  // const  = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      // Update navbar background based on scroll position
      setIsScrolled(scrolled > 50);
      
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
        
            <div className="hidden sm:flex space-x-8">
              <a href="#home" className="text-white hover:text-yellow-400 transition-colors">Home</a>
              <a href="#services" className="text-white hover:text-yellow-400 transition-colors">Services</a>
              <a href="#portfolio" className="text-white hover:text-yellow-400 transition-colors">Portfolio</a>
              <a href="#contact" className="text-white hover:text-yellow-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div 
          ref={parallaxRef}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={bgVideo} type="video/webm" />
          </video>
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Floating Icons */}
          <div className="absolute top-1/4 left-1/4 animate-pulse">
            <Globe className="w-8 h-8 text-yellow-400/30" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-bounce">
            <Zap className="w-6 h-6 text-yellow-400/20" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-pulse">
            <Sparkles className="w-10 h-10 text-yellow-400/25" />
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">We </span>
              <span className="text-yellow-400">Design</span>
              <span className="text-white">. We </span>
              <span className="text-yellow-400">Code</span>
              <span className="text-white">.</span>
              <br />
              <span className="text-white">We </span>
              <span className="text-yellow-400">Scale</span>
              <span className="text-white">.</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Premium digital experiences that captivate audiences and drive results. 
              From AI-powered solutions to stunning designs.
            </p>
          </div>

          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={openConsultation}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </button>
            <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToServices}
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;