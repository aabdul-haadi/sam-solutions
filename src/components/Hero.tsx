import React, { useEffect, useState } from 'react';
import { ChevronDown, Sparkles, Zap, Globe, Crown, TrendingUp } from 'lucide-react';

interface HeroProps {
  openConsultation?: () => void;
  setCurrentPage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ openConsultation, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Modern Luxury Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950"></div>
        
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212,175,55,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212,175,55,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        {/* Luxury gradient accents */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gold-500/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent"></div>
        
        {/* Minimal floating elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              filter: 'blur(20px)',
            }}
          />
        ))}
        
        {/* Elegant line accents */}
        <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-gold-400/20 via-gold-400/10 to-transparent"></div>
        <div className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-t from-emerald-400/20 via-emerald-400/10 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/20"></div>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center relative z-20 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            {/* Minimal Crown Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                {/* <div className="absolute -inset-2 border border-gold-400/10 rounded-full animate-pulse-slow"></div>
                <Crown className="w-16 h-16 text-gold-300 relative" />
                <div className="absolute inset-0 bg-gold-300/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}
              </div>
            </div>
            
            {/* Main Headline */}
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="text-white">Not Another</span>
                <span className="text-gradient-luxury bg-gradient-to-r from-gold-300 via-gold-200 to-emerald-300 bg-clip-text text-transparent mx-2">
                  "It Takes Time"
                </span>
                <span className="text-white">Agency</span>
              </h1>
              
              {/* Subtle floating icons */}
              <div className="absolute top-8 left-8 opacity-30">
                <Sparkles className="w-6 h-6 text-gold-300" />
              </div>
              <div className="absolute top-8 right-8 opacity-30" style={{ animationDelay: '0.5s' }}>
                <Zap className="w-6 h-6 text-emerald-300" />
              </div>
            </div>

            {/* Subtitle */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="max-w-2xl mx-auto mb-12">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  We focus on <span className="text-gold-300 font-medium">efficiency</span> and <span className="text-emerald-300 font-medium">innovation</span> to deliver result-driven strategies that drive quick and measurable growth. No more waiting, just real results.
                </p>
              </div>
            </div>

            {/* Clean CTA Buttons */}
            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: '0.4s' }}>
              {/* Primary Button */}
              <button
                onClick={openConsultation}
                className="group relative px-10 py-4 rounded-full font-medium text-base transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-emerald-400 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0.5 bg-black rounded-full"></div>
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-emerald-300 flex items-center justify-center gap-2">
                  <Crown className="w-4 h-4" />
                  Start Your Project
                </span>
              </button>

              {/* Secondary Button */}
              <button
                onClick={() => {
                  setCurrentPage('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative px-10 py-4 rounded-full font-medium text-base transition-all duration-300 hover:scale-105 border border-gold-400/30 hover:border-emerald-400/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-white flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  View Portfolio
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={scrollToServices}
            className="group animate-bounce-slow"
          >
            <div className="relative p-2 rounded-full border border-gold-400/20 hover:border-emerald-400/40 transition-colors duration-300">
              <ChevronDown className="w-6 h-6 text-gold-300/60 group-hover:text-emerald-300/80 transition-colors duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .text-gradient-luxury {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 