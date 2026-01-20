import React, { useEffect} from 'react';
import { Target, Eye, Heart, Award } from 'lucide-react';

const About: React.FC = () => {
  // const aboutRef = useRef<HTMLDivElement>(null);

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

    const elements = document.querySelectorAll('.about-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Growth at the Core",
      description: "We design strategies with your long-term growth as the primary goal, not just short-term fixes."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Results That Matter",
      description: " We focus on measurable outcomes that drive your business forward and bring real value."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Your Success, Our Focus",
      description: "Your business goals are our top priority, and we’re dedicated to seeing them achieved."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Tailored Innovation",
      description: "We create customized solutions that tackle your unique challenges with fresh, innovative ideas."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="about-item">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Creating Digital Excellence Since <span className="text-yellow-600">2020</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
             At our core, we’re not just focused on offering digital services; we're deeply committed to your business growth. While many companies tout their expertise in design, marketing, and development, we take a unique approach by seamlessly integrating these services to deliver exponential growth. Our goal isn't just to meet your immediate needs;
            we are here to establish a foundation for long-term, sustainable success. 
            </p>

             <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                         Every strategy we create is designed with one thing in mind: how can we help you grow faster, smarter, and more effectively? We view ourselves as an extension of your team, constantly adapting and evolving alongside your business to keep you ahead of the curve.

            </p>
            {/* <p className="text-gray-600 mb-8 leading-relaxed">
             Every strategy we create is designed with one thing in mind: how can we help you grow faster, smarter, and more effectively? We view ourselves as an extension of your team, constantly adapting and evolving alongside your business to keep you ahead of the curve.

            </p> */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                Our Story
              </button>
              {/* <button className="border-2 border-black text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300">
                Meet The Team
              </button> */}
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="about-item relative">
            <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-8 text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">Our Mission</h3>
                <p className="text-gray-300">
                  To foster business growth by providing tailored digital solutions that prioritize long-term success over short-term gains.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">Our Vision</h3>
                <p className="text-gray-300">
                  To empower businesses globally by focusing on scalable, growth-driven strategies that create lasting impact and sustainable value.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">150+</div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">98%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose <span className="text-yellow-600">SAM CREATIVE</span></h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
Here’s why we’re the perfect partner to help your business thrive and grow in today’s digital landscape:
            </p>
          </div>

          {/* Mobile Design - Creative Card Layout */}
          <div className="block md:hidden space-y-6">
            {values.map((value, index) => (
              <div key={index} className="about-item">
                <div className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-yellow-50 to-yellow-100' : 'from-gray-50 to-gray-100'} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                        <div className="text-black">{value.icon}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2 text-gray-800">{value.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Design - Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="about-item text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-yellow-400/30 transition-all duration-300">
                  <div className="text-black">{value.icon}</div>
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;