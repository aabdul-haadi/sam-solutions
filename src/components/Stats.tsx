import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Globe, Bot } from 'lucide-react';

const Stats: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats = [
    {
      icon: <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8" />,
      number: 150,
      label: "Projects Completed",
      suffix: "+"
    },
    {
      icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" />,
      number: 98,
      label: "Satisfied Clients",
      suffix: "%"
    },
    {
      icon: <Globe className="w-7 h-7 sm:w-8 sm:h-8" />,
      number: 25,
      label: "Industries Served",
      suffix: "+"
    },
    {
      icon: <Bot className="w-7 h-7 sm:w-8 sm:h-8" />,
      number: 50,
      label: "AI Workflows Built",
      suffix: "+"
    }
  ];

  const AnimatedCounter: React.FC<{ target: number; duration: number }> = ({ target, duration }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (!hasAnimated) return;

      const increment = target / (duration / 16);
      let value = 0;

      const timer = setInterval(() => {
        value += increment;
        if (value >= target) {
          setCurrent(target);
          clearInterval(timer);
        } else {
          setCurrent(Math.floor(value));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [hasAnimated, target, duration]);

    return <span>{current}</span>;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            The Numbers <span className="text-yellow-400">Speak</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Our track record of success speaks for itself
          </p>
        </div>

        {/* Stats Grid - 2 on mobile, 2 on tablet, 4 on desktop */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group px-2 sm:px-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 
                group-hover:shadow-lg group-hover:shadow-yellow-400/40 transition-all duration-500 transform group-hover:scale-110"
              >
                <div className="text-black">{stat.icon}</div>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                <AnimatedCounter target={stat.number} duration={2000} />
                <span className="text-yellow-400 text-2xl sm:text-3xl lg:text-4xl">{stat.suffix}</span>
              </div>

              <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 text-center px-4">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto border border-yellow-400/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Let's create something extraordinary together. Your vision, our expertise.
            </p>

            <a
              href="https://wa.me/923263778850"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg 
                hover:shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105 
                active:scale-95"
              >
                Start Your Project Today
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;