import React, { useState, useEffect } from 'react';
import { Check, Zap, MessageCircle, ExternalLink, Code, ShoppingCart, Layers, Palette, Video, Bot, ChevronDown, ChevronUp, Play, Users, Award } from 'lucide-react';

interface PricingPageProps {
  setCurrentPage?: (page: string) => void;
}

// Centralized pricing data for easy maintenance and updates
const pricingData = {
  'web-development': {
    basic: { price: 560, originalPrice: 799 },
    premium: { price: 999, originalPrice: 1299 }
  },
  'ecommerce': {
    basic: { price: 560, originalPrice: 799 },
    premium: { price: 999, originalPrice: 1299 }
  },
  'saas': {
    basic: { price: 560, originalPrice: 799 },
    premium: { price: 999, originalPrice: 1299 }
  },
  'ai-solutions': {
    basic: { price: 560, originalPrice: 799 },
    premium: { price: 999, originalPrice: 1299 }
  },
  'design': {
    basic: { price: 560, originalPrice: 799 },
    premium: { price: 999, originalPrice: 1299 }
  },
  'animation': {
    basic: { price: 560, originalPrice: 799 },
    premium: { price: 999, originalPrice: 1299 }
  }
};

const services = [
  {
    id: 'web-development',
    title: 'Web Dev',
    fullTitle: 'AI Web Development',
    icon: <Code className="w-6 h-6 sm:w-8 sm:h-8" />,
    description: 'Custom websites and web applications',
    packages: {
      basic: {
        name: 'Starter Website',
        duration: '2-3 weeks',
        features: [
          'Up to 5 pages',
          'Responsive design',
          'Basic SEO optimization',
          'Contact form',
          'Social media integration',
          '90 days support'
        ],
        extras: ['SSL Certificate', 'Google Analytics Setup']
      },
      premium: {
        name: 'Professional Website',
        duration: '3-5 weeks',
        features: [
          'Up to 15 pages',
          'Custom design & animations',
          'Advanced SEO',
          'Content management system',
          'E-commerce functionality',
          '90 days support'
        ],
        extras: ['Advanced Analytics', 'Email Marketing Setup']
      }
    }
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    fullTitle: 'E-commerce Solutions',
    icon: <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />,
    description: 'Online stores with payment integration',
    packages: {
      basic: {
        name: 'Starter Store',
        duration: '3-4 weeks',
        features: [
          'Up to 50 products',
          'Payment integration',
          'Inventory management',
          'Order tracking',
          'Customer accounts',
          '60 days support'
        ],
        extras: ['Payment Gateway Setup', 'Product Upload']
      },
      premium: {
        name: 'Enterprise Store',
        duration: '5-8 weeks',
        features: [
          'Unlimited products',
          'Multiple payment gateways',
          'Advanced inventory',
          'Multi-vendor support',
          'Advanced analytics',
          '120 days support'
        ],
        extras: ['Advanced Marketing Tools', 'Multi-vendor Setup']
      }
    }
  },
  {
    id: 'saas',
    title: 'SaaS Apps',
    fullTitle: 'SaaS Applications',
    icon: <Layers className="w-6 h-6 sm:w-8 sm:h-8" />,
    description: 'Scalable software solutions',
    packages: {
      basic: {
        name: 'MVP Application',
        duration: '6-8 weeks',
        features: [
          'Core functionality',
          'User authentication',
          'Basic dashboard',
          'Database setup',
          'API development',
          '90 days support'
        ],
        extras: ['API Documentation', 'User Training']
      },
      premium: {
        name: 'Enterprise SaaS',
        duration: '10-16 weeks',
        features: [
          'Full feature set',
          'Advanced user management',
          'Analytics dashboard',
          'Third-party integrations',
          'Advanced security',
          '180 days support'
        ],
        extras: ['Advanced Security', 'Custom Integrations']
      }
    }
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    fullTitle: 'AI Solutions',
    icon: <Bot className="w-6 h-6 sm:w-8 sm:h-8" />,
    description: 'Custom AI integrations',
    packages: {
      basic: {
        name: 'AI Chatbot',
        duration: '3-5 weeks',
        features: [
          'Custom chatbot',
          'Website integration',
          'Basic NLP',
          'FAQ automation',
          'Lead capture',
          '60 days support'
        ],
        extras: ['Custom Training Data', 'Analytics Setup']
      },
      premium: {
        name: 'AI Automation Suite',
        duration: '8-12 weeks',
        features: [
          'Advanced AI workflows',
          'Multi-platform',
          'Custom AI models',
          'Process automation',
          'Predictive analytics',
          '120 days support'
        ],
        extras: ['Advanced AI Models', 'Process Automation']
      }
    }
  },
  {
    id: 'design',
    title: 'Design',
    fullTitle: 'Graphic Design',
    icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" />,
    description: 'Visual identity & brand',
    packages: {
      basic: {
        name: 'Brand Essentials',
        duration: '1-2 weeks',
        features: [
          'Logo design',
          'Business card',
          'Social templates',
          'Brand palette',
          'High-res files',
          '30 days support'
        ],
        extras: ['Brand Guidelines', 'Social Media Kit']
      },
      premium: {
        name: 'Complete Brand',
        duration: '2-4 weeks',
        features: [
          'Logo + concepts',
          'Complete stationery',
          'Brand guidelines',
          'Marketing materials',
          'Website graphics',
          '60 days support'
        ],
        extras: ['Brand Strategy', 'Marketing Materials']
      }
    }
  },
  {
    id: 'animation',
    title: 'Animation',
    fullTitle: '2D/3D Animation',
    icon: <Video className="w-6 h-6 sm:w-8 sm:h-8" />,
    description: 'Engaging animations',
    packages: {
      basic: {
        name: 'Basic Animation',
        duration: '2-3 weeks',
        features: [
          '30-second animation',
          '2D motion graphics',
          'Basic character',
          'Background music',
          'HD quality',
          '30 days support'
        ],
        extras: ['Storyboard', 'Custom Music']
      },
      premium: {
        name: 'Pro Animation',
        duration: '4-6 weeks',
        features: [
          '60-second animation',
          '3D motion graphics',
          'Advanced rigging',
          'Custom soundtrack',
          '4K quality',
          '60 days support'
        ],
        extras: ['3D Modeling', 'Advanced Effects']
      }
    }
  }
];

