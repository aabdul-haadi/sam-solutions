import React from 'react';
import { MessageCircle } from 'lucide-react';
import heroDesktop from '../../../assets/hero-production-web.webp';
import heroMobile from '../../../assets/hero-production-phone-view1.webp';

const ProductionHero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-labelledby="production-hero-heading"
      className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 py-8 text-white md:py-20"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={heroDesktop} />
        <img
          src={heroMobile}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchpriority="high"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#facc15_0,_transparent_45%)] opacity-25" />

      <div className="relative container mx-auto flex min-h-[58vh] items-end px-4 md:min-h-[70vh]">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="pb-4 md:pb-8">

            <h1 id="production-hero-heading" className="mb-3 text-2xl font-extrabold leading-tight md:mb-4 md:text-4xl lg:text-5xl">
              Monthly Content Production for Your Brand
            </h1>

            <p className="mb-2 max-w-2xl text-sm text-gray-300 md:mb-3 md:text-lg">
              Reels, stories, and full content management — planned, shot, edited, and posted every month.
            </p>

            <p className="mb-4 max-w-2xl text-[11px] text-yellow-300/90 md:mb-6 md:text-sm">
              Dedicated team • On-site shooting • End-to-end monthly execution
            </p>

            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <a
                href="#packages"
                className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:px-5 md:py-2.5 md:text-sm"
              >
                See Our Packages
              </a>
              <a
                href="https://wa.me/923138372573?text=Hi%20SAM%20Creative%20Solutions%2C%20I%20want%20to%20discuss%20Content%20Production%20packages."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with SAM Creative Solutions on WhatsApp"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:px-5 md:py-2.5 md:text-sm"
              >
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductionHero;
