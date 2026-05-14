import React from 'react';
import { CalendarClock, Camera, Clock3, Lightbulb } from 'lucide-react';

const points = [
  {
    icon: CalendarClock,
    title: 'Posting randomly with no plan',
    text: 'Inconsistent posting hurts reach and makes growth unpredictable.',
  },
  {
    icon: Camera,
    title: "Content that doesn't look professional",
    text: 'Low-quality visuals can make a strong business look less credible online.',
  },
  {
    icon: Clock3,
    title: 'No time to manage it yourself',
    text: 'Running operations leaves little room for planning, shooting, and posting.',
  },
  {
    icon: Lightbulb,
    title: "Don't know what to post next",
    text: 'Without clear direction, social content becomes confusing and inconsistent.',
  },
];

const ProductionPainPoints: React.FC = () => {
  return (
    <section id="pain-points" aria-labelledby="pain-points-heading" className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 id="pain-points-heading" className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Sound like you?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
            If any of these feel familiar, your brand needs a structured content production system — not random posting.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:gap-6">
          {points.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-md md:p-6"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-yellow-400 transition-colors duration-300 group-hover:bg-yellow-400 group-hover:text-black">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-tight text-gray-900 md:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductionPainPoints;
