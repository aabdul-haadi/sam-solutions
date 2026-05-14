import React, { useState } from 'react';
import { Check } from 'lucide-react';

type PackagePlan = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  period: string;
  included: string[];
  excluded?: string[];
  ctaLabel: string;
  ctaStyle: 'primary' | 'secondary';
  highlighted?: boolean;
};

const plans: PackagePlan[] = [
  {
    id: 'growth',
    name: 'Growth Production',
    subtitle: 'Best for growing brands that need full management',
    price: 'PKR 34,049',
    originalPrice: 'PKR 45,000',
    period: '/month',
    included: [
      'Monthly on-site visits',
      '6–8 reels/month (cinematic + BTS + ASMR)',
      '10 creative posts/month',
      'Daily stories management',
      'Instagram, TikTok, YT Shorts & FB',
    ],
    ctaLabel: 'Choose Growth Package',
    ctaStyle: 'primary',
    highlighted: true,
  },
  {
    id: 'starter',
    name: 'Starter Production',
    subtitle: 'Best for small businesses and new brands',
    price: 'PKR 16,999',
    originalPrice: 'PKR 22,500',
    period: '/month',
    included: [
      '3 on-site brand visits',
      '3–4 cinematic reels/month',
      '6 creative social media posts',
      'Basic captions and hashtags',
      'Instagram and Facebook content',
    ],
    ctaLabel: 'Start with Starter',
    ctaStyle: 'secondary',
  },
  {
    id: 'premium',
    name: 'Premium Production',
    subtitle: 'Best for established brands with high-volume needs',
    price: 'PKR 59,000',
    originalPrice: 'PKR 78,500',
    period: '/month',
    included: [
      'Multiple visits on brand',
      '12–16 high-end cinematic reels',
      'Product and service showcase videos',
      '20 creative posts + daily stories',
      'Dedicated content manager',
    ],
    ctaLabel: 'Get Premium Production',
    ctaStyle: 'secondary',
  },
];

const ProductionPackages: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const index = Math.round((scrollLeft / scrollWidth) * (plans.length - 1));
    if (!isNaN(index)) setActiveIndex(index);
  };

  return (
    <section id="packages" aria-labelledby="packages-heading" className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">Pricing</p>
          <h2 id="packages-heading" className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Pick your plan
          </h2>
        </div>

        <div 
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto pb-8 pt-4 scrollbar-hide -mx-4 px-4 gap-4 md:gap-6 lg:grid lg:grid-cols-3 lg:overflow-x-visible lg:snap-none lg:px-0 lg:mx-0 lg:items-center"
        >
          {plans.map((plan) => {
            return (
              <article
                key={plan.id}
                aria-label={`${plan.name} plan`}
                className={`min-w-[85vw] sm:min-w-[350px] lg:min-w-0 snap-center relative rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 ${
                  plan.id === 'growth'
                    ? 'border-[3px] border-yellow-400 bg-yellow-50/50 shadow-xl z-10'
                    : 'border border-gray-100 bg-gray-50'
                } ${
                  plan.id === 'starter' ? 'lg:scale-95' : plan.id === 'premium' ? 'lg:scale-105 shadow-2xl bg-white border-gray-200' : ''
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-black shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 md:text-2xl">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-1">{plan.subtitle}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-3">
                    {plan.originalPrice && (
                      <p className="text-lg font-medium text-gray-500 line-through">
                        {plan.originalPrice}
                      </p>
                    )}
                    <p className="text-4xl font-black text-gray-900">
                      {plan.price}
                      <span className="text-sm font-medium text-gray-500">{plan.period}</span>
                    </p>
                  </div>
                  {plan.originalPrice && (
                    <p className="mt-2 text-xs font-semibold text-green-600 uppercase tracking-wide">
                      Save {Math.round((1 - parseFloat(plan.price.replace(/[^\d]/g, '')) / parseFloat(plan.originalPrice.replace(/[^\d]/g, ''))) * 100)}%
                    </p>
                  )}
                </div>

                <ul className="mb-8 space-y-4 text-sm text-gray-700 flex-grow">
                  {plan.included.slice(0, 5).map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <a
                    href="https://wa.me/923138372573"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${plan.ctaLabel} on WhatsApp`}
                    className={`inline-flex w-full items-center justify-center rounded-full py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 ${
                      plan.ctaStyle === 'primary'
                        ? 'bg-gray-900 text-yellow-400 hover:bg-black shadow-lg'
                        : 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {plan.ctaLabel}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="mt-2 flex justify-center gap-1.5 lg:hidden">
          {plans.map((_, i) => (
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

export default ProductionPackages;
