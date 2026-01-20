import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "SAM CREATIVE completely transformed our outdated website into a modern, user-friendly platform. The team was responsive, understood our brand perfectly, and delivered on time. We've seen a significant increase in leads and customer engagement since launch."
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Founder, EcoSolutions",
      image: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "Working with SAM CREATIVE was a game-changer for our online presence. They redesigned our site with a clean, professional look and improved functionality. Traffic has grown steadily, and our conversion rates are much better now. Highly professional team!"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Marketing Director, Fashion Hub",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The team at SAM CREATIVE built us a beautiful, high-converting e-commerce platform from scratch. It's fast, mobile-friendly, and easy to manage. Our online sales have grown consistently since going live. Excellent communication throughout the project."
    },
    {
      id: 4,
      name: "David Thompson",
      position: "CTO, DataFlow Systems",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "SAM CREATIVE helped us modernize our corporate website and improve SEO performance. The new design is sleek and professional, and we've ranked higher for key terms. They were patient, detail-oriented, and delivered great results."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What Our <span className="text-yellow-600">Clients</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real feedback from businesses we've helped grow
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 h-full">
                    {/* Header: Avatar + Name */}
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-yellow-100 mr-5 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm md:text-base">{testimonial.position}</p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <Quote className="absolute -top-4 -left-2 w-12 h-12 text-yellow-400/20" />
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed pl-8 italic">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-10 space-x-6">
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'bg-yellow-600 w-10 h-3'
                      : 'bg-gray-300 w-3 h-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl p-10 max-w-3xl mx-auto shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Ready to Grow Your Business?
            </h3>
            <p className="text-black/80 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of satisfied clients. Let's discuss how we can help you succeed online.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Your Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;