import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Target,
  Image,
  BarChart2,
  DollarSign,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  X,
  TrendingUp,
  Rocket,
  Eye,
  Star,
  Monitor,
  Video,
  Users,
  Globe,
  RefreshCw,
} from 'lucide-react';

interface PerformanceMarketingPageProps {
  setCurrentPage?: (page: string) => void;
}

// Interfaces for type safety
interface TechStack {
  name: string;
  logo: string;
  color: string;
}

interface BusinessProblem {
  title: string;
  description: string;
  impact: string;
  visual: string;
}

interface Solution {
  icon: React.ReactNode;
  title: string;
  description: string;
  result: string;
  features: string[];
  metric: string;
  metricLabel: string;
}

interface PortfolioProject {
  id: number;
  title: string;
  images: string[];
  description: string;
  results: string[];
  tech: string[];
  category: string;
}

interface Testimonial {
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

interface DevelopmentPhase {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
}

interface PricingPlan {
  name: string;
  price: string;
  originalPrice: string;
  duration: string;
  description: string;
  features: string[];
  popular: boolean;
  savings: string;
}

// Data definitions
const techStacks: TechStack[] = [
  { name: 'Google Ads', logo: 'https://simpleicons.org/icons/googleads.svg', color: 'from-green-400 to-green-600' },
  { name: 'YouTube', logo: 'https://simpleicons.org/icons/youtube.svg', color: 'from-red-400 to-red-600' },
  { name: 'Facebook', logo: 'https://simpleicons.org/icons/facebook.svg', color: 'from-blue-400 to-blue-600' },
  { name: 'Instagram', logo: 'https://simpleicons.org/icons/instagram.svg', color: 'from-pink-400 to-pink-600' },
  { name: 'TikTok', logo: 'https://simpleicons.org/icons/tiktok.svg', color: 'from-black to-gray-600' },
  { name: 'X', logo: 'https://simpleicons.org/icons/x.svg', color: 'from-gray-700 to-gray-900' },
  { name: 'Google Analytics', logo: 'https://simpleicons.org/icons/googleanalytics.svg', color: 'from-orange-400 to-orange-600' },
];

const businessProblems: BusinessProblem[] = [
  {
    title: 'Poor Targeting',
    description: 'Running ads without the right audience targeting leads to wasted clicks and no conversions.',
    impact: '74% of marketers say inaccurate targeting is the biggest reason for poor ad performance.',
    visual: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Low-Quality Creatives',
    description: 'Using weak ad copies or creatives can cause users to scroll past your ads.',
    impact: '60% of people ignore ads that don’t grab attention within 3 seconds.',
    visual: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'No Conversion Tracking',
    description: 'Without proper tracking, you can’t measure results or optimize campaigns.',
    impact: 'Nearly 50% of advertisers lose money due to incorrect conversion tracking.',
    visual: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'High CPC & Low ROI',
    description: 'Paying too much per click without results drains your budget.',
    impact: '65% of businesses struggle to maintain profitability with their ad spend.',
    visual: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const solutions: Solution[] = [
  {
    icon: <Target className="w-24 h-24 text-yellow-600" />,
    title: 'Advanced Audience Targeting',
    description: 'We identify and target the right audience segments to ensure your ads reach people most likely to convert.',
    result: 'Brands using precise targeting see up to 3x higher conversion rates.',
    features: ['Demographic targeting', 'Behavioral segmentation', 'Lookalike audiences', 'Geo-targeting'],
    metric: '3x',
    metricLabel: 'Higher Conversions',
  },
  {
    icon: <Image className="w-24 h-24 text-yellow-600" />,
    title: 'High-Converting Creatives',
    description: 'We create compelling ad copies, visuals, and videos that grab attention and drive clicks.',
    result: 'Strong creatives can boost CTR by 70% or more.',
    features: ['Engaging ad copy', 'Professional visuals', 'Video ads', 'A/B testing'],
    metric: '70%',
    metricLabel: 'CTR Increase',
  },
  {
    icon: <BarChart2 className="w-24 h-24 text-yellow-600" />,
    title: 'Conversion Tracking & Analytics',
    description: 'We set up proper tracking systems so every click, lead, and sale is measured.',
    result: 'Companies using conversion tracking improve campaign ROI by at least 30%.',
    features: ['Pixel setup', 'Analytics dashboards', 'Real-time reporting', 'Conversion funnels'],
    metric: '30%',
    metricLabel: 'ROI Improvement',
  },
  {
    icon: <DollarSign className="w-24 h-24 text-yellow-600" />,
    title: 'Optimized Ad Spend',
    description: 'We monitor and adjust campaigns to lower CPC, reduce wasted spend, and maximize returns.',
    result: 'Businesses that optimize regularly see an average of 40% higher ROI.',
    features: ['Bid optimization', 'Budget allocation', 'Performance monitoring', 'Cost reduction'],
    metric: '40%',
    metricLabel: 'Higher ROI',
  },
];

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'E-Commerce Ad Campaign',
    images: [
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Targeted Google Ads campaign for an online store, driving sales and brand awareness.',
    results: ['+250% sales', '+180% traffic', 'High ROI'],
    tech: ['Google Ads', 'Google Analytics', 'Canva'],
    category: 'E-Commerce',
  },
  {
    id: 2,
    title: 'Social Media Ad Blitz',
    images: [
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Engaging Instagram and Facebook ad campaign for a fitness brand.',
    results: ['+300% engagement', '+200% leads', 'Viral reach'],
    tech: ['Facebook Ads', 'Instagram Ads', 'Adobe Premiere'],
    category: 'Social Media',
  },
  {
    id: 3,
    title: 'B2B LinkedIn Campaign',
    images: [
      'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Lead generation campaign on LinkedIn for a tech solutions provider.',
    results: ['+150% leads', '+100% conversions', 'Targeted reach'],
    tech: ['LinkedIn Ads', 'Google Analytics', 'Figma'],
    category: 'B2B Marketing',
  },
  {
    id: 4,
    title: 'Retargeting Campaign',
    images: [
      'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Retargeting campaign to re-engage website visitors and boost conversions.',
    results: ['+200% conversions', '+90% ROI', 'Cost-effective'],
    tech: ['Google Ads', 'Facebook Pixel', 'Google Analytics'],
    category: 'Retargeting',
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Ahmed',
    position: 'Owner',
    company: 'FitFuel Nutrition',
    image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'SAM Creatives helped us optimize our campaigns and triple our online sales. Their strategies really work!',
    rating: 5,
  },
  {
    name: 'Sana',
    position: 'Co-Founder',
    company: 'EduTech Hub',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'We saw a big boost in leads after working with SAM Creatives. Their performance marketing approach is spot on.',
    rating: 5,
  },
  {
    name: 'Usman',
    position: 'CEO',
    company: 'Nova Furniture',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'The team at SAM Creatives knows how to make every dollar count. Our ROI has never been this strong.',
    rating: 5,
  },
  {
    name: 'Hira',
    position: 'Marketing Manager',
    company: 'Bloom Events',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Thanks to SAM Creatives, our campaigns are more targeted and effective. We’re seeing more quality customers every week.',
    rating: 5,
  },
];

const developmentProcess: DevelopmentPhase[] = [
  {
    step: '01',
    title: 'Audience Analysis & Strategy',
    description: 'Analyze your audience and create a tailored marketing strategy.',
    icon: <Target className="w-8 h-8" />,
    duration: '1-2 weeks',
  },
  {
    step: '02',
    title: 'Campaign Setup & Creatives',
    description: 'Develop compelling ad creatives and set up campaigns across platforms.',
    icon: <Image className="w-8 h-8" />,
    duration: '1-2 weeks',
  },
  {
    step: '03',
    title: 'Tracking & Optimization',
    description: 'Implement tracking and optimize campaigns for maximum ROI.',
    icon: <BarChart2 className="w-8 h-8" />,
    duration: '2-3 weeks',
  },
  {
    step: '04',
    title: 'Reporting & Scaling',
    description: 'Provide detailed reports and scale successful campaigns.',
    icon: <Rocket className="w-8 h-8" />,
    duration: 'Ongoing',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter Campaign',
    price: '$499',
    originalPrice: '$699',
    duration: '1 month',
    description: 'Entry-level campaign setup with targeting and creatives.',
    features: [
      'Single platform campaign',
      'Basic audience targeting',
      'Ad creative design',
      'Conversion tracking setup',
      'Monthly report',
    ],
    popular: false,
    savings: 'Save 28%',
  },
  {
    name: 'Pro Campaign',
    price: '$999',
    originalPrice: '$1,299',
    duration: '1-2 months',
    description: 'Multi-platform campaign with advanced targeting and optimization.',
    features: [
      'Multi-platform campaigns',
      'Advanced audience targeting',
      'High-quality creatives',
      'Conversion tracking & analytics',
      'Weekly optimization',
      'Detailed reports',
      '90 days support',
    ],
    popular: true,
    savings: 'Save 23%',
  },
  {
    name: 'Enterprise Campaign',
    price: "Let's Discuss",
    originalPrice: '',
    duration: 'Custom',
    description: 'Comprehensive marketing solution with ongoing support.',
    features: [
      'All platforms supported',
      'Custom audience segmentation',
      'Premium creatives & videos',
      'Real-time tracking',
      'Dedicated account manager',
      'Priority support',
      'Ongoing optimization',
    ],
    popular: false,
    savings: 'Custom Quote',
  },
];

// Reusable PhaseCard component
const PhaseCard: React.FC<{ phase: DevelopmentPhase; index: number; isReversed: boolean }> = ({ phase, index, isReversed }) => (
  <div
    className={`relative flex flex-col lg:flex-row items-center gap-8 transition-all duration-700 ease-out ${
      isReversed ? 'lg:flex-row-reverse' : ''
    } animate-slide-in`}
    style={{ animationDelay: `${index * 0.3}s` }}
    role="listitem"
    aria-labelledby={`phase-title-${index}`}
  >
    <div
      className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full lg:block hidden z-10 animate-pulse"
      aria-hidden="true"
    />
    <div
      className={`lg:w-5/12 w-full bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 transform hover:-translate-y-2 border border-gray-700/50 ${
        isReversed ? 'lg:ml-12' : 'lg:mr-12'
      }`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 text-2xl">
          {phase.icon}
        </div>
        <div>
          <div id={`phase-title-${index}`} className="text-2xl font-bold text-white">
            {phase.step}
          </div>
          <div className="text-yellow-400 text-sm font-medium">{phase.duration}</div>
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{phase.title}</h3>
      <p className="text-gray-300 leading-relaxed text-sm md:text-base">{phase.description}</p>
    </div>
    <div className="hidden lg:block lg:w-5/12" aria-hidden="true"></div>
  </div>
);

// DevelopmentJourney component
const DevelopmentJourney: React.FC<{ phases: DevelopmentPhase[] }> = ({ phases }) => (
  <section
    className="py-24 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden"
    aria-label="Marketing Journey"
  >
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
    </div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Our{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Marketing Journey
          </span>
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A data-driven process to transform your campaigns into high-ROI machines.
        </p>
      </div>
      <div className="relative max-w-5xl mx-auto">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full hidden lg:block"
          aria-hidden="true"
        />
        <div className="space-y-12" role="list">
          {phases.map((phase, index) => (
            <PhaseCard key={phase.step} phase={phase} index={index} isReversed={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
    <style jsx>{`
      :root {
        --pulse-duration: 2s;
        --slide-in-duration: 0.8s;
      }
      @keyframes slide-in {
        0% { opacity: 0; transform: translateY(50px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse-slow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
      .animate-slide-in { animation: slide-in var(--slide-in-duration) ease-out forwards; }
      .animate-pulse-slow { animation: pulse-slow var(--pulse-duration) infinite; }
      .animation-delay-1000 { animation-delay: 1s; }
      @media (max-width: 1024px) {
        .lg\\:flex-row-reverse, .lg\\:flex-row { flex-direction: column; }
        .lg\\:w-5\\/12 { width: 100%; }
        .lg\\:ml-12, .lg\\:mr-12 { margin-left: 0; margin-right: 0; }
      }
    `}</style>
  </section>
);

const PerformanceMarketingPage: React.FC<PerformanceMarketingPageProps> = ({ setCurrentPage }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const handleBackToHome = () => {
    setCurrentPage?.('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const openProject = (project: PortfolioProject) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Compacted with reduced text size and height */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-28">
  <div className="absolute inset-0">
    <img
      src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1920"
      alt="Performance Marketing"
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
  </div>
  <div className="absolute top-1/4 left-1/4 animate-float">
    <Target className="w-10 h-10 text-yellow-400/30" />
  </div>
  <div className="absolute top-1/3 right-1/4 animate-pulse">
    <BarChart2 className="w-8 h-8 text-yellow-400/20" />
  </div>
  <div className="absolute bottom-1/3 left-1/3 animate-bounce">
    <Rocket className="w-10 h-10 text-yellow-400/25" />
  </div>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="max-w-6xl mx-auto text-center text-white">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          <span className="text-white">Maximize ROI,</span>
          <br />
          <span className="text-yellow-400">Drive Conversions,</span>
          <br />
          <span className="text-white">and Scale Growth</span>
        </h1>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
          Struggling with <span className="text-yellow-400 font-semibold">low conversions</span> and wasted ad spend? Our performance marketing strategies optimize your campaigns, target the right audience, and turn clicks into customers.
        </p>
      </div>
      <div
        className="animate-fade-in-up grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1">3x</div>
          <p className="text-gray-300 text-xs">Conversion Rates</p>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1">70%</div>
          <p className="text-gray-300 text-xs">CTR Increase</p>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1">30%</div>
          <p className="text-gray-300 text-xs">ROI Improvement</p>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1">40%</div>
          <p className="text-gray-300 text-xs">Higher ROI</p>
        </div>
      </div>
      <div
        className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center"
        style={{ animationDelay: '0.6s' }}
      >
      
       
      </div>
    </div>
  </div>
</section>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-gray-100 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-red-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" />
              <span className="text-red-600 font-bold text-base sm:text-lg">CAMPAIGN CHALLENGES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              If These Sound Familiar, <span className="text-red-500">This Is For You</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your ad campaigns might be the reason for wasted budget, low conversions, poor ROI, or inconsistent sales.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
            {businessProblems.map((problem, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 border border-red-200/50">
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={problem.visual}
                      alt={problem.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 sm:p-8 relative">
                    <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-red-400/10 rounded-full blur-xl -translate-y-8 sm:-translate-y-12 translate-x-8 sm:translate-x-12"></div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
                    <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">{problem.description}</p>
                    <div className="bg-red-50 p-3 sm:p-4 mb-4 sm:mb-6 transition-transform">
                      <p className="text-red-800 font-bold text-center text-base sm:text-lg md:text-xl">{problem.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 text-white max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Take control of your ad performance today</h3>
              <p className="text-xl text-gray-300 mb-6">
                Reach out now, and let’s work together to build campaigns that deliver real results!
              </p>
              <button
                onClick={() => setCurrentPage?.('contact')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
                aria-label="Get Free Consultation Today"
              >
                Get Free Consultation Today!
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.15),transparent_70%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-lg">
              <Target className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              Now Imagine Having Campaigns That <span className="text-yellow-600">Truly Work for You</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Imagine ad campaigns that reach the right audience, maximize ROI, and turn every click into measurable business growth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200/50">
                  <div className="relative h-32 sm:h-40 flex items-center justify-center">
                    {solution.icon}
                  </div>
                  <div className="p-6 sm:p-8 relative text-center">
                    <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-green-400/10 rounded-full blur-xl -translate-y-8 sm:-translate-y-12 translate-x-8 sm:translate-x-12"></div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{solution.title}</h3>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">{solution.description}</p>
                    <div className="bg-green-50 p-3 sm:p-4 transition-transform mb-6">
                      <p className="text-green-800 font-bold text-center text-sm sm:text-base">{solution.result}</p>
                    </div>
                    <div className="space-y-2 sm:space-y-3 text-left pl-4">
                      {solution.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3 transition-transform">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <Globe className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-base sm:text-lg">MARKETING PLATFORMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Our Expertise in <span className="text-yellow-400">Performance Marketing</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              We specialize in performance marketing strategies that maximize ROI, drive qualified leads, and turn clicks into customers.
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex animate-slide-infinite space-x-6 sm:space-x-8">
                {techStacks.map((tech, index) => (
                  <div key={`first-${index}`} className="flex-shrink-0 group">
                    <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/20 bg-white">
                      <img src={tech.logo} alt={tech.name} className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 object-contain mb-2" loading="lazy" />
                      <span className="text-black font-bold text-xs sm:text-sm">{tech.name}</span>
                    </div>
                  </div>
                ))}
                {techStacks.map((tech, index) => (
                  <div key={`second-${index}`} className="flex-shrink-0 group">
                    <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/20 bg-white">
                      <img src={tech.logo} alt={tech.name} className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 object-contain mb-2" loading="lazy" />
                      <span className="text-black font-bold text-xs sm:text-sm">{tech.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <div className="text-center group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Monitor className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Search Ads</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Google Ads</p>
            </div>
            <div className="text-center group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Video Ads</h3>
              <p className="text-gray-300 text-xs sm:text-sm">YouTube, TikTok</p>
            </div>
            <div className="text-center group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Social Ads</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Facebook, Instagram</p>
            </div>
            <div className="text-center group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <RefreshCw className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Retargeting</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Google, Facebook</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Let Our Projects <span className="text-yellow-600">Speak for Themselves</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Our clients' success is a testament to our commitment to delivering outstanding results</p>
          </div>
          <div className="relative max-w-6xl mx-auto" role="region" aria-label="Project slider">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {portfolioProjects.map((project, index) => (
                  <div key={project.id} className="w-full flex-shrink-0">
                    <div
                      className="bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer group"
                      onClick={() => openProject(project)}
                      role="button"
                      aria-label={`View project: ${project.title}`}
                    >
                      <div className="grid lg:grid-cols-2 gap-0">
                        <div className="relative overflow-hidden h-64 sm:h-80 lg:h-auto">
                          <img
                            src={project.images[0]}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                            <div className="bg-yellow-400 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm">
                              {project.category}
                            </div>
                          </div>
                        </div>
                        <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">{project.title}</h3>
                          <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">{project.description}</p>
                          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            {project.results.map((result, resultIndex) => (
                              <div key={resultIndex} className="text-center bg-green-50 rounded-xl p-3 sm:p-4">
                                <div className="text-lg sm:text-xl font-bold text-green-600">{result.split(' ')[0]}</div>
                                <div className="text-xs sm:text-sm text-green-700">{result.split(' ').slice(1).join(' ')}</div>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? portfolioProjects.length - 1 : prev - 1))}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-12 sm:w-14 h-12 sm:h-14 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors z-10"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 sm:w-7 h-6 sm:h-7" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % portfolioProjects.length)}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-12 sm:w-14 h-12 sm:h-14 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors z-10"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 sm:w-7 h-6 sm:h-7" />
            </button>
            <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
              {portfolioProjects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-yellow-400 w-8 sm:w-12' : 'bg-gray-300'
                  }`}
                  aria-label={`View project ${index + 1}: ${project.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <DevelopmentJourney phases={developmentProcess} />
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,195,75,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Our <span className="text-yellow-400">Clients Speak for Us</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">Feedback from businesses transformed by our campaigns</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 border border-yellow-400/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-yellow-400/10 rounded-full -translate-y-16 sm:-translate-y-20 translate-x-16 sm:translate-x-20"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center mb-6 sm:mb-8">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6 sm:md:mr-8 border-4 border-yellow-400"
                  />
                  <div className="text-center md:text-left">
                    <h4 className="text-xl sm:text-2xl font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-yellow-400 text-base sm:text-lg">{testimonials[currentTestimonial].position}</p>
                    <p className="text-gray-400 text-sm sm:text-base">{testimonials[currentTestimonial].company}</p>
                    <div className="flex justify-center md:justify-start space-x-1 mt-2">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed italic text-center">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
              </div>
            </div>
            <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-yellow-400 w-8 sm:w-12' : 'bg-gray-600'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              No Payment <span className="text-yellow-600">Until You Love the Results</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Tailored marketing services with guaranteed performance</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl border overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                  plan.popular
                    ? 'border-yellow-400 transform scale-100 sm:scale-105 hover:scale-105 sm:hover:scale-110'
                    : 'border-gray-200 hover:border-yellow-200 transform hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm">
                        MOST POPULAR
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-yellow-400/10 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
                  </>
                )}
                <div
                  className={`p-6 sm:p-8 relative z-10 ${plan.popular ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : ''}`}
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{plan.description}</p>
                    <div className="mb-3 sm:mb-4">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-base sm:text-lg md:text-xl text-gray-500 line-through ml-2 sm:ml-3">{plan.originalPrice}</span>
                      )}
                    </div>
                    {plan.savings && (
                      <div className="bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold inline-block mb-2">
                        {plan.savings}
                      </div>
                    )}
                    <div className="text-gray-600 font-medium text-sm sm:text-base">{plan.duration}</div>
                  </div>
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-600 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => window.open('https://wa.me/923138372573', '_blank')}
                    className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg hover:shadow-yellow-400/30'
                        : 'bg-black text-yellow-400 hover:bg-gray-900 border-2 border-yellow-400'
                    }`}
                    aria-label={plan.price === "Let's Discuss" ? 'Contact Sales' : 'Get Started'}
                  >
                    <span>{plan.price === "Let's Discuss" ? 'Contact Sales' : 'Get Started'}</span>
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              Ready to <span className="text-yellow-400">Maximize Your Ad Performance?</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
              Transform your campaigns with data-driven strategies that drive conversions and boost ROI. Let’s make every click count.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button
                onClick={() => setCurrentPage?.('contact')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                aria-label="Start Your Campaign"
              >
                <Rocket className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>Start Your Campaign</span>
              </button>
              <button
                onClick={() => setCurrentPage?.('portfolio')}
                className="border-3 border-yellow-400 text-yellow-400 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center space-x-3"
                aria-label="View Campaign Portfolio"
              >
                <Eye className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>View Campaign Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={closeModal} role="dialog" aria-labelledby="modal-title">
          <div
            className="bg-white p-6 sm:p-8 rounded-3xl max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              aria-label="Close modal"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
            <h3 id="modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">{selectedProject.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {selectedProject.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedProject.title} image ${index + 1}`}
                  className="w-full h-48 sm:h-64 object-cover rounded-xl"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-gray-600 mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed">{selectedProject.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
              {selectedProject.results.map((result, index) => (
                <div key={index} className="text-center bg-green-50 rounded-xl p-3 sm:p-4">
                  <div className="text-lg sm:text-xl font-bold text-green-600">{result.split(' ')[0]}</div>
                  <div className="text-xs sm:text-sm text-green-700">{result.split(' ').slice(1).join(' ')}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
              {selectedProject.tech.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMarketingPage;