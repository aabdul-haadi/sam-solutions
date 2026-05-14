import React from 'react';

const steps = [
  {
    title: 'Brand Onboarding',
    desc: 'We understand your business, goals, and audience style.',
  },
  {
    title: 'Content Plan',
    desc: 'A monthly posting and production plan is prepared.',
  },
  {
    title: 'On-Site Shoot',
    desc: 'Our team visits your location to capture content.',
  },
  {
    title: 'Edit & Deliver',
    desc: 'We edit reels, posts, and stories in platform-ready formats.',
  },
  {
    title: 'Post & Manage',
    desc: 'We publish and manage your pages consistently every month.',
  },
];

const ProductionProcess: React.FC = () => {
  return (
    <section id="process" aria-labelledby="process-heading" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">Our Workflow</p>
          <h2 id="process-heading" className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-gray-600">A simple process designed to feel easy and stress-free.</p>
        </div>

        <ol className="grid gap-4 md:grid-cols-5">
          {steps.map((step, idx) => (
            <li key={step.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="mb-2 text-xs font-bold text-yellow-700">0{idx + 1}</p>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProductionProcess;
