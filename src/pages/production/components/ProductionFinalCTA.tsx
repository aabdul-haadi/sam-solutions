import React from 'react';
import { MessageCircle } from 'lucide-react';

const ProductionFinalCTA: React.FC = () => {
  return (
    <section id="final-cta" aria-labelledby="final-cta-heading" className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-black/70">Start This Month</p>
          <h2 id="final-cta-heading" className="mb-4 mt-2 text-3xl font-extrabold text-black md:text-4xl">
            Ready to Turn Your Brand into a Content Machine?
          </h2>
          <p className="mb-3 text-lg text-black/80">
            Book your monthly production package and let us handle strategy, shoots, edits, and posting.
          </p>
          <p className="mb-8 text-sm text-black/70">No long-term lock-ins. Flexible upgrades as your brand grows.</p>
          <a
            href="https://wa.me/923138372573?text=Hi%20SAM%20Creative%20Solutions%2C%20I%20want%20to%20start%20a%20monthly%20production%20package."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book your production package on WhatsApp"
            className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 font-semibold text-white transition hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-300"
          >
            <MessageCircle className="h-5 w-5" />
            Book on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductionFinalCTA;