const PricingPage: React.FC<PricingPageProps> = ({ setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState('web-development');
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Dynamic SEO Title and Meta Description for Service Pricing
  useEffect(() => {
    const currentSvc = services.find(s => s.id === activeCategory);
    const title = currentSvc 
      ? `${currentSvc.fullTitle} Pricing | Affordable Digital Solutions | OmniReach`
      : "Affordable Pricing Plans | Web Dev, AI & Design | OmniReach";
    
    const description = currentSvc 
      ? `Get expert ${currentSvc.fullTitle} services. ${currentSvc.description}. Save up to 70% with OmniReach affordable pricing plans for startups and enterprises.`
      : "Explore affordable pricing for Web Development, AI Solutions, E-commerce, and Design. Quality digital services at budget-friendly prices in Pakistan.";

    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [activeCategory]);

  // JSON-LD Structured Data for Services and Pricing Offers
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Digital Development and Design Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "OmniReach",
        "telephone": "+923132480332",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Karachi",
          "addressCountry": "PK"
        }
      },
      "offers": Object.entries(pricingData).map(([key, value]) => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": key.replace('-', ' ') },
        "price": value.basic.price,
        "priceCurrency": "USD"
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // Helper function to get price with discount
  const getPackagePrice = (serviceId: string, packageType: 'basic' | 'premium') => {
    const data = pricingData[serviceId as keyof typeof pricingData];
    if (!data) return { price: 0, originalPrice: 0, discount: 0 };
    const { price, originalPrice } = data[packageType];
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    return { price, originalPrice, discount };
  };

  // Format price as USD
  const formatPrice = (price: number) => `$${price.toLocaleString()}`;

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContactUs = () => {
    window.open('https://wa.me/03132480332', '_blank');
  };

  const handleViewBlog = () => {
    if (setCurrentPage) {
      setCurrentPage('blog');
    }
  };

  const currentService = services.find(s => s.id === activeCategory);

  const blogPosts = [
    {
      id: 1,
      title: "Future of AI in Web Development",
      excerpt: "Discover how AI is revolutionizing web development.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "AI",
      slug: "future-ai-web-development-2025"
    },
    {
      id: 2,
      title: "E-commerce SEO Guide",
      excerpt: "Boost your online store rankings with our proven strategies.",
      image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "SEO",
      slug: "ecommerce-seo-guide"
    },
    {
      id: 3,
      title: "Scalable SaaS Applications",
      excerpt: "Essential guidelines for developing robust SaaS apps.",
      image: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Dev",
      slug: "scalable-saas-applications"
    }
  ];

  const agileSteps = [
    {
      step: "1",
      title: "Discovery",
      description: "Understand needs & create roadmap",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      step: "2", 
      title: "Development",
      description: "Build in sprints with feedback",
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      step: "3",
      title: "Testing", 
      description: "Continuous testing & improvements",
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      step: "4",
      title: "Delivery",
      description: "Launch with ongoing support",
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-28 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 sm:mb-7">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-3">
                Affordable <span className="text-yellow-400">Pricing</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
                Quality solutions at budget-friendly prices. Save up to 70% on development costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agile Structure */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Agile Approach</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Transparency, flexibility, and continuous improvement.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {agileSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="text-black">{step.icon}</div>
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{step.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-tight sm:leading-normal">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-3 sm:px-4 py-10 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Service Selector */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
              Choose Your Service
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveCategory(service.id)}
                  className={`p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl font-medium transition-all duration-300 
                    flex flex-col items-center justify-center group
                    ${activeCategory === service.id
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-xl transform scale-105'
                      : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-105 border border-gray-100'
                    }`}
                  title={service.fullTitle}
                >
                  <div className="mb-3 sm:mb-4 flex items-center justify-center">
                    <div className={`transition-colors duration-300 ${
                      activeCategory === service.id 
                        ? 'text-black' 
                        : 'text-yellow-600 group-hover:text-yellow-700'
                    }`}>
                      {service.icon}
                    </div>
                  </div>
                  <div className="text-center font-semibold text-xs sm:text-sm leading-tight">
                    {isMobile ? service.title : service.fullTitle.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          {currentService && (() => {
            const basicPrice = getPackagePrice(currentService.id, 'basic');
            const premiumPrice = getPackagePrice(currentService.id, 'premium');
            
            return (
              <div className="mb-12 sm:mb-16 md:mb-20">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{currentService.fullTitle}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600">{currentService.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                  {/* Basic Package */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 md:p-8 relative hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-6 sm:mb-8">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">{currentService.packages.basic.name}</h4>
                      <div className="mb-3 sm:mb-4">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{formatPrice(basicPrice.price)}</span>
                        <span className="text-sm sm:text-base md:text-lg text-gray-500 line-through ml-2">{formatPrice(basicPrice.originalPrice)}</span>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium inline-block mb-2">
                        🔥 Save {basicPrice.discount}%
                      </div>
                      <div className="text-gray-600 text-xs sm:text-sm">{currentService.packages.basic.duration}</div>
                    </div>
                    
                    <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8">
                      {currentService.packages.basic.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setExpandedPlan(expandedPlan === 'basic' ? null : 'basic')}
                      className="w-full mb-3 sm:mb-4 flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
                    >
                      <span>View Details</span>
                      {expandedPlan === 'basic' ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>

                    {expandedPlan === 'basic' && (
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Additional Services:</h5>
                        <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                          {currentService.packages.basic.extras.map((extra, index) => (
                            <li key={index}>• {extra}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button
                      onClick={handleContactUs}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                      aria-label={`Get started with our ${currentService.packages.basic.name} plan`}
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Started</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* Premium Package */}
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 relative md:transform md:scale-105 hover:shadow-2xl transition-all duration-300 order-first md:order-none">
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 sm:px-5 sm:py-1 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                        BEST VALUE
                      </div>
                    </div>
                    
                    <div className="text-center mb-6 sm:mb-8">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{currentService.packages.premium.name}</h4>
                      <div className="mb-3 sm:mb-4">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{formatPrice(premiumPrice.price)}</span>
                        <span className="text-sm sm:text-base md:text-lg text-gray-400 line-through ml-2">{formatPrice(premiumPrice.originalPrice)}</span>
                      </div>
                      <div className="bg-yellow-400 text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium inline-block mb-2">
                        🎯 Save {premiumPrice.discount}%
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm">{currentService.packages.premium.duration}</div>
                    </div>
                    
                    <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8">
                      {currentService.packages.premium.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white text-sm sm:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setExpandedPlan(expandedPlan === 'premium' ? null : 'premium')}
                      className="w-full mb-3 sm:mb-4 flex items-center justify-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      <span>View Details</span>
                      {expandedPlan === 'premium' ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>

                    {expandedPlan === 'premium' && (
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800 rounded-lg">
                        <h5 className="font-semibold text-white mb-2 text-sm sm:text-base">Additional Services:</h5>
                        <ul className="space-y-1 text-xs sm:text-sm text-gray-300">
                          {currentService.packages.premium.extras.map((extra, index) => (
                            <li key={index}>• {extra}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button
                      onClick={handleContactUs}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                      aria-label={`Get started with our ${currentService.packages.premium.name} plan`}
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Started</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* Custom Package */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 md:p-8 relative hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-6 sm:mb-8">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Custom Solution</h4>
                      <div className="mb-3 sm:mb-4">
                        <span className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900">Let's Discuss</span>
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium inline-block mb-2">
                        Tailored for You
                      </div>
                      <div className="text-gray-600 text-xs sm:text-sm">Timeline varies</div>
                    </div>
                    
                    <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8">
                      <li className="flex items-start space-x-2 sm:space-x-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">Fully customized solution</span>
                      </li>
                      <li className="flex items-start space-x-2 sm:space-x-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">Unlimited features</span>
                      </li>
                      <li className="flex items-start space-x-2 sm:space-x-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">Priority support</span>
                      </li>
                      <li className="flex items-start space-x-2 sm:space-x-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">Dedicated manager</span>
                      </li>
                      <li className="flex items-start space-x-2 sm:space-x-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">Extended warranty</span>
                      </li>
                      <li className="flex items-start space-x-2 sm:space-x-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">Ongoing maintenance</span>
                      </li>
                    </ul>

                    <button
                      onClick={() => setExpandedPlan(expandedPlan === 'custom' ? null : 'custom')}
                      className="w-full mb-3 sm:mb-4 flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
                    >
                      <span>View Details</span>
                      {expandedPlan === 'custom' ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>

                    {expandedPlan === 'custom' && (
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What's Included:</h5>
                        <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                          <li>• Detailed requirements analysis</li>
                          <li>• Custom architecture design</li>
                          <li>• Unlimited revisions</li>
                          <li>• White-glove service</li>
                        </ul>
                      </div>
                    )}
                    
                    <button
                      onClick={handleContactUs}
                      className="w-full bg-black text-yellow-400 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 border-2 border-yellow-400"
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Contact Us</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* From Our Blog Section */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">From Our Blog</h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Latest insights, trends, and tips from our experts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.id}
                  className="group bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer"
                  onClick={() => setCurrentPage && setCurrentPage(post.slug)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-yellow-600 font-medium text-xs sm:text-sm group-hover:text-yellow-700 transition-colors">
                      Read More
                      <Play className="ml-1 w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <button
                onClick={handleViewBlog}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
              >
                View All Blogs
              </button>
            </div>
          </section>

          {/* FAQ Section */}
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 mb-10 sm:mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What's included in the price?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">All packages include design, development, testing, deployment, and support period.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How long does delivery take?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Basic: 1-3 weeks, Premium: 3-8 weeks, Custom: Timeline discussed.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Do you offer revisions?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Basic: 2-3 revisions, Premium: unlimited within scope.</p>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What payment methods?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Bank transfers, PayPal, Stripe, crypto. Flexible plans.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Is ongoing support included?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Free support for specified period. Extended plans available.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Can I upgrade later?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Yes! Upgrade anytime. We'll credit previous payment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-white">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Ready to Get Started?</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                Contact us on WhatsApp to discuss your project and get a personalized quote.
              </p>
              <button
                onClick={handleContactUs}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;