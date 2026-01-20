'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  openConsultation?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, openConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileSidebarRef = useRef<HTMLDivElement>(null);

  /* --------------------------------------------------------------------- */
  /*  Scroll Detection */
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* --------------------------------------------------------------------- */
  /*  Close Desktop Dropdown on Outside Click */
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesOpen]);

  /* --------------------------------------------------------------------- */
  /*  Close Mobile Sidebar on Outside Click */
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && mobileSidebarRef.current && !mobileSidebarRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  /* --------------------------------------------------------------------- */
  /*  Navigation Data */
  /* --------------------------------------------------------------------- */
  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Portfolio', page: 'portfolio' },
    { name: 'Blog', page: 'blog' },
    { name: 'Marketing Agency', page: 'marketing-agency' },
    { name: 'About', page: 'home' },
    { name: 'Contact', page: 'contact' },
  ];

  const serviceItems = [
    { name: 'Web Development', page: 'web-development' },
    { name: 'Graphic Designing', page: 'graphic-designing' },
    { name: 'SEO & Content', page: 'seo-content' },
    { name: 'AI Solutions', page: 'ai-solutions' },
    { name: 'Performance Marketing', page: 'performance-marketing' },
  ];

  const blogPostSlugs = [
    'future-ai-web-development-2025',
    'ecommerce-seo-guide',
    'scalable-saas-applications',
    'ui-ux-design-trends-2025',
    'implementing-ai-chatbots',
    'mobile-first-design',
  ];

  /* --------------------------------------------------------------------- */
  /*  Helpers */
  /* --------------------------------------------------------------------- */
  const isActive = (page: string) => currentPage === page;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  /* --------------------------------------------------------------------- */
  /*  Navigation Handlers */
  /* --------------------------------------------------------------------- */
  const navigateToPage = (page: string) => {
    closeMobileSidebar();
    setCurrentPage(page);
    scrollToTop();
  };

  const navigateToHomeSection = (sectionId: string) => {
    setCurrentPage('home');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      closeMobileSidebar();
    }, 150);
  };

  const handleMobileNavClick = (item: typeof navItems[0]) => {
    if (item.name === 'About') {
      navigateToHomeSection('about');
    } else {
      navigateToPage(item.page);
    }
  };

  const handleMobileServiceClick = (page: string) => {
    navigateToPage(page);
  };

  const handleMobilePricingClick = () => {
    navigateToPage('pricing');
  };

  /* --------------------------------------------------------------------- */
  /*  Desktop Handlers - 100% WORKING */
  /* --------------------------------------------------------------------- */
  const handleDesktopNavClick = (item: typeof navItems[0]) => {
    if (item.name === 'About') {
      scrollToSection('about');
    } else {
      setCurrentPage(item.page);
      scrollToTop();
    }
  };

  const handleDesktopServiceClick = (page: string) => {
    setCurrentPage(page);
    scrollToTop();
    setIsServicesOpen(false); // Close dropdown
  };

  const handleDesktopPricingClick = () => {
    setCurrentPage('pricing');
    scrollToTop();
  };

  const handleConsultationClick = () => {
    openConsultation?.();
  };

  /* --------------------------------------------------------------------- */
  /*  Header Styling */
  /* --------------------------------------------------------------------- */
  const getHeaderBackground = () => {
    const isBlogOrPost = ['blog'].includes(currentPage) || blogPostSlugs.includes(currentPage);
    const isOtherPage = [
      'portfolio', 'contact', 'terms', 'privacy', 'faq', 'pricing',
      ...serviceItems.map(s => s.page),
    ].includes(currentPage);
    return isBlogOrPost || isOtherPage
      ? 'bg-black/95 backdrop-blur-sm shadow-sm'
      : isScrolled
      ? 'bg-black/95 backdrop-blur-sm shadow-sm'
      : 'bg-transparent';
  };

  const getTextColor = () => 'text-white';

  return (
    <>
      {/* ====================== MAIN HEADER ====================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${getHeaderBackground()} ${
          isScrolled || currentPage !== 'home' ? 'py-3' : 'py-4 sm:py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-7xl">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
              onClick={() => {
                setCurrentPage('home');
                scrollToTop();
              }}
            >
              <img
                src="/icon-04.png"
                alt="SAM CREATIVE Logo"
                className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 object-contain"
              />
              <div className="flex flex-col">
                <span
                  style={{ fontFamily: 'BigerOver' }}
                  className={`text-sm sm:text-base lg:text-lg xl:text-xl font-bold ${getTextColor()} group-hover:text-yellow-400 transition-colors`}
                >
                  SAM CREATIVE
                </span>
                <span className="text-[9px] sm:text-[10px] lg:text-xs text-yellow-400 font-medium -mt-0.5 tracking-[0.15em]">
                  solutions
                </span>
              </div>
            </div>

            {/* ====================== DESKTOP NAV (100% WORKING) ====================== */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleDesktopNavClick(item)}
                  className={`relative text-base xl:text-lg font-medium transition-all duration-300 hover:text-yellow-400 group ${
                    isActive(item.page) ? 'text-yellow-400' : getTextColor()
                  }`}
                >
                  {item.name}
                  {isActive(item.page) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400" />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}

              {/* Desktop Services Dropdown - 100% FUNCTIONAL */}
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsServicesOpen(prev => !prev);
                  }}
                  className={`relative text-base xl:text-lg font-medium transition-all duration-300 group flex items-center space-x-1 ${
                    serviceItems.some(s => isActive(s.page)) ? 'text-yellow-400' : getTextColor()
                  }`}
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                >
                  <span className="relative group-hover:text-yellow-400">
                    Services
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                    {serviceItems.some(s => isActive(s.page)) && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400" />
                    )}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-all duration-300 ${
                      isServicesOpen ? 'rotate-180 text-yellow-400' : getTextColor()
                    }`}
                  />
                </button>

                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-yellow-200/50 py-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="absolute -top-2 left-6 w-4 h-4 bg-white/95 border-l border-t border-yellow-200/50 transform rotate-45" />
                    {serviceItems.map((service) => (
                      <button
                        key={service.page}
                        onClick={() => handleDesktopServiceClick(service.page)}
                        className={`w-full text-left px-6 py-3 transition-all duration-300 group flex items-center space-x-3 ${
                          isActive(service.page)
                            ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-r-4 border-yellow-400'
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 hover:text-yellow-700'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive(service.page)
                              ? 'bg-yellow-400 scale-125'
                              : 'bg-gray-300 group-hover:bg-yellow-400 group-hover:scale-125'
                          }`}
                        />
                        <span className="font-medium text-base">{service.name}</span>
                      </button>
                    ))}
                    <div className="mt-2 pt-2 border-t border-gray-100 px-6">
                      <p className="text-xs text-gray-500 mb-2">Need something custom?</p>
                      <button
                        onClick={handleConsultationClick}
                        className="text-xs text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                      >
                        Get Free Consultation
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Pricing */}
              <button
                onClick={handleDesktopPricingClick}
                className={`px-5 lg:px-6 py-2.5 rounded-full border-2 shadow-lg font-medium transition-all duration-300 text-sm lg:text-base ${
                  isActive('pricing')
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-yellow-400 shadow-yellow-400/40 scale-105'
                    : 'border-yellow-400 text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-black hover:shadow-yellow-400/40 hover:scale-105'
                }`}
              >
                Pricing
              </button>
            </nav>

            {/* Desktop CTA - 100% WORKING */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={handleConsultationClick}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-5 lg:px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
              >
                Get Free Consultation
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden ${getTextColor()} p-2 rounded-full hover:bg-white/10 transition-colors`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ====================== MOBILE SIDEBAR (Right Side) ====================== */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-300"
            onClick={closeMobileSidebar}
          />

          <div
            ref={mobileSidebarRef}
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-black via-black/95 to-black/90 backdrop-blur-2xl border-l border-yellow-500/20 z-50 lg:hidden animate-slide-in-from-right duration-300"
          >
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-yellow-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src="/icon-04.png" alt="Logo" className="w-10 h-10" />
                    <div>
                      <h1 className="text-xl font-bold text-white tracking-tight">SAM CREATIVE</h1>
                      <p className="text-xs text-yellow-400 font-medium tracking-widest">SOLUTIONS</p>
                    </div>
                  </div>
                  <button
                    onClick={closeMobileSidebar}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleMobileNavClick(item)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-200 ${
                      isActive(item.page)
                        ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 text-yellow-300 border border-yellow-500/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="font-medium text-base">{item.name}</span>
                    {/* Active dot */}
                    {isActive(item.page) && <div className="w-2 h-2 bg-yellow-400 rounded-full" />}
                  </button>
                ))}

                <button
                  onClick={() => navigateToHomeSection('about')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-200 ${
                    currentPage === 'home' && window.scrollY > 1200
                      ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 text-yellow-300 border border-yellow-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="font-medium text-base">About</span>
                </button>

                <div className="space-y-1">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-200 ${
                      isServicesOpen
                        ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 text-yellow-300 border border-yellow-500/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="font-semibold text-base">Our Services</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isServicesOpen && (
                    <div className="space-y-1 pl-6 mt-2">
                      {serviceItems.map((service) => (
                        <button
                          key={service.page}
                          onClick={() => handleMobileServiceClick(service.page)}
                          className={`w-full flex items-center p-3 rounded-xl text-left transition-all duration-200 ${
                            isActive(service.page)
                              ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="font-medium text-sm">{service.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0 space-y-3 border-t border-yellow-500/20">
                <button
                  onClick={handleMobilePricingClick}
                  className={`w-full py-4 px-6 rounded-2xl border-2 font-semibold text-base transition-all ${
                    isActive('pricing')
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-yellow-500 shadow-lg'
                      : 'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10'
                  }`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => {
                    closeMobileSidebar();
                    openConsultation?.();
                  }}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 px-6 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  Get Free Consultation
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;