import React, { useState } from 'react';
import ProductionHeader from './ProductionHeader';
import {
  ProductionHero,
  ProductionTrust,
  ProductionPainPoints,
  ProductionServices,
  ProductionPortfolio,
  ProductionPlatforms,
  ProductionPackages,
  ProductionImpact,
  ProductionProcess,
  ProductionTestimonials,
  ProductionFAQ,
  ProductionFinalCTA,
} from './production/components';

type PageContent = 'hero' | 'services' | 'process' | 'about' | 'contact';

const sectionIds: Record<PageContent, string> = {
  hero: 'hero',
  services: 'services',
  process: 'process',
  about: 'impact',
  contact: 'final-cta',
};

const ProductionPage: React.FC = () => {
  const [currentPage, setCurrentPageState] = useState<PageContent>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateToPage = (page: PageContent) => {
    setCurrentPageState(page);
    setIsMobileMenuOpen(false);

    const targetId = sectionIds[page];
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 110;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    const message = "Hi SAM X PRODUCTION, I'm interested in starting a new production project.";
    window.open(`https://wa.me/923138372573?text=${encodeURIComponent(message)}`, '_blank');
  };

  React.useEffect(() => {
    const seoData = {
      hero: {
        title: 'SAM X PRODUCTION | Premium Video Production & Creative Studio',
        description: 'SAM X PRODUCTION delivers high-end video production, commercial ads, cinematography, 3D animation, and brand storytelling for businesses worldwide.'
      },
      services: {
        title: 'Production Services | Video Ads, 3D & Content Creation | SAM X',
        description: 'Explore our production capabilities: 4K commercial shoots, 3D motion graphics, cinematography, and high-engagement social media content production.'
      },
      process: {
        title: 'Our Creative Process | Pre-Production to Post-Production | SAM X PRODUCTION',
        description: 'Discover our streamlined production workflow: From concept development and pre-production planning to shooting, editing, and final delivery.'
      },
      about: {
        title: 'About SAM X PRODUCTION | Award-Winning Creative Team',
        description: 'Meet the passionate team behind SAM X PRODUCTION, dedicated to pushing visual media boundaries with industry-leading equipment and creativity.'
      },
      contact: {
        title: 'Contact SAM X PRODUCTION | Start Your Production Project',
        description: 'Ready to create something legendary? Get a custom production quote for your next video, ad, or creative campaign with SAM X PRODUCTION.'
      }
    };

    const currentSEO = seoData[currentPage];
    const seoTitle = currentSEO.title;
    const seoDescription = currentSEO.description;
    const seoKeywords = 'SAM X Production, SAM Production, production ads, video production, commercial production, creative production studio, cinematography, 3D animation, brand storytelling, content production';
    const seoImage = `${window.location.origin}/sam-x-logo.webp`;
    const seoUrl = window.location.href;

    document.title = seoTitle;

    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      const selector = `${attr}="${name}"`;
      let tag = document.head.querySelector(`meta[${selector}]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMeta('description', seoDescription);
    updateMeta('keywords', seoKeywords);
    updateMeta('robots', 'index,follow');
    updateMeta('og:title', seoTitle, 'property');
    updateMeta('og:description', seoDescription, 'property');
    updateMeta('og:site_name', 'SAM X PRODUCTION', 'property');
    updateMeta('og:type', 'website', 'property');
    updateMeta('og:url', seoUrl, 'property');
    updateMeta('og:image', seoImage, 'property');
    updateMeta('og:locale', 'en_US', 'property');
    updateMeta('author', 'SAM X PRODUCTION');
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', seoTitle);
    updateMeta('twitter:description', seoDescription);
    updateMeta('twitter:image', seoImage);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seoUrl);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'SAM X PRODUCTION',
      'url': seoUrl,
      'logo': seoImage,
      'description': seoDescription,
      'email': 'samcreativeofficials@gmail.com',
      'telephone': '+923138372573',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Karachi',
        'addressCountry': 'PK'
      },
      'sameAs': [
        'https://wa.me/923138372573'
      ],
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+923138372573',
          'contactType': 'Customer Support',
          'areaServed': 'Global',
          'availableLanguage': ['English']
        }
      ],
      'serviceType': [
        'Video Production',
        'Commercial Ads',
        'Cinematography',
        '3D Animation',
        'Content Production'
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-white">
      <a
        href="#production-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to production content
      </a>

      <ProductionHeader
        currentPage={currentPage}
        navigateToPage={navigateToPage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleWhatsAppClick={handleWhatsAppClick}
      />

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

export default ProductionPage;
