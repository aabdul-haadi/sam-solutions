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
    .replace(/[’']/g, '')
    .replace(/[^\w\s.-]/g, '')
    .trim()
    .replace(/\s+/g, '_');

const brandCategories: Record<CategoryKey, string[]> = {
  'Food & Beverage': [
    'Allah Raazi',
    'Coffe_by_ms',
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
    "Alen's Grilled Fried Chicken",
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
    'SAPHORAE',
    'Plum Glow',
    'Fliss Cosmetics',
    'NH Herbs',
    'Azbah Beauty',
    'Serene Beauty',
    'The 16 Scents',
    'Syoss Skin',
    'GIUTAONE',
    'Z_A Organic',
    'Decorrista PR 2',
    'Mashal Candles',
    'Foreverscent',
    'Cerozone',
    'Aboure',
    'Vintage Glam',
    'Al Meeqat',
  ],
  'Fashion & Clothing': ['The Lines.pk', 'Zattitude', 'Kapah Official', 'Lorven Official', 'Oncekonfor', 'Irza Textile', 'Toliya.co', 'Raab.pk', 'Konfor'],
  'Home, Decor & Lifestyle': ['Homez Decorz', 'Neutrisa', 'Zerolifestyle', 'SM1 Store', 'Hommy', 'Comfort Realm', 'TJ Pure', 'Craftandco.pk', 'Decorrista', 'Gift Bliss'],
  'Organic, Health & Wellness': ['HERBEX', 'Mountain Gold', 'Keyzaar.pk', 'Gameon.style'],
  'Jewellery, Accessories & Watches': ['Hamid Watches', 'Zahoor Scents', 'Saqeez'],
  'Fragrance & Candles': ['Mashal Candles', 'Foreverscent', 'The 16 Scents', 'Zahoor Scents'],
  'E-Commerce & Multi-Product Stores': ['SM1 Store', 'Toliya.co', 'GADGITT'],
  Automotive: ['Carraze'],
  'Books & Publishing': ['Umar Kitab G'],
};

const logoUrl = (brand: string, category: CategoryKey) => {
  // Using new URL() allows Vite to correctly resolve and hash these assets for production
  const path = `../../../assets/brands-logo/logos/${categoryFolders[category]}/${slugifyForFile(brand)}.png`;
  return new URL(path, import.meta.url).href;
};

type BrandItem = { name: string; category: CategoryKey };

const durations = [36, 44, 40, 48];

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
            We’ve delivered monthly content production across multiple industries.
            Currently mapped: {totalUniqueBrands} unique brand names.
          </p>
        </div>

        <div className="mb-2 space-y-4">
          {rowsForMarquee.map((row, rowIndex) => {
            const loopRow = [...row, ...row];
            return (
              <div key={`row-${rowIndex}`} className="group overflow-hidden py-3 sm:py-4">
                <div
                  className="flex w-max will-change-transform group-hover:[animation-play-state:paused]"
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
                      className="mx-1.5 flex h-28 min-w-[180px] items-center justify-center bg-transparent p-2 sm:mx-2 sm:h-32 sm:min-w-[240px] sm:p-3"
                      title={brand.name}
                    >
                      <img
                        src={logoUrl(brand.name, brand.category)}
                        alt={`${brand.name} logo`}
                        className="h-20 w-20 rounded-full object-contain sm:h-24 sm:w-24"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLSpanElement | null;
                          if (fallback) fallback.style.display = 'inline-flex';
                        }}
                      />
                      <span className="hidden px-2 text-center text-sm font-semibold leading-tight text-gray-700" style={{ display: 'none' }}>
                        {brand.name}
                      </span>
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
