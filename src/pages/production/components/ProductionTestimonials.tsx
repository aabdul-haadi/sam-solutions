import React from 'react';

const testimonials = [
  {
    quote:
      'Before SAM Creative, our content was inconsistent. Now our reels look professional and customers mention our social media.',
    name: 'Restaurant Owner',
    brand: 'UrbanBite Karachi',
  },
  {
    quote:
      'The Growth package gave us structure. We get better visuals, daily stories, and consistent posting without stress.',
    name: 'Fashion Brand Owner',
    brand: 'Noor Apparel',
  },
  {
    quote:
      'The on-site shoots and monthly planning made all the difference. Our page finally looks like a proper brand.',
    name: 'Retail Business Owner',
    brand: 'Karachi Mart',
  },
];

const ProductionTestimonials: React.FC = () => {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">Social Proof</p>
          <h2 id="testimonials-heading" className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-gray-600">Real feedback from brands using our monthly production packages.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.brand} className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="leading-relaxed text-gray-700">“{item.quote}”</p>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.brand}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionTestimonials;
