import React, { useState } from 'react';
import { Clapperboard, MapPin, Film, MessageSquareQuote, Sparkles, Share2, Camera, ShoppingBag } from 'lucide-react';

const services = [
  {
    icon: Clapperboard,
    title: 'Cinematic Reels',
    text: "High-quality short videos designed to grab attention and boost your brand's engagement.",
  },
  {
    icon: MapPin,
    title: 'On-Site Shoot',
    text: 'Monthly professional shoots at your business location for fresh, authentic content.',
  },
  {
    icon: Film,
    title: 'Behind the Scenes',
    text: 'Authentic glimpses into your process and brand personality that build human connection.',
  },
  {
    icon: MessageSquareQuote,
    title: 'Customer Testimonials',
    text: 'Capture real customer feedback that builds massive trust and social credibility for your brand.',
  },
  {
    icon: Sparkles,
    title: 'Ambience Videos',
    text: "Aesthetic visual storytelling that highlights your brand's unique vibe and makes it feel premium.",
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    text: 'We handle your posting, captions, and growth strategy across all major social platforms.',
  },
  {
    icon: Camera,
    title: 'Daily Stories',
    text: 'Keep your brand top-of-mind with consistent daily engagement and creative story updates.',
  },
  {
    icon: ShoppingBag,
    title: 'Product Showcase',
    text: 'Clean and creative visual showcases that highlight your products and their best features.',
  },
];

const ProductionServices: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const index = Math.round((scrollLeft / scrollWidth) * (services.length - 1));
    if (!isNaN(index)) setActiveIndex(index);
  };

  return (
    <section id="services" aria-labelledby="production-services-heading" className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">What We Handle</p>
          <h2 id="production-services-heading" className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Here's what you get every month
          </h2>
        </div>

        <div 
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto pb-8 pt-2 scrollbar-hide -mx-4 px-4 gap-4 md:gap-6 lg:grid lg:grid-cols-4 lg:overflow-x-visible lg:snap-none lg:px-0 lg:mx-0"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="min-w-[85vw] sm:min-w-[320px] lg:min-w-0 snap-center flex flex-col items-center text-center rounded-[2.5rem] border border-gray-100 bg-gray-50 p-10 transition-all duration-300 hover:border-yellow-400 hover:bg-white hover:shadow-xl md:p-8"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-900 text-yellow-400 shadow-lg md:mb-6 md:h-16 md:w-16">
                  <Icon className="h-10 w-10 md:h-8 md:w-8" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900 md:text-lg">{service.title}</h3>
                <p className="leading-relaxed text-gray-600 line-clamp-2 text-sm md:text-base">
                  {service.text}
                </p>
              </article>
            );
          })}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="mt-2 flex justify-center gap-1.5 lg:hidden">
          {services.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-4 bg-yellow-400' : 'w-1 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ProductionServices;
