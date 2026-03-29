import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Search, ShoppingBag, Tv, MessageSquare, TrendingUp, Play, Pause, Globe, Star, Award, Check, Users, BarChart3, Shield, Clock, Rocket, Sparkles, Camera, MessageCircle, Target, Mail, Phone, MapPin, Menu, X } from 'lucide-react';

// Refer to icons by absolute paths under `/src/assets/icons` so Vite serves them as assets

interface MarketingAgencyHeroProps {
  setCurrentPage?: (page: string) => void;
}

type PageContent = 'hero' | 'services' | 'process' | 'about' | 'contact';

// Small helper component to render a brand icon with fallback to a colored initial
const BrandIcon: React.FC<{ name: string; color: string; icon: string; className?: string }> = ({ name, color, icon, className }) => {
  const [imgFailed, setImgFailed] = React.useState(false);
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  if (imgFailed) {
    return (
      <div
        className={`${className ?? ''} w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-white font-semibold`}
        style={{ backgroundColor: color, borderRadius: 8 }}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={icon}
      alt={`${name} icon`}
      className={`${className ?? ''} w-6 h-6 sm:w-8 sm:h-8 object-contain`}
      onError={() => setImgFailed(true)}
    />
  );
};

const MarketingAgencyPage: React.FC<MarketingAgencyHeroProps> = ({ setCurrentPage }) => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [phoneRotation, setPhoneRotation] = useState(0);
  const [showContactChat, setShowContactChat] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPage, setCurrentPageState] = useState<PageContent>('hero');
  const [animationClass, setAnimationClass] = useState('animate-fade-in');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Brand logos data for the phone screen (use absolute paths so assets are served)
  const brandLogos = [
    { name: 'Google', color: '#4285F4', icon: '/src/assets/icons/google.png' },
    { name: 'ChatGPT', color: '#10A37F', icon: '/src/assets/icons/chatgpt.png' },
    { name: 'Instagram', color: '#E4405F', icon: '/src/assets/icons/insta.png' },
    { name: 'TikTok', color: '#000000', icon: '/src/assets/icons/tiktok.png' },
    { name: 'YouTube', color: '#FF0000', icon: '/src/assets/icons/youtube.png' },
    { name: 'Amazon', color: '#FF9900', icon: '/src/assets/icons/amazon.png' },
    { name: 'Spotify', color: '#1DB954', icon: '/src/assets/icons/spotify.png' },
    { name: 'LinkedIn', color: '#0A66C2', icon: '/src/assets/icons/linkedin.png' },
    { name: 'Facebook', color: '#1877F2', icon: '/src/assets/icons/facebook.png' },
    { name: 'Twitter', color: '#1DA1F2', icon: '/src/assets/icons/twitter.png' },
    { name: 'Shopify', color: '#96BF48', icon: '/src/assets/icons/shopify.png' },
    { name: 'Pinterest', color: '#E60023', icon: '/src/assets/icons/pinterest.png' },
    { name: 'Snapchat', color: '#FFFC00', icon: '/src/assets/icons/snapchat.png' },
    { name: 'Twitch', color: '#9146FF', icon: '/src/assets/icons/twitch.png' },
    { name: 'Reddit', color: '#FF4500', icon: '/src/assets/icons/reddit.png' },
    { name: 'Discord', color: '#5865F2', icon: '/src/assets/icons/discord.png' },
  ];

  // Services for the dropdown
  const allServices = [
    { id: 'ai-seo', name: 'AI SEO', icon: Sparkles, description: 'AI-powered search optimization' },
    { id: 'paid-media', name: 'Paid Media', icon: BarChart3, description: 'Targeted advertising campaigns' },
    { id: 'social-media', name: 'Social Media', icon: Users, description: 'Platform management & engagement' },
    { id: 'creative', name: 'Creative', icon: Camera, description: 'Design & video production' },
  ];

  // Process Steps
  const processSteps = [
    { 
      step: 1, 
      title: 'Discovery', 
      description: 'We analyze your business and audience',
      icon: Search,
    },
    { 
      step: 2, 
      title: 'Strategy', 
      description: 'Custom marketing strategy tailored to your goals',
      icon: Target,
    },
    { 
      step: 3, 
      title: 'Execution', 
      description: 'Implementation of campaigns across all channels',
      icon: Rocket,
    },
    { 
      step: 4, 
      title: 'Optimization', 
      description: 'Continuous improvement based on data',
      icon: TrendingUp,
    },
  ];

  // Stats data
  const stats = [
    { value: '98%', label: 'Client Retention', icon: Shield },
    { value: '300%', label: 'Avg. ROI Increase', icon: TrendingUp },
    { value: '48H', label: 'Campaign Launch', icon: Clock },
    { value: '500+', label: 'Brands Served', icon: Users },
  ];

  // Chat messages for contact chat
  const chatMessages = [
    { id: 1, sender: 'agent', text: 'Hi there! 👋 Which service are you interested in?' },
  ];

  // Handle WhatsApp integration
  const handleGetQuoteClick = () => {
    const serviceMessage = selectedService 
      ? `Hi, I'm interested in getting a quote for ${selectedService} service from OmniReach.`
      : "Hi, I'm interested in getting a quote for your Paid Media services from OmniReach.";
    
    const encodedMessage = encodeURIComponent(serviceMessage);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    setShowContactChat(true);
  };

  // Handle WhatsApp phone icon click
  const handleWhatsAppClick = () => {
    const message = "Hi, I'm interested in your marketing services from OmniReach. Can we talk?";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  // Handle contact chat click
  const handleContactChatClick = () => {
    setShowContactChat(true);
  };

  // Navigate to page with animation
  const navigateToPage = (page: PageContent) => {
    setAnimationClass('animate-fade-out');
    
    setTimeout(() => {
      setCurrentPageState(page);
      setAnimationClass('animate-fade-in');
      setIsMobileMenuOpen(false);
    }, 300);
  };

  // Auto-play brand logos with continuous loop
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setPhoneRotation(prev => {
          const maxRotation = 4;
          return (prev + 1) % maxRotation;
        });
      }, 2000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const handlePhoneHover = (hovering: boolean) => {
    setIsAutoPlaying(!hovering);
  };

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  const handleServiceSubmit = () => {
    if (selectedService) {
      setIsSubmitted(true);
      
      const serviceMessage = `Hi, I'm interested in getting a quote for ${selectedService} service from OmniReach.`;
      const encodedMessage = encodeURIComponent(serviceMessage);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
      
      setTimeout(() => {
        setIsSubmitted(false);
        setShowContactChat(false);
        setSelectedService('');
      }, 3000);
    }
  };

  const closeContactChat = () => {
    setShowContactChat(false);
    setSelectedService('');
  };

  // Render content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'services':
        return (
          <div className={animationClass}>
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-sm sm:text-base font-medium">Our Services</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  Marketing Services
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                We offer comprehensive marketing solutions to grow your business.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6">
                {allServices.map((service, index) => (
                  <div 
                    key={service.id} 
                    className={`bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 transform transition-all duration-300 hover:scale-105 animate-slide-up`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4">
                      <service.icon className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-300">{service.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                
              </div>
            </div>
          </div>
        );

      case 'process':
        return (
          <div className={animationClass}>
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-sm sm:text-base font-medium">Our Process</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  How We Work
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                A simple 4-step process to deliver results.
              </p>
              
              <div className="space-y-6 pt-6">
                {processSteps.map((step, index) => (
                  <div 
                    key={step.step} 
                    className={`flex items-start gap-6 animate-slide-up`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                      <step.icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{step.title}</h3>
                      <p className="text-sm text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className={animationClass}>
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-sm sm:text-base font-medium">About Us</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  About OmniReach
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                We're a team of passionate marketers helping businesses grow in the digital age.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="text-blue-400 w-5 h-5" />
                      <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className={animationClass}>
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-sm sm:text-base font-medium">Contact</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  Get In Touch
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                Contact us for a free consultation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <Mail className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-base font-medium text-white">Email</p>
                  <p className="text-sm text-gray-300 break-all">
      <a href="mailto:samcreativeofficials@gmail.com" className="text-blue-400">samcreativeofficials@gmail.com</a>
    </p>                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <Phone className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-base font-medium text-white">Phone</p>
                  <p className="text-sm text-gray-300 break-all">
      <a href="tel:+923138372573" className="text-blue-400">+92 313 8372573</a>
    </p>                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <MapPin className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-base font-medium text-white">Location</p>
                  <p className="text-sm text-gray-300 break-all">Karachi, PK</p>
                </div>
              </div>
              
              <div className="pt-6">
                <button 
                  onClick={handleGetQuoteClick}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with Us</span>
                </button>
              </div>
            </div>
          </div>
        );

      default: // hero
        return (
          <div className={animationClass}>
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm sm:text-base font-medium">#1 Marketing Agency</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  Customers Find You
                </span>
                <br />
                <span className="text-white text-2xl sm:text-3xl md:text-4xl">
                  from{' '}
                  <span className="text-blue-400">Google</span> to{' '}
                  <span className="text-green-400">ChatGPT</span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                We help you show up everywhere customers are searching, swiping, and shopping.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="text-blue-400 w-5 h-5" />
                      <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleGetQuoteClick}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto text-base"
                >
                  <span>Get Paid Media Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden sticky top-0">
      {/* Original gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                           linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}></div>

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Vibrating WhatsApp Phone Icon */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl animate-vibrate hover:scale-110 transition-transform"
      >
        <MessageCircle className="text-white w-6 h-6" />
      </button>

      {/* Header with Hamburger Menu */}
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-2 sm:px-4">
        <div className="max-w-3xl mx-auto">
<nav className="bg-white/5 backdrop-blur-md rounded-full border border-white/20 px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between shadow-2xl max-w-[280px] sm:max-w-none mx-auto">            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Rocket className="text-white w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                OmniReach
              </span>
            </div>

            {/* Hamburger Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'process', label: 'Process' },
                { id: 'about', label: 'About' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id as PageContent)}
                  className={`text-xs sm:text-sm font-medium transition-colors px-3 py-1.5 rounded-full ${
                    currentPage === item.id 
                      ? 'bg-white/20 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <button 
              onClick={handleGetQuoteClick}
              className="hidden md:block bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all shadow-lg text-xs sm:text-sm"
            >
              Get Quote
            </button>
          </nav>
          

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-3 shadow-2xl">
              <div className="space-y-1">
                {[
                  { id: 'hero', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'process', label: 'Process' },
                  { id: 'about', label: 'About' },
                  { id: 'contact', label: 'Contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateToPage(item.id as PageContent)}
                    className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                      currentPage === item.id 
                        ? 'bg-white/20 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button 
                  onClick={handleGetQuoteClick}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-3 py-2.5 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all text-sm"
                >
                  Get Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Dynamic Content - STICKY TO COMPLETE PAGE */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center">
            {/* Content Section */}
            <div className="space-y-6 sm:space-y-8 z-10 w-full lg:w-1/2">
              {renderContent()}
            </div>

            {/* Phone Interface */}
            <div className="relative z-10 w-full lg:w-1/2 mt-8 sm:mt-10 lg:mt-0">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/10">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-4 sm:h-5 bg-slate-900 rounded-b-xl"></div>
                  
                  {/* Phone Screen */}
            <div 
  ref={phoneRef}
  className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-white/10 h-[500px] sm:h-[580px] relative"
  onMouseEnter={() => handlePhoneHover(true)}
  onMouseLeave={() => handlePhoneHover(false)}
>
                    <div className="absolute inset-0 p-4 sm:p-6">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <span className="text-sm font-medium text-gray-400">9:41 AM</span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-400">Live</span>
                        </div>
                      </div>

                      {/* App Header */}
                      <div className="text-center mb-4 sm:mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-2">
                          <Globe className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-white mb-1">OmniReach</h2>
                        <p className="text-sm text-gray-400">Brand Dashboard</p>
                      </div>

                      {/* Contact Chat Modal */}
                      {showContactChat && (
                      <div className="absolute inset-0 bg-slate-800/98 backdrop-blur-md rounded-xl z-30 flex flex-col">
                          <div className="p-3 sm:p-4 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                                <MessageCircle className="text-white w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm sm:text-base">Support</h3>
                                <p className="text-xs text-gray-400">Online</p>
                              </div>
                            </div>
                            <button 
                              onClick={closeContactChat}
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                            >
                              <span className="text-sm">×</span>
                            </button>
                          </div>

                          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
                            {chatMessages.map((msg) => (
                              <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[85%] rounded-xl p-3 text-sm ${msg.sender === 'agent' ? 'bg-white/10 rounded-bl-none' : 'bg-gradient-to-r from-blue-500 to-cyan-400 rounded-br-none'}`}>
                                  <p>{msg.text}</p>
                                </div>
                              </div>
                            ))}

                            {!isSubmitted ? (
                              <>
                                <div className="mt-3">
                                  <p className="text-sm text-gray-400 mb-2">Select a service:</p>
                                  <div className="grid grid-cols-2 gap-2">
                                    {allServices.slice(0, 4).map((service) => (
                                      <button
                                        key={service.id}
                                        onClick={() => handleServiceSelect(service.name)}
                                        className={`p-3 rounded-lg text-sm flex flex-col items-center justify-center transition-all ${
                                          selectedService === service.name 
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-400' 
                                            : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                      >
                                        <service.icon size={16} className="mb-1" />
                                        <span>{service.name}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <button
                                    onClick={handleServiceSubmit}
                                    disabled={!selectedService}
                                    className={`w-full py-3 rounded-lg font-semibold transition-all text-sm ${
                                      selectedService
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-xl'
                                        : 'bg-white/10 cursor-not-allowed'
                                    }`}
                                  >
                                    {selectedService ? `Get ${selectedService} Quote` : 'Select a Service'}
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="text-center py-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center mx-auto mb-3">
                                  <Check className="text-white w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold mb-2">Thank You!</h3>
                                <p className="text-sm text-gray-300">WhatsApp opened</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Brand Logos Grid */}
                      {!showContactChat && (
            <div className="h-64 sm:h-72 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 mb-4">
                          <div 
                            className="grid grid-cols-4 gap-3 p-3 transition-transform duration-1000 ease-in-out"
                            style={{ transform: `translateY(-${phoneRotation * 25}%)` }}
                          >
                            {brandLogos.map((brand, index) => (
                              <div
                                key={index}
                                className="flex flex-col items-center justify-center"
                              >
                                <div
                                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-1 transition-all duration-300 hover:scale-110"
                                  style={{
                                    background: `linear-gradient(135deg, ${brand.color}20, ${brand.color}40)`,
                                    border: `2px solid ${brand.color}40`
                                  }}
                                >
                                  <BrandIcon name={brand.name} color={brand.color} icon={brand.icon} />
                                </div>
                                <span className="text-xs font-medium text-gray-400">
                                  {brand.name}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Auto-play Controls */}
                          <div className="absolute bottom-3 right-3">

                            {/* <button
                              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              {isAutoPlaying ? (
                                <Pause className="text-white w-3.5 h-3.5" />
                              ) : (
                                <Play className="text-white w-3.5 h-3.5" />
                              )}
                            </button> */}
                          </div>
                        </div>
                      )}

                      {/* Bottom Navigation */}
                      <div className="absolute bottom-3 left-0 right-0 px-4 sm:px-6">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 sm:p-1.5 flex justify-around">
                          {[
                            { icon: Search, label: 'Search' },
                            { icon: Users, label: 'Social' },
                            { icon: ShoppingBag, label: 'Shop' },
                            { icon: Tv, label: 'Stream' },
                            { icon: MessageSquare, label: 'Chat', highlight: true },
                          ].map((item, index) => (
                            <button
                              key={index}
                              onClick={item.highlight ? handleContactChatClick : undefined}
                              className={`p-2 sm:p-3 rounded-lg flex flex-col items-center transition-all duration-300 ${
                                item.highlight 
                                  ? 'relative bg-gradient-to-r from-blue-500/20 to-cyan-400/20' 
                                  : 'hover:bg-white/10'
                              }`}
                            >
                              {item.highlight && (
                                <>
                                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
                                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                </>
                              )}
                              <item.icon className={`${item.highlight ? 'text-blue-400' : 'text-gray-400'} w-4 h-4 sm:w-5 sm:h-5`} />
                              <span className={`text-xs mt-1 ${item.highlight ? 'text-blue-300' : 'text-gray-500'}`}>
                                {item.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm text-gray-300">#1 Rated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm text-gray-300">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm text-gray-300">Proven</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes vibrate {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          10% { transform: translateX(-0.5px) translateY(-0.5px) rotate(-0.5deg); }
          20% { transform: translateX(0.5px) translateY(-0.5px) rotate(0.5deg); }
          30% { transform: translateX(-0.5px) translateY(0.5px) rotate(0deg); }
          40% { transform: translateX(0.5px) translateY(0.5px) rotate(0.5deg); }
          50% { transform: translateX(-0.5px) translateY(-0.5px) rotate(-0.5deg); }
          60% { transform: translateX(0.5px) translateY(-0.5px) rotate(0deg); }
          70% { transform: translateX(-0.5px) translateY(0.5px) rotate(0.5deg); }
          80% { transform: translateX(0.5px) translateY(0.5px) rotate(-0.5deg); }
          90% { transform: translateX(-0.5px) translateY(-0.5px) rotate(0deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-out {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animate-vibrate {
          animation: vibrate 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-fade-out {
          animation: fade-out 0.3s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default MarketingAgencyPage;