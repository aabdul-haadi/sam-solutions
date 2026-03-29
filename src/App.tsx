import React, { useState, useEffect, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ConsultationPopup from './components/ConsultationPopup';
import CookieConsent from './components/CookieConsent';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AIServices from './components/AIServices';
import About from './components/About';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import InnovationShowcase from './components/InnovationShowcase';
import MarketingAgencyPage from './pages/MarketingAgencyPage';

// Page components
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FAQPage from './pages/FAQPage';
import PricingPage from './pages/PricingPage';
import WebDevelopmentPage from './pages/services/WebDevelopmentPage';
import GraphicDesigningPage from './pages/services/GraphicDesigningPage';
import SEOContentPage from './pages/services/SEOContentPage';
import AISolutionsPage from './pages/services/AISolutionsPage';
import PerformanceMarketingPage from './pages/services/PerformanceMarketingPage';

// Blog post components
import FutureAIWebDevelopment2025 from './blogs/future-ai-web-development-2025';
import EcommerceSEOGuide from './blogs/ecommerce-seo-guide';
import ScalableSaaSApplications from './blogs/scalable-saas-applications';
import ImplementingAIChatbots from './blogs/implementing-ai-chatbots';
import MobileFirstDesign from './blogs/mobile-first-design';
import UIUXDesignTrends2025 from './blogs/ui-ux-design-trends-2025';

// Types for route configuration
interface RouteConfig {
  path: string;
  page: string;
  title: string;
  description: string;
}

// Route and metadata configuration
const routeConfig: RouteConfig[] = [
  {
    path: '/',
    page: 'home',
    title: 'SAM CREATIVE Solutions - Premium Digital Agency | Web Development & AI Solutions',
    description:
      'Premium digital agency specializing in web development, AI solutions, and luxury design. Transform your business with cutting-edge technology and creative excellence.',
  },
  {
    path: '/portfolio',
    page: 'portfolio',
    title: 'Portfolio - SAM CREATIVE Solutions | Premium Digital Projects',
    description:
      'Explore our portfolio of successful web development, AI solutions, and design projects. See how we transform businesses with cutting-edge technology.',
  },
  {
    path: '/contact',
    page: 'contact',
    title: 'Contact Us - SAM CREATIVE Solutions | Get Free Consultation',
    description:
      'Contact SAM CREATIVE Solutions for premium web development, AI solutions, and digital services. Get your free consultation today.',
  },
  {
    path: '/blog',
    page: 'blog',
    title: 'Blog - SAM CREATIVE Solutions | Web Development & AI Insights',
    description:
      'Stay updated with the latest trends in web development, AI technology, and digital innovation. Expert insights and industry knowledge.',
  },
  {
    path: '/privacy-policy',
    page: 'privacy',
    title: 'Privacy Policy - SAM CREATIVE Solutions',
    description:
      'Learn how SAM CREATIVE Solutions protects your privacy and handles your personal information. Our commitment to data security and transparency.',
  },
  {
    path: '/terms-of-service',
    page: 'terms',
    title: 'Terms of Service - SAM CREATIVE Solutions',
    description:
      'Read our terms of service and understand our policies for using SAM CREATIVE Solutions services and website.',
  },
  {
    path: '/faq',
    page: 'faq',
    title: 'FAQ - SAM CREATIVE Solutions | Frequently Asked Questions',
    description:
      'Find answers to common questions about our web development, AI solutions, and digital services. Get the information you need.',
  },
  {
    path: '/pricing',
    page: 'pricing',
    title: 'Pricing - SAM CREATIVE Solutions | Competitive Rates for Premium Services',
    description:
      'Transparent pricing for web development, AI solutions, design, and more. Premium quality at competitive rates with satisfaction guarantee.',
  },
  {
    path: '/services/web-development',
    page: 'web-development',
    title: 'Web Development Services - SAM CREATIVE Solutions',
    description:
      'Professional web development services including custom websites, web applications, and e-commerce solutions.',
  },
  {
    path: '/services/graphic-designing',
    page: 'graphic-designing',
    title: 'Graphic Design Services - SAM CREATIVE Solutions',
    description:
      'Professional graphic design services including logo design, brand identity, and marketing materials.',
  },
  {
    path: '/services/seo-content',
    page: 'seo-content',
    title: 'SEO & Content Services - SAM CREATIVE Solutions',
    description:
      'Professional SEO and content marketing services to boost your online visibility and drive organic traffic.',
  },
  {
    path: '/services/ai-solutions',
    page: 'ai-solutions',
    title: 'AI Solutions - SAM CREATIVE Solutions',
    description:
      'Custom AI solutions including chatbots, automation, and intelligent business process optimization.',
  },
  {
    path: '/services/performance-marketing',
    page: 'performance-marketing',
    title: 'Performance Marketing - SAM CREATIVE Solutions',
    description:
      'Drive measurable results with our performance marketing services. We offer data-driven solutions that maximize ROI through strategic campaigns.',
  },
  {
    path: '/marketing-agency',
    page: 'marketing-agency',
    title: 'Marketing Agency Services - SAM CREATIVE Solutions',
    description:
      'Professional marketing agency services including digital strategy, performance marketing, social media management, and creative design solutions.',
  },
  {
    path: '/blog/future-ai-web-development-2025',
    page: 'future-ai-web-development-2025',
    title: 'The Future of AI in Web Development: Trends to Watch in 2025',
    description:
      'Discover how artificial intelligence is revolutionizing web development and what trends will shape the industry in 2025.',
  },
  {
    path: '/blog/ecommerce-seo-guide',
    page: 'ecommerce-seo-guide',
    title: 'Complete Guide to E-commerce SEO: Boost Your Online Store Rankings',
    description:
      'Learn proven strategies to improve your e-commerce website\'s search engine rankings and drive more organic traffic to your online store.',
  },
  {
    path: '/blog/scalable-saas-applications',
    page: 'scalable-saas-applications',
    title: 'Building Scalable SaaS Applications: Best Practices and Architecture',
    description:
      'Essential guidelines for developing robust, scalable SaaS applications that can grow with your business.',
  },
  {
    path: '/blog/ui-ux-design-trends-2025',
    page: 'ui-ux-design-trends-2025',
    title: 'UI/UX Design Trends That Will Dominate 2025',
    description:
      'Explore the latest design trends and how to implement them in your next project for maximum user engagement and conversion.',
  },
  {
    path: '/blog/implementing-ai-chatbots',
    page: 'implementing-ai-chatbots',
    title: 'Implementing AI Chatbots: A Step-by-Step Business Guide',
    description:
      'Everything you need to know about implementing AI chatbots to improve customer service and reduce operational costs.',
  },
  {
    path: '/blog/mobile-first-design',
    page: 'mobile-first-design',
    title: 'Mobile-First Design: Why It\'s Critical for Modern Websites',
    description:
      'Understanding the importance of mobile-first design and how to implement it effectively for better user experience and search rankings.',
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);

  // Update page metadata
  const updatePageMeta = useCallback(
    (title: string, description: string, path: string) => {
      document.title = title;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }

      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://samcreative-solutions.com${path}`);

      // Update Open Graph URL
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', `https://samcreative-solutions.com${path}`);
      } else {
        const ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', 'og:url');
        ogMeta.setAttribute('content', `https://samcreative-solutions.com${path}`);
        document.head.appendChild(ogMeta);
      }
    },
    []
  );

  // Handle routing
  const handleRouting = useCallback(() => {
    const path = window.location.pathname;
    const route = routeConfig.find((r) => r.path === path) || routeConfig[0]; // Fallback to home
    setCurrentPage(route.page);
    updatePageMeta(route.title, route.description, route.path);
  }, [updatePageMeta]);

  useEffect(() => {
    handleRouting();
    window.addEventListener('popstate', handleRouting);
    return () => window.removeEventListener('popstate', handleRouting);
  }, [handleRouting]);

  // Handle page navigation
  const handlePageChange = useCallback((page: string) => {
    const route = routeConfig.find((r) => r.page === page);
    if (!route) {
      console.error(`Route not found for page: ${page}`);
      return;
    }
    window.history.pushState({ page }, '', route.path);
    setCurrentPage(page);
    updatePageMeta(route.title, route.description, route.path);
  }, [updatePageMeta]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const openConsultation = useCallback(() => {
    setIsConsultationOpen(true);
  }, []);

  const closeConsultation = useCallback(() => {
    setIsConsultationOpen(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  const renderPage = () => {
    const pageComponents: Record<string, JSX.Element> = {
      portfolio: <PortfolioPage setCurrentPage={handlePageChange} />,
      blog: <BlogPage setCurrentPage={handlePageChange} />,
      contact: <ContactPage setCurrentPage={handlePageChange} />,
      'future-ai-web-development-2025': <FutureAIWebDevelopment2025 setCurrentPage={handlePageChange} />,
      'ecommerce-seo-guide': <EcommerceSEOGuide setCurrentPage={handlePageChange} />,
      'scalable-saas-applications': <ScalableSaaSApplications setCurrentPage={handlePageChange} />,
      'ui-ux-design-trends-2025': <UIUXDesignTrends2025 setCurrentPage={handlePageChange} />,
      'implementing-ai-chatbots': <ImplementingAIChatbots setCurrentPage={handlePageChange} />,
      'mobile-first-design': <MobileFirstDesign setCurrentPage={handlePageChange} />,
      terms: <TermsPage setCurrentPage={handlePageChange} />,
      privacy: <PrivacyPage setCurrentPage={handlePageChange} />,
      faq: <FAQPage setCurrentPage={handlePageChange} />,
      pricing: <PricingPage setCurrentPage={handlePageChange} />,
      'web-development': <WebDevelopmentPage setCurrentPage={handlePageChange} />,
      'graphic-designing': <GraphicDesigningPage setCurrentPage={handlePageChange} />,
      'seo-content': <SEOContentPage setCurrentPage={handlePageChange} />,
      'ai-solutions': <AISolutionsPage setCurrentPage={handlePageChange} />,
      'performance-marketing': <PerformanceMarketingPage setCurrentPage={handlePageChange} />,
            'marketing-agency': <MarketingAgencyPage setCurrentPage={handlePageChange} />,

    };

    return (
      pageComponents[currentPage] || (
        <>
          <Hero openConsultation={openConsultation} setCurrentPage={handlePageChange} />
          <Services />
          <AIServices />
          <InnovationShowcase />
          <About />
          <Stats />
          <Portfolio setCurrentPage={handlePageChange} />
          <Testimonials />
        </>
      )
    );
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {currentPage !== 'marketing-agency' && (
        <Header
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          openConsultation={openConsultation}
        />
      )}
      {renderPage()}
      {currentPage !== 'marketing-agency' && <Footer setCurrentPage={handlePageChange} />}
      <ConsultationPopup isOpen={isConsultationOpen} onClose={closeConsultation} />
      <CookieConsent />
    </div>
  );
}

export default App;
