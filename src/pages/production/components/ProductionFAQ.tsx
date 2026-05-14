import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Are on-site visits available outside our primary service area?',
    a: 'Our standard packages are built for our primary service area. On-site visits outside this area can be discussed as a custom travel-based plan.',
  },
  {
    q: 'Can I approve content before posting?',
    a: 'Yes, we share content for your review and approval before publishing.',
  },
  {
    q: 'Do you manage all platforms?',
    a: 'Growth and Premium include Instagram, TikTok, YouTube Shorts, and Facebook management.',
  },
  {
    q: 'What if I only need reels?',
    a: 'You can request a reels-focused custom plan based on your monthly goals.',
  },
  {
    q: 'How long does it take to start?',
    a: 'Onboarding usually begins within a few days after package confirmation.',
  },
  {
    q: 'Can I upgrade my package later?',
    a: 'Yes, you can upgrade anytime as your content needs grow.',
  },
  {
    q: 'Do you provide captions and hashtags?',
    a: 'Yes, caption writing and hashtag direction are included based on package scope.',
  },
  {
    q: 'Is ad management included?',
    a: 'Ad management is separate and can be added as an extra service.',
  },
];

const ProductionFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-white py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">Need Clarity?</p>
          <h2 id="faq-heading" className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">Quick answers before you choose your package.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const buttonId = `faq-button-${i}`;
            const panelId = `faq-panel-${i}`;

            return (
              <div key={faq.q} className="overflow-hidden rounded-xl border border-gray-200">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between bg-gray-50 p-5 text-left transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-inset"
                  >
                    <span className="font-semibold text-gray-900">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`${isOpen ? 'block' : 'hidden'} border-t border-gray-100 bg-white p-5 text-gray-600`}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductionFAQ;
