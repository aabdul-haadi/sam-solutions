import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, BarChart, PenTool, Layout, Code, CheckCircle, TrendingUp, Users, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isMobileServicesMenuOpen, setIsMobileServicesMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const navLinks = [
    { title: 'Home', dropdown: false, href: '/' },
    { title: 'Portfolio', dropdown: false, href: '/portfolio' },
    { title: 'Blog', dropdown: false, href: '/blog' },
    { title: 'About', dropdown: false, href: '/#about' },
    { title: 'Contact', dropdown: false, href: '/contact' },
    { title: 'Services', dropdown: true, href: '#' },
    { title: 'Pricing', dropdown: false, href: '/pricing' },
    { title: 'Production Services', dropdown: false, href: '/production' },
  ];

 const servicesLinks = [
      { 
          title: 'Web Development', 
          icon: <Code size={20} />, 
          description: 'Building modern, responsive websites and applications that drive growth and user engagement.',
          image: '/web-ser.jpg',
          stats: { label: 'Increase in Conversion', value: 50 },
          highlights: [
              { text: 'Blazing Fast', icon: <Zap size={20} className="text-amber-500" /> },
              { text: 'Scalable Growth', icon: <TrendingUp size={20} className="text-amber-500" /> },
              { text: 'Engaging UX', icon: <Users size={20} className="text-amber-500" /> }
          ],
          href: '/services/web-development'
      },
      { 
          title: 'Graphic Designing', 
          icon: <PenTool size={20} />, 
          description: 'Creating stunning visuals for your brand identity that captivate and inspire your audience.',
          image: '/ghraphic-ser.webp',
          stats: { label: 'Boost in Recognition', value: 70 },
          highlights: [
              { text: 'Memorable Branding', icon: <Zap size={20} className="text-amber-500" /> },
              { text: 'Higher Engagement', icon: <TrendingUp size={20} className="text-amber-500" /> },
              { text: 'Consistent Visuals', icon: <Users size={20} className="text-amber-500" /> }
          ],
          href: '/services/graphic-designing'
      },
      { 
          title: 'SEO & Content', 
          icon: <BarChart size={20} />, 
          description: 'Driving organic traffic and boosting your online presence with data-driven strategies.',
          image: '/seo-ser.webp',
          stats: { label: 'Organic Traffic Growth', value: 80 },
          highlights: [
              { text: 'Higher Rankings', icon: <Zap size={20} className="text-amber-500" /> },
              { text: 'Quality Leads', icon: <TrendingUp size={20} className="text-amber-500" /> },
              { text: 'Increased Authority', icon: <Users size={20} className="text-amber-500" /> }
          ],
          href: '/services/seo-content'
      },
      { 
          title: 'AI Solutions', 
          icon: <Globe size={20} />, 
          description: 'Leveraging artificial intelligence to solve complex problems and create new opportunities.',
          image: '/ai-ser.webp',
          stats: { label: 'Efficiency Improvement', value: 90 },
          highlights: [
              { text: 'Process Automation', icon: <Zap size={20} className="text-amber-500" /> },
              { text: 'Data-driven Insights', icon: <TrendingUp size={20} className="text-amber-500" /> },
              { text: 'Personalized Experiences', icon: <Users size={20} className="text-amber-500" /> }
          ],
          href: '/services/ai-solutions'
      },
      { 
          title: 'Performance Marketing', 
          icon: <Layout size={20} />, 
          description: 'Maximizing your ROI with data-driven marketing strategies and continuous optimization.',
          image: '/performance-ser.webp',
          stats: { label: 'Increase in ROI', value: 60 },
          highlights: [
              { text: 'Targeted Advertising', icon: <Zap size={20} className="text-amber-500" /> },
              { text: 'Measurable Results', icon: <TrendingUp size={20} className="text-amber-500" /> },
              { text: 'Continuous Optimization', icon: <Users size={20} className="text-amber-500" /> }
          ],
          href: '/services/performance-marketing'
      },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setIsServicesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-2 sm:p-4">
      <div className="container mx-auto bg-white rounded-full shadow-lg px-4 sm:px-6 py-2" style={{width: '90%'}}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <img src="/black-icon-sam.webp" alt="SAM CREATIVE Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            <span style={{ fontFamily: 'BigerOver', fontWeight: 'bold' }} className="text-base sm:text-lg md:text-xl whitespace-nowrap">
              SAM CREATIVE
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link, index) => (
                <div key={index} className="relative">
                    {link.dropdown ? (
                        <a
                            href={link.href}
                            className="flex items-center text-gray-700 hover:text-amber-500 transition-colors duration-300 font-medium"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsServicesMenuOpen(!isServicesMenuOpen);
                            }}
                        >
                            {link.title}
                            <ChevronDown className="ml-1 h-4 w-4" />
                        </a>
                    ) : (
                        <Link
                            to={link.href}
                            className="flex items-center text-gray-700 hover:text-amber-500 transition-colors duration-300 font-medium"
                        >
                            {link.title}
                        </Link>
                    )}
                    {link.dropdown && isServicesMenuOpen && (
                        <div ref={servicesMenuRef} className="absolute top-10 right-0 mt-2 w-[48rem] bg-white rounded-lg shadow-2xl z-20 overflow-hidden">
                           <div className="flex">
                                <div className="w-2/5 bg-gray-50 p-6">
                                    {servicesLinks.map((service, i) => (
                                        <Link key={i} to={service.href} 
                                           className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${activeService === i ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
                                           onMouseEnter={() => setActiveService(i)}
                                        >
                                            <span className={`transition-colors duration-300 ${activeService === i ? 'text-amber-500' : 'text-gray-500'}`}>{service.icon}</span>
                                            <span className="font-medium text-gray-800">{service.title}</span>
                                        </Link>
                                    ))}
                                </div>
                                <div key={activeService} className="w-3/5 p-8 flex flex-col justify-center bg-cover bg-center relative text-white animate-fade-in" style={{backgroundImage: `url(${servicesLinks[activeService].image})`}}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="relative z-10">
                                        <h3 className="font-bold text-2xl mb-2">{servicesLinks[activeService].title}</h3>
                                        <p className="text-gray-300 text-sm mb-6">{servicesLinks[activeService].description}</p>
                                        
                                        <div className="bg-white/10 p-4 rounded-lg mb-6 text-center backdrop-blur-sm">
                                            <p className="font-bold text-5xl text-amber-400 animate-pulse">{servicesLinks[activeService].stats.value}%</p>
                                            <p className="text-sm text-gray-200 uppercase tracking-wider">{servicesLinks[activeService].stats.label}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-white mb-3">Key Highlights:</h4>
                                            <ul className="space-y-3">
                                                {servicesLinks[activeService].highlights.map((highlight, i) => (
                                                    <li key={i} className="flex items-center text-gray-200 text-sm">
                                                        {highlight.icon}
                                                        <span className="ml-3">{highlight.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="bg-gray-50 p-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                     <p className="text-gray-600 text-sm font-medium">Need a custom solution?</p>
                                    <button onClick={() => navigate('/contact')} className="bg-amber-500 text-white font-bold py-2 px-5 rounded-full shadow-md hover:bg-amber-600 transition-all duration-300 text-sm">
                                        Get Free Consultation
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={() => navigate('/contact')} className="bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-amber-600 transition-all duration-300">
              Get Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
           <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="z-50 group w-12 h-12 flex items-center justify-center bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md rounded-full border-2 border-white/50 shadow-lg hover:scale-105 transition-all duration-300"
              aria-label="Toggle Menu"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-5 h-0.5 bg-gray-800 rounded-full transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-gray-800 rounded-full transition-opacity duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-gray-800 rounded-full transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-40 w-[calc(100%-4rem)] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-10">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/black-icon-sam.webp" alt="SAM CREATIVE Logo" className="w-12 h-12 sm:w-14 sm:h-14" />
            <span style={{ fontFamily: 'BigerOver', fontSize: '1.5rem', fontWeight: 'bold' }}>
              SAM CREATIVE
            </span>
          </div>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link, index) => (
              <div key={index}>
                {link.dropdown ? (
                  <a
                    href={link.href}
                    className="flex items-center justify-between text-gray-700 hover:text-amber-500 font-medium py-3 text-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileServicesMenuOpen(!isMobileServicesMenuOpen);
                    }}
                  >
                    <span>{link.title}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isMobileServicesMenuOpen ? 'transform rotate-180' : ''}`} />
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="flex items-center justify-between text-gray-700 hover:text-amber-500 font-medium py-3 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{link.title}</span>
                  </Link>
                )}
                {link.dropdown && isMobileServicesMenuOpen && (
                  <div className="pl-4 pt-2 pb-2 space-y-2">
                    {servicesLinks.map((service, i) => (
                      <Link 
                        key={i} 
                        to={service.href} 
                        className="flex items-center space-x-3 text-gray-600 hover:text-amber-500 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-amber-500">{service.icon}</span>
                        <span>{service.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t pt-6 mt-6">
                <button onClick={() => { navigate('/contact'); setIsMenuOpen(false); }} className="bg-amber-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-amber-600 w-full text-lg">
                  Get Free Consultation
                </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
