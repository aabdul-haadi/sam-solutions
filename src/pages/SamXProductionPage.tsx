import React from 'react';
import SamXHero from './production/components/SamXHero';
import ProductionTrust from './production/components/ProductionTrust';
import ProductionPainPoints from './production/components/ProductionPainPoints';
import ProductionServices from './production/components/ProductionServices';
import ProductionPlatforms from './production/components/ProductionPlatforms';
import ProductionImpact from './production/components/ProductionImpact';
import ProductionPortfolio from './production/components/ProductionPortfolio';
import ProductionProcess from './production/components/ProductionProcess';
import ProductionPackages from './production/components/ProductionPackages';
import ProductionTestimonials from './production/components/ProductionTestimonials';
import ProductionFAQ from './production/components/ProductionFAQ';
import ProductionFinalCTA from './production/components/ProductionFinalCTA';

const SamXProductionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Unique Header for SAM X PRODUCTION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/black-icon-sam.png" 
              alt="SAM X Logo" 
              className="h-8 w-8 invert brightness-0" 
            />
            <span className="text-white font-black tracking-tighter text-xl">
              SAM X <span className="text-yellow-400">PRODUCTION</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Portfolio', 'Packages', 'Process', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-gray-300 hover:text-yellow-400 text-sm font-bold uppercase tracking-widest transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="https://wa.me/03132480332"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-tighter hover:bg-yellow-300 transition-all shadow-[0_0_15px_rgba(250,204,21,0.3)]"
          >
            Book Now
          </a>
        </nav>
      </header>

      <main>
        <SamXHero />
        <ProductionTrust />
        <div className="bg-gray-50">
          <ProductionPainPoints />
        </div>
        <ProductionServices />
        <ProductionPlatforms />
        <ProductionImpact />
        <ProductionPortfolio />
        <ProductionProcess />
        <div id="packages">
          <ProductionPackages />
        </div>
        <ProductionTestimonials />
        <ProductionFAQ />
        <ProductionFinalCTA />
      </main>
    </div>
  );
};

export default SamXProductionPage;