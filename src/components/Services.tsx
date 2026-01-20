import React, { useEffect, useRef } from 'react';

// Icons (keep your imports)
import WebDevelopmentIcon from '../assets/icons/app-development.png';
import EcommerceIcon from '../assets/icons/E-commerce Solutions.png';
import SaaSIcon from '../assets/icons/SaaS-Applications.png';
import SEOIcon from '../assets/icons/search-engine-optimization.png';
import ContentWritingIcon from '../assets/icons/content-writing.png';
import DigitalMarketingIcon from '../assets/icons/Digital-Marketing.png';
import GraphicDesigningIcon from '../assets/icons/Graphic-Designing.png';
import AnimationIcon from '../assets/icons/2D3D-Animation.png';
import ModelingIcon from '../assets/icons/3D-Modeling.png';

const Services: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <img src={WebDevelopmentIcon} alt="Web Development" className="w-12 h-12" />,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies",
      features: ["React & Next.js", "Node.js Backend", "Database Integration", "API Development"],
      targetPath: "/services/web-development"
    },
    {
      icon: <img src={EcommerceIcon} alt="E-commerce Solutions" className="w-12 h-12" />,
      title: "E-commerce Solutions",
      description: "Complete online stores with payment integration and inventory management",
      features: ["Shopify & WooCommerce", "Payment Gateways", "Inventory Systems", "Mobile Apps"],
      targetPath: "/services/web-development"
    },
    {
      icon: <img src={SaaSIcon} alt="SaaS Applications" className="w-12 h-12" />,
      title: "SaaS Applications",
      description: "Scalable software solutions for business automation and productivity",
      features: ["Cloud Architecture", "User Management", "Analytics Dashboard", "API Integration"],
      targetPath: "/services/web-development"
    },
    {
      icon: <img src={SEOIcon} alt="SEO Optimization" className="w-12 h-12" />,
      title: "SEO Optimization",
      description: "Boost your search rankings and drive organic traffic to your website",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics Tracking"],
      targetPath: "/services/seo-content"
    },
    {
      icon: <img src={ContentWritingIcon} alt="Content Writing" className="w-12 h-12" />,
      title: "Content Writing",
      description: "Engaging, SEO-optimized content that converts visitors into customers",
      features: ["Blog Writing", "Website Copy", "Product Descriptions", "Marketing Content"],
      targetPath: "/services/seo-content"
    },
    {
      icon: <img src={DigitalMarketingIcon} alt="Digital Marketing" className="w-12 h-12" />,
      title: "Digital Marketing",
      description: "Comprehensive marketing strategies to grow your online presence",
      features: ["Social Media Marketing", "PPC Campaigns", "Email Marketing", "Brand Strategy"],
      targetPath: "/services/performance-marketing"
    },
    {
      icon: <img src={GraphicDesigningIcon} alt="Graphic Designing" className="w-12 h-12" />,
      title: "Graphic Designing",
      description: "Visual identity and brand design that captivates your audience",
      features: ["Logo Design", "Brand Identity", "Print Design", "Digital Assets"],
      targetPath: "/services/graphic-designing"
    },
    {
      icon: <img src={AnimationIcon} alt="2D/3D Animation" className="w-12 h-12" />,
      title: "2D/3D Animation 3D Animation",
      description: "Engaging animations and motion graphics for digital experiences",
      features: ["Motion Graphics", "3D Modeling", "Video Editing", "Interactive Media"],
      targetPath: "/services/graphic-designing"
    },
    {
      icon: <img src={ModelingIcon} alt="3D Modeling" className="w-12 h-12" />,
      title: "3D Modeling",
      description: "Professional 3D models and visualizations for any industry",
      features: ["Product Visualization", "Architectural Renders", "Character Design", "VR/AR Assets"],
      targetPath: "/services/graphic-designing"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-yellow-600">Premium</span> Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to elevate your business to new heights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-yellow-200 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-700 transition-colors">
                  {service.title}
                </h3>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:bg-yellow-500 transition-colors"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* NEW: Open in new tab */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <a
                  href={service.targetPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors group-hover:translate-x-1 transform duration-300 inline-flex items-center"
                >
                  Learn More
                  <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;