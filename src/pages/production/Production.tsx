import React from 'react';
import ProductionHero from './components/ProductionHero';
import ProductionTrust from './components/ProductionTrust';
import ProductionPainPoints from './components/ProductionPainPoints';
import ProductionServices from './components/ProductionServices';
import ProductionPortfolio from './components/ProductionPortfolio';
import ProductionPlatforms from './components/ProductionPlatforms';
import ProductionPackages from './components/ProductionPackages';
import ProductionImpact from './components/ProductionImpact';
import ProductionProcess from './components/ProductionProcess';
import ProductionTestimonials from './components/ProductionTestimonials';
import ProductionFAQ from './components/ProductionFAQ';
import ProductionFinalCTA from './components/ProductionFinalCTA';

const Production: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <a
        href="#production-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to production content
      </a>

      <ProductionHero />

      <div id="production-content">
        <ProductionTrust />
        <ProductionPainPoints />
        <ProductionServices />
        <ProductionPortfolio />
        <ProductionPlatforms />
        <ProductionPackages />
        <ProductionImpact />
        <ProductionProcess />
        <ProductionTestimonials />
        <ProductionFAQ />
        <ProductionFinalCTA />
      </div>
    </main>
  );
};

export default Production;
