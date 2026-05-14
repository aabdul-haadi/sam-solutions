import React from 'react';
import { Film, Layers, Sparkles, CheckCircle, Video, Clapperboard } from 'lucide-react';

const ProductionPage: React.FC = () => {
  const features = [
    'Commercial Video Production',
    'Brand Storytelling & Ad Creatives',
    'Social Media Reels and Short-form Content',
    'Motion Graphics & Post Production',
    'Script-to-Screen Execution',
    'Multi-platform Delivery'
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.12),transparent_50%)]" />
        </div>

        <div className="relative z-10 pt-24 md:pt-28 pb-14 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-sm mb-5">
                <Film className="w-4 h-4" />
                Production Services
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Creative <span className="text-yellow-400">Production</span> That Converts
              </h1>
              <p className="mt-5 text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                From concept to final cut, we produce high-impact visual content designed to grow attention,
                engagement, and conversions across all digital platforms.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-400/30 transition-all">
                  Start a Production Project
                </button>
                <button className="border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all">
                  View Workflow
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                End-to-End Production Pipeline
              </h2>
              <p className="text-gray-600 leading-relaxed mb-7">
                Our production team blends strategy, scripting, filming, editing, and distribution-ready exports.
                Every asset is crafted to support your brand objectives and campaign performance.
              </p>

              <div className="space-y-3">
                {features.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <span className="text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black text-white">
                <Clapperboard className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="text-xl font-bold mb-2">Pre-Production</h3>
                <p className="text-gray-300 text-sm">Concept, scripting, shot planning, and production scheduling.</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black">
                <Video className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-bold mb-2">Production</h3>
                <p className="text-black/80 text-sm">High-quality filming with direction focused on brand communication.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200">
                <Layers className="w-8 h-8 text-gray-900 mb-3" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">Post-Production</h3>
                <p className="text-gray-600 text-sm">Editing, color grading, sound design, and motion graphics.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200">
                <Sparkles className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">Optimization</h3>
                <p className="text-gray-600 text-sm">Platform-specific versions optimized for performance and reach.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductionPage;
