import React, { useMemo } from 'react';

type CategoryKey =
  | 'Food & Beverage'
  | 'Beauty, Skincare & Cosmetics'
  | 'Fashion & Clothing'
  | 'Home, Decor & Lifestyle'
  | 'Organic, Health & Wellness'
  | 'Jewellery, Accessories & Watches'
  | 'Fragrance & Candles'
  | 'E-Commerce & Multi-Product Stores'
  | 'Automotive'
  | 'Books & Publishing';

const categoryFolders: Record<CategoryKey, string> = {
  'Food & Beverage': '01_Food_and_Beverage',
  'Beauty, Skincare & Cosmetics': '02_Beauty_Skincare_Cosmetics',
  'Fashion & Clothing': '03_Fashion_and_Clothing',
  'Home, Decor & Lifestyle': '04_Home_Decor_Lifestyle',
  'Organic, Health & Wellness': '05_Organic_Health_Wellness',
  'Fragrance & Candles': '06_Fragrance_and_Candles',
  'Jewellery, Accessories & Watches': '07_Jewellery_Accessories_Watches',
  'E-Commerce & Multi-Product Stores': '08_Ecommerce_Multi_Stores',
  Automotive: '09_Automotive',
  'Books & Publishing': '10_Books_and_Publishing',
};

