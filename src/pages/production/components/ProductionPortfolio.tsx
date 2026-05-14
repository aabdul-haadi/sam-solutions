import React, { useState, useCallback } from 'react';
import { OptimizedImage } from '../../../components/OptimizedImage';
import { X, ZoomIn, ZoomOut, Search } from 'lucide-react';

// Import high-quality assets from the prod-assets folder for optimized local serving
import prod1 from '../../../assets/prod-assets/prod-1.webp';
import prod2 from '../../../assets/prod-assets/prod-2.webp';
import prod3 from '../../../assets/prod-assets/prod-3.webp';
import prod4 from '../../../assets/prod-assets/prod-4.webp';
import prod5 from '../../../assets/prod-assets/prod-5.webp';
import prod6 from '../../../assets/prod-assets/prod-6.webp';
import prod7 from '../../../assets/prod-assets/prod-7.webp';
import prod8 from '../../../assets/prod-assets/prod-8.webp';
import prod9 from '../../../assets/prod-assets/prod-9.webp';
import prod10 from '../../../assets/prod-assets/prod-10.webp';
import prod11 from '../../../assets/prod-assets/prod-11.webp';
import prod12 from '../../../assets/prod-assets/prod-12.webp';

const portfolioImages = [
  { id: 1, url: prod1, title: "Cinematic Product Shoot" },
  { id: 2, url: prod2, title: "Premium Brand Visuals" },
  { id: 3, url: prod3, title: "Modern Lifestyle Content" },
  { id: 4, url: prod4, title: "Creative Studio Production" },
  { id: 5, url: prod5, title: "Behind The Scenes" },
  { id: 6, url: prod6, title: "Aesthetic Brand B-Roll" },
  { id: 7, url: prod7, title: "High-End Event Coverage" },
  { id: 8, url: prod8, title: "Professional Brand Story" },
  { id: 9, url: prod9, title: "Direct Response Creative" },
  { id: 10, url: prod10, title: "Product Cinematic" },
  { id: 11, url: prod11, title: "Minimalist Brand Vibe" },
  { id: 12, url: prod12, title: "Social First Production" },
];

const ProductionPortfolio: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const displayedImages = isExpanded ? portfolioImages : portfolioImages.slice(0, 4);

  const handleImageClick = (url: string) => {
    setSelectedImg(url);
    setZoomLevel(1);
  };

  const handleDoubleClick = useCallback(() => {
    setZoomLevel(prev => (prev === 1 ? 2 : 1));
  }, []);

  const closeLightbox = () => {
    setSelectedImg(null);
    setZoomLevel(1);
  };

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">Our Work</p>
          <h2 id="portfolio-heading" className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Visuals that speak louder than words
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {displayedImages.map((img) => (
            <div
              key={img.id}
              onClick={() => handleImageClick(img.url)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square w-full sm:aspect-[4/5]">
                <OptimizedImage
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
                  <Search className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center rounded-full border-2 border-gray-900 px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-gray-900 hover:text-white"
          >
            {isExpanded ? 'Show Less' : 'View More Work'}
          </button>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          <div className="absolute top-6 right-6 z-[110] flex gap-4">
            <div className="hidden md:flex gap-2 bg-black/50 p-2 rounded-full backdrop-blur-md border border-white/10">
               <button 
                onClick={(e) => { e.stopPropagation(); setZoomLevel(2); }}
                className="p-2 text-white hover:text-yellow-400"
               >
                 <ZoomIn className="h-6 w-6" />
               </button>
               <button 
                onClick={(e) => { e.stopPropagation(); setZoomLevel(1); }}
                className="p-2 text-white hover:text-yellow-400"
               >
                 <ZoomOut className="h-6 w-6" />
               </button>
            </div>
            <button
              onClick={closeLightbox}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-white backdrop-blur-md transition hover:bg-red-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div 
            className="relative h-full w-full overflow-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative transition-transform duration-300 ease-out cursor-zoom-in"
              style={{ 
                transform: `scale(${zoomLevel})`,
                minWidth: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
              onDoubleClick={handleDoubleClick}
            >
              <img
                src={selectedImg}
                alt="Portfolio zoom view"
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              />
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/60 text-xs md:text-sm">
            Double click to zoom in/out • Drag to explore
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .cursor-zoom-in {
          cursor: zoom-in;
        }
        .cursor-zoom-in:active {
          cursor: grabbing;
        }
      `}</style>
    </section>
  );
};

export default ProductionPortfolio;