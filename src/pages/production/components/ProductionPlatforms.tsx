import React from 'react';
import { Camera, Clapperboard, Globe, Play, Image, Radio } from 'lucide-react';

const platforms = [
  { icon: Image, name: 'Instagram' },
  { icon: Radio, name: 'TikTok' },
  { icon: Play, name: 'YouTube Shorts' },
  { icon: Globe, name: 'Facebook' },
  { icon: Camera, name: 'Stories' },
  { icon: Clapperboard, name: 'Reels' },
];

const ProductionPlatforms: React.FC = () => {
  return (
    <section id="platforms" aria-labelledby="platforms-heading" className="relative py-12 md:py-16 overflow-hidden bg-gray-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1920" 
          alt="Social Media Platforms" 
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 id="platforms-heading" className="text-3xl font-extrabold text-white md:text-4xl">
            We post on all of these
          </h2>
        </div>

        <ul className="grid grid-cols-3 gap-y-8 gap-x-2 md:gap-12 max-w-4xl mx-auto" aria-label="Supported content platforms">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <li
                key={platform.name}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-yellow-400 transition-all hover:bg-yellow-400 hover:text-black hover:border-yellow-400">
                  <Icon className="h-8 w-8 md:h-12 md:w-12" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 md:text-sm">{platform.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ProductionPlatforms;