const slugifyForFile = (value: string) =>
  value
    .toLowerCase()
    .replace(/[’']/g, '') // Remove apostrophes
    .replace(/[^\w\s.-]/g, '') // Keep letters, numbers, spaces, dots, and hyphens
    .trim()
    .replace(/\s+/g, '_'); // Replace spaces with underscores

// Eagerly import all logos from the assets folder. 
// Vite will include all matching files in the production build and provide their resolved URLs.
const logoModules = import.meta.glob<{ default: string }>(
  '../../../assets/brands-logo/logos/**/*.png',
  { eager: true }
);

// Pre-normalize glob keys to 'folder/filename.png' for reliable lookup
const normalizedLogos: Record<string, string> = {};
Object.entries(logoModules).forEach(([path, module]) => {
  const parts = path.split('/logos/');
  if (parts.length > 1) {
    // Use lowercase keys for case-insensitive matching in production
    normalizedLogos[parts[1].toLowerCase()] = module.default;
  }
});

const brandCategories: Record<CategoryKey, string[]> = {
  'Food & Beverage': [
    'Allah Raazi',
    'Coffee by MS',
    'Ramzan Dairy',
    'GET Burridos',
    'Burger Bunker',
    'The Big Pizza',
    'Chai Chenak',
    'Creek Walk',
    'Berekah Lounge',
    'Burger Shurger',
    'The Wok Hei',
    'Kolachi Farms',
    "Alen_s Grilled Fried Chicken",
    'Pizzeria',
    'Booba Bear Brew',
    'Hotway Pizza',
    'AR Biryani',
    'Zuzaar',
  ],
  'Beauty, Skincare & Cosmetics': [
    'AMS Cosmetics',
    'BBL Derma',
    'Sarma Organic',
    'Glowzen Beauty',
    'Obskin Official',
    'Saphorae',
    'Plum Glow',
    'Fliss Cosmetics',
    'NH Herbs',
    'Azbah Beauty',
    'Serene Beauty',
    'The 16 Scents',
    'Syoss Skin',
    'Giutaone',
    'ZA Organic',
    'Decorrista PR 2',
    'Mashal Candles',
    'Foreverscent',
    'Cerozone',
    'Aboure',
    'Vintage Glam',
    'Al Meeqat',
  ],
  'Fashion & Clothing': ['The Lines.pk', 'Zattitude', 'Kapah Official', 'Lorven Official', 'Once Konfor', 'Irza Textile', 'Toliya.co', 'Raab.pk', 'Konfor'],
  'Home, Decor & Lifestyle': ['Homez Decorz', 'Neutrisa', 'Zerolifestyle', 'SM1 Store', 'Hommy', 'Comfort Realm', 'TJ Pure', 'Craftandco.pk', 'Decorrista', 'Gift Bliss'],
  'Organic, Health & Wellness': ['Herbex', 'Mountain Gold', 'Keyzaar.pk', 'Gameon.style'],
  'Jewellery, Accessories & Watches': ['Hamid Watches', 'Zahoor Scents', 'Saqeez'],
  'Fragrance & Candles': ['Mashal Candles', 'Foreverscent', 'The 16 Scents', 'Zahoor Scents'],
  'E-Commerce & Multi-Product Stores': ['SM1 Store', 'Toliya.co', 'Gadgitt'],
  Automotive: ['Carraze'],
  'Books & Publishing': ['Umar Kitab G'],
};

const logoUrl = (brand: string, category: CategoryKey) => {
  // Special case for Burger Shurger with external URL
  if (brand === 'Burger Shurger') {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYBKEIx8EYZ0KGMr7zUYsBSj9Rmr3JneoZJg&s';
  }

  const folder = categoryFolders[category];
  const fileName = slugifyForFile(brand);
  const lookupKey = `${folder}/${fileName}.png`.toLowerCase();

  return normalizedLogos[lookupKey] || '';
};

type BrandItem = { name: string; category: CategoryKey };

const durations = [24, 30, 28, 34];

const ProductionTrust: React.FC = () => {
  const totalUniqueBrands = useMemo(() => {
    const all = Object.values(brandCategories).flat();
    return new Set(all).size;
  }, []);

  const rowsForMarquee = useMemo(() => {
    const allBrands: BrandItem[] = Object.entries(brandCategories).flatMap(([category, list]) =>
      list.map((name) => ({ name, category: category as CategoryKey }))
    );

    const uniqueBrandMap = new Map<string, BrandItem>();
    allBrands.forEach((brand) => {
      if (!uniqueBrandMap.has(brand.name)) uniqueBrandMap.set(brand.name, brand);
    });

    const uniqueBrands = Array.from(uniqueBrandMap.values());
    const rowCount = 4;
    const rows: BrandItem[][] = Array.from({ length: rowCount }, () => []);

    uniqueBrands.forEach((brand, idx) => {
      rows[idx % rowCount].push(brand);
    });

    return rows;
  }, []);

  return (
    <section id="trusted" aria-labelledby="trust-heading" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 id="trust-heading" className="text-3xl font-bold text-gray-900 md:text-4xl">
            Trusted by 75+ Brands
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            We’ve delivered monthly content production across multiple industries. Currently mapped: {totalUniqueBrands} unique brand names.
          </p>
        </div>

        <div className="mb-2 space-y-4">
          {rowsForMarquee.map((row, rowIndex) => {
            const loopRow = [...row, ...row];
            return (
              <div key={`row-${rowIndex}`} className="group overflow-hidden py-3 sm:py-4">
                <div
                  className="flex w-max items-center will-change-transform group-hover:[animation-play-state:paused]"
                  style={{
                    animationName: rowIndex % 2 === 0 ? 'marqueeLeft' : 'marqueeRight',
                    animationDuration: `${durations[rowIndex % durations.length]}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                  }}
                >
                  {loopRow.map((brand, i) => (
                    <figure
                      key={`${rowIndex}-${brand.category}-${brand.name}-${i}`}
                      className="mx-8 flex h-16 w-16 min-w-[4rem] items-center justify-center bg-white rounded-full overflow-hidden shadow-sm sm:mx-12 sm:h-20 sm:w-20 sm:min-w-[5rem]"
                      title={brand.name}
                    >
                      {(() => {
                        const url = logoUrl(brand.name, brand.category);
                        return url ? (
                          <img
                            src={url}
                            alt={`${brand.name} logo`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLSpanElement | null;
                              if (fallback) fallback.style.display = 'inline-flex';
                            }}
                          />
                        ) : (
                          <span className="inline-flex h-full w-full items-center justify-center text-center text-xs font-bold uppercase tracking-widest text-gray-400 px-2">
                            {brand.name}
                          </span>
                        );
                      })()}
                    </figure>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default ProductionTrust;
