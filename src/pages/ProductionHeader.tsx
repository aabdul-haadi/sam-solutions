import React from 'react';
import { Link } from 'react-router-dom';

type PageContent = 'hero' | 'services' | 'process' | 'about' | 'contact';

interface ProductionHeaderProps {
  currentPage: PageContent;
  navigateToPage: (page: PageContent) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  handleWhatsAppClick: () => void;
}

const ProductionHeader: React.FC<ProductionHeaderProps> = ({
  currentPage,
  navigateToPage,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleWhatsAppClick,
}) => {
  const mainNavItems: { id: PageContent; label: string }[] = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] p-2 sm:p-4">
      <div className="container mx-auto bg-white rounded-full shadow-lg px-4 sm:px-6 py-2" style={{width: '90%'}}>
        <div className="flex justify-between items-center">
          {/* Logo with compact mobile font */}
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <img src="/sam-x-logo.png" alt="SAM X Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            <span 
              style={{ fontFamily: 'BigerOver', fontWeight: 'bold' }} 
              className="text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap text-black flex items-center"
            >
              SAM <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mx-0.5 sm:mx-1">X</span> PRODUCTION
            </span>
          </Link>

          {/* Desktop Nav Items - Section-based production navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                  currentPage === item.id ? 'text-amber-500' : 'text-gray-700 hover:text-amber-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={handleWhatsAppClick}
              className="bg-amber-500 text-white font-bold py-2.5 px-5 xl:py-3 xl:px-6 rounded-full shadow-md hover:bg-amber-600 transition-all duration-300 text-sm xl:text-base"
            >
              Get Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="z-50 group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md rounded-full border-2 border-white/50 shadow-lg"
              aria-label="Toggle Menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-4 h-0.5 sm:w-5 bg-gray-800 rounded-full transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-4 h-0.5 sm:w-5 bg-gray-800 rounded-full transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-4 h-0.5 sm:w-5 bg-gray-800 rounded-full transform transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Brand name compacted in hamburger */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`lg:hidden fixed inset-y-0 right-0 z-40 w-[calc(100%-4rem)] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 sm:p-6 pt-8 sm:pt-10">
          {/* Compact brand in mobile menu */}
          <div className="flex items-center space-x-2 mb-6">
            <img src="/sam-x-logo.png" alt="SAM X Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ fontFamily: 'BigerOver', fontWeight: 'bold', fontSize: '1.1rem' }} 
              className="text-black flex items-center"
            >
              SAM <span className="text-2xl sm:text-3xl mx-1">X</span> PRODUCTION
            </Link>
          </div>
          <nav className="flex flex-col space-y-1">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { navigateToPage(item.id); setIsMobileMenuOpen(false); }}
                className="w-full text-left text-gray-700 hover:text-amber-500 font-bold uppercase tracking-widest py-2.5 text-base border-b border-gray-50"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t pt-5 mt-4">
              <button onClick={handleWhatsAppClick} className="bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-600 w-full text-base">
                Get Free Consultation
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ProductionHeader;