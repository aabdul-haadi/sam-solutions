import React, { useEffect } from 'react';
import { 
  Bot, 
  Brain, 
  Workflow, 
  Zap,
  MessageSquare,
  Settings,
  TrendingUp,
  Shield
} from 'lucide-react';

const AIServices: React.FC = () => {
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

    const aiCards = document.querySelectorAll('.ai-card');
    aiCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const aiServices = [
    {
      icon: <Workflow className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "AI Automation for Business Workflows",
      description: "Streamline your operations with intelligent automation that learns and adapts to your business processes.",
      features: ["Process Automation", "Smart Routing", "Data Processing", "Task Optimization"]
    },
    {
      icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "AI Assistant / Chatbot Development",
      description: "Custom-trained AI assistants that understand your business and serve your customers 24/7.",
      features: ["Natural Language Processing", "Custom Training", "Multi-platform Support", "Learning Capabilities"]
    },
    {
      icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Custom AI Integrations",
      description: "Seamlessly integrate AI capabilities into your existing systems and workflows.",
      features: ["API Integration", "Custom Models", "Real-time Processing", "Scalable Solutions"]
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_50%)]"></div>
      
      {/* Floating Elements with Responsive Positioning */}
      <div className="hidden md:block absolute top-[20%] left-[10%] sm:left-[15%] md:left-[20%] animate-pulse">
        <Brain className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-400/20" />
      </div>
      <div className="hidden md:block absolute top-[30%] right-[10%] sm:right-[15%] md:right-[20%] animate-bounce">
        <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-400/15" />
      </div>
      <div className="hidden md:block absolute bottom-[20%] left-[15%] sm:left-[20%] md:left-[30%] animate-pulse">
        <Bot className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-400/25" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-400/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm sm:text-base">AI POWERED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Custom <span className="text-yellow-400">AI Solutions</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your customer service with our intelligent AI chatbot solutions. Get a custom-trained 
            AI assistant that understands your business and serves your customers 24/7.
          </p>
        </div>

        {/* Demo Section */}
        <div className="ai-card bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 mb-10 sm:mb-12 md:mb-16 border border-yellow-400/20">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm sm:text-base">AI Assistant Demo</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Hi! I'm your AI assistant. How can I help you today?
              </h3>
              <div className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block mb-4 font-medium text-sm sm:text-base">
                I need help with creating a custom AI chatbot.
              </div>
              <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                I can help you with that! Our AI solutions are tailored to your business needs. 
                Would you like to discuss the features?
              </p>
              <a
                href="https://wa.me/923138372573"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105">
                  Create Your AI Assistant
                </button>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-400/10">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mb-2" />
                <div className="text-xs sm:text-sm text-gray-400">Advanced AI</div>
                <div className="text-white font-semibold text-sm sm:text-base">Custom-trained AI models for your specific business needs</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-400/10">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mb-2" />
                <div className="text-xs sm:text-sm text-gray-400">Multi-Channel Support</div>
                <div className="text-white font-semibold text-sm sm:text-base">Seamless integration with your website, WhatsApp, and social media</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-400/10">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mb-2" />
                <div className="text-xs sm:text-sm text-gray-400">Secure & Private</div>
                <div className="text-white font-semibold text-sm sm:text-base">Enterprise-grade security with data encryption and privacy controls</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-400/10">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mb-2" />
                <div className="text-xs sm:text-sm text-gray-400">Instant Responses</div>
                <div className="text-white font-semibold text-sm sm:text-base">24/7 automated customer interactions with real-time responses</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {aiServices.map((service, index) => (
            <div
              key={index}
              className="ai-card group bg-gradient-to-br from-gray-800 to-gray-900 p-6 sm:p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-400/10"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-yellow-400/30 transition-all duration-300">
                <div className="text-black">{service.icon}</div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-white text-center">{service.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed text-center text-sm sm:text-base">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-400">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-700 text-center">
                <button className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors text-sm sm:text-base">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="ai-card text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto border border-yellow-400/20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business with AI?
            </h3>
            <p className="text-gray-300 mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
              Let's create intelligent solutions that automate your workflows and enhance customer experiences.
            </p>
            <a
              href="https://wa.me/923138372573"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105">
                Get Your AI Solution Today
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIServices;