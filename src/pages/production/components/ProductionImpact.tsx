import React from 'react';

const stats = [
  { value: '15+', label: 'Brands managed' },
  { value: '200+', label: 'Reels produced' },
  { value: '100%', label: 'On-site production focus' },
  { value: '3x', label: 'Average engagement growth' },
];

const ProductionImpact: React.FC = () => {
  return (
    <section id="impact" aria-labelledby="impact-heading" className="bg-gray-900 py-12 text-white md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-300">Proof of Performance</p>
          <h2 id="impact-heading" className="mt-2 text-3xl font-bold md:text-4xl">
            Built on Consistency. Backed by Results.
          </h2>
          <p className="mt-4 text-gray-300">
            Credibility points from our ongoing production and management work.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-xl border border-white/15 bg-white/5 p-6 text-center">
              <p className="text-3xl font-extrabold text-yellow-300 md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-200 md:text-base">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionImpact;
