import React, { useEffect } from 'react';

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

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="about-item">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Creating Digital Excellence Since <span className="text-yellow-600">2020</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              At our core, we’re not just focused on offering digital services; we&apos;re deeply committed to your business growth. While many companies tout their expertise in design, marketing, and development, we take a unique approach by seamlessly integrating these services to deliver exponential growth. Our goal isn&apos;t just to meet your immediate needs; we are here to establish a foundation for long-term, sustainable success.
            </p>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Every strategy we create is designed with one thing in mind: how can we help you grow faster, smarter, and more effectively? We view ourselves as an extension of your team, constantly adapting and evolving alongside your business to keep you ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                Our Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;