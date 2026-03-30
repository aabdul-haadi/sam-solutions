import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  TrendingUp,
  Target,
  CheckCircle,
  BarChart3,

  Eye,
  Star,
  Rocket,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  
  AlertTriangle,
  Zap,
  RefreshCw,
 
  Image,
  Settings,
} from 'lucide-react';

interface SEOContentPageProps {
  setCurrentPage?: (page: string) => void;
}

// Define interfaces for type safety
interface SEOProblem {
  title: string;
  description: string;
  impact: string;
  visual: string;
  stat: string;
  statLabel: string;
}

interface SEOSolution {
  icon: React.ReactNode;
  title: string;
  description: string;
  result: string;
  features: string[];
  stat: string;
  statLabel: string;
}

interface SEOTool {
  name: string;
  logo: string;
  category: string;
  color: string;
}

interface PortfolioProject {
  id: number;
  title: string;
  images: string[];
  description: string;
  results: string[];
  metrics: string[];
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

interface ProcessPhase {
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

// Skeleton Loading Component
const SkeletonCard: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

// Lazy Loading Image Component
const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loadingClassName?: string;
}> = ({ src, alt, className = '', loadingClassName = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const imgElement = document.getElementById(`lazy-img-${src.slice(-10)}`);
    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <div id={`lazy-img-${src.slice(-10)}`} className={`relative ${className}`}>
      {!isLoaded && (
        <div className={`animate-pulse bg-gray-200 ${loadingClassName || className}`}></div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

// Data definitions
const seoProblems: SEOProblem[] = [
  {
    title: 'Poor Keyword Optimization',
    description: 'Using the wrong or missing keywords can hurt your search rankings.',
    impact: '90% of pages don\'t get any organic traffic due to poor keyword optimization.',
    visual: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800',
    stat: '90%',
    statLabel: 'Pages get no organic traffic'
  },
  {
    title: 'Outdated Content',
    description: 'Not updating content regularly can lead to lower rankings and traffic.',
    impact: '61% of marketers say updating old content boosts SEO.',
    visual: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    stat: '61%',
    statLabel: 'Need content updates for better SEO'
  },
  {
    title: 'No Internal Linking',
    description: 'Lack of internal links reduces SEO and navigation quality.',
    impact: '61% of marketers report improved SEO with internal linking.',
    visual: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
    stat: '61%',
    statLabel: 'Improved SEO with proper linking'
  },
  {
    title: 'Duplicate Content',
    description: 'Duplicate content can result in search engine penalties.',
    impact: '29% of websites have duplicate content affecting SEO.',
    visual: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    stat: '29%',
    statLabel: 'Websites suffer from duplicate content'
  }
];

const seoSolutions: SEOSolution[] = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Effective Keyword Strategy',
    description: 'Proper keyword research and optimization can boost search rankings.',
    result: '90% of pages see a significant traffic increase with proper keyword targeting.',
    features: ['Comprehensive keyword research', 'Competitor analysis', 'Long-tail keyword optimization', 'Search intent mapping'],
    stat: '90%',
    statLabel: 'Traffic Increase'
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: 'Regular Content Updates',
    description: 'Refreshing content regularly keeps your site relevant and improves SEO.',
    result: '61% of marketers report higher rankings after updating old content.',
    features: ['Content audit & analysis', 'Regular content refresh', 'Trending topic integration', 'Content performance tracking'],
    stat: '61%',
    statLabel: 'Higher Rankings'
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'High-Quality, In-Depth Content',
    description: 'Focus on detailed, valuable content to improve rankings and engagement.',
    result: '41% of marketers say longer, in-depth content performs better in search results.',
    features: ['In-depth content creation', 'Expert topic coverage', 'User engagement focus', 'Authority building'],
    stat: '41%',
    statLabel: 'Better Performance'
  },
  {
    icon: <Image className="w-8 h-8" />,
    title: 'Optimized Image Use',
    description: 'Adding alt text to images helps search engines index them and improves SEO.',
    result: '25% of websites improve rankings with properly optimized images.',
    features: ['Image optimization', 'Alt text implementation', 'Schema markup', 'Visual search optimization'],
    stat: '25%',
    statLabel: 'Ranking Improvement'
  }
];

const seoTools: SEOTool[] = [
  { name: 'SEMrush', logo: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'SEO Analysis', color: 'from-orange-400 to-orange-600' },
  { name: 'Ahrefs', logo: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'Backlink Analysis', color: 'from-blue-400 to-blue-600' },
  { name: 'Yoast SEO', logo: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'On-Page SEO', color: 'from-green-400 to-green-600' },
  { name: 'Moz', logo: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'SEO Tools', color: 'from-blue-500 to-blue-700' },
  { name: 'Google Analytics', logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'Analytics', color: 'from-orange-500 to-red-500' },
  { name: 'Grammarly', logo: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'Writing', color: 'from-green-500 to-green-700' },
  { name: 'Surfer SEO', logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'Content Optimization', color: 'from-teal-400 to-teal-600' },
  { name: 'BuzzSumo', logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'Content Research', color: 'from-purple-400 to-purple-600' },
  { name: 'ProWritingAid', logo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'Writing Assistant', color: 'from-red-400 to-red-600' },
  { name: 'AnswerThePublic', logo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'Question Research', color: 'from-indigo-400 to-indigo-600' },
  { name: 'Hemingway Editor', logo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'Writing Tools', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Copy.ai', logo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', category: 'AI Writing', color: 'from-pink-400 to-pink-600' },
];

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'E-commerce SEO Success',
    images: [
      'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Complete SEO overhaul for online retail business resulting in dramatic organic traffic growth.',
    results: ['+400% organic traffic', '+250% keyword rankings', '+180% conversion rate'],
    metrics: ['300+ keywords ranking', '85% page 1 rankings', '92% traffic retention'],
    category: 'E-commerce SEO',
  },
  {
    id: 2,
    title: 'Local Business SEO',
    images: [
      'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Local SEO strategy that dominated local search results and increased foot traffic.',
    results: ['+350% local visibility', '+200% phone calls', '+150% store visits'],
    metrics: ['15+ local keywords #1', '95% Google My Business score', '4.8/5 review rating'],
    category: 'Local SEO',
  },
  {
    id: 3,
    title: 'Content Marketing Success',
    images: [
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Strategic content marketing campaign that established thought leadership and drove qualified leads.',
    results: ['+500% blog traffic', '+300% social shares', '+250% lead generation'],
    metrics: ['50+ high-quality articles', '100K+ monthly readers', '80% engagement rate'],
    category: 'Content Marketing',
  },
  {
    id: 4,
    title: 'Technical SEO Audit',
    images: [
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Comprehensive technical SEO audit and implementation that fixed critical issues.',
    results: ['+200% site speed', '+150% crawlability', '+180% indexation'],
    metrics: ['Zero technical errors', '95+ PageSpeed score', '100% mobile-friendly'],
    category: 'Technical SEO',
  }
];

const testimonials: Testimonial[] = [
  {
    name: 'Sarah',
    position: 'Owner',
    company: 'Sparkle Boutique',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'SAM Creatives transformed our website and increased our conversions significantly. Highly recommend!',
    rating: 5,
  },
  {
    name: 'David',
    position: 'CEO',
    company: 'Tech Innovations',
    image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'The team at SAM Creatives was professional and delivered a fantastic website. We\'ve seen a noticeable increase in traffic!',
    rating: 5,
  },
  {
    name: 'Emily',
    position: 'Founder',
    company: 'Urban Essentials',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'I\'m thrilled with our new site. It looks great and functions even better. Thank you, SAM Creatives!',
    rating: 5,
  },
  {
    name: 'James',
    position: 'Marketing Director',
    company: 'GreenTech Solutions',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'SAM Creatives took our website to the next level. It\'s more engaging, and our customer retention has improved.',
    rating: 5,
  },
  {
    name: 'Lisa',
    position: 'Owner',
    company: 'Bella\'s Bakery',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Thanks to their expertise, our site is more efficient and user-friendly. We\'ve seen better engagement!',
    rating: 5,
  },
  {
    name: 'Michael',
    position: 'Founder',
    company: 'Lifestyle Apparel Co.',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Our website now reflects our brand perfectly. SAM Creatives understood our needs and delivered beyond expectations.',
    rating: 5,
  },
];

const seoProcess: ProcessPhase[] = [
  {
    step: '01',
    title: 'SEO Audit & Analysis',
    description: 'Comprehensive analysis of your current SEO performance, competitor research, and opportunity identification',
    icon: <Search className="w-8 h-8" />,
    duration: '1-2 weeks',
  },
  {
    step: '02',
    title: 'Strategy Development',
    description: 'Create custom SEO and content strategy based on your business goals and target audience',
    icon: <Target className="w-8 h-8" />,
    duration: '1 week',
  },
  {
    step: '03',
    title: 'Implementation & Optimization',
    description: 'Execute SEO improvements, create optimized content, and implement technical fixes',
    icon: <Settings className="w-8 h-8" />,
    duration: '4-8 weeks',
  },
  {
    step: '04',
    title: 'Monitoring & Reporting',
    description: 'Track performance, analyze results, and continuously optimize for better rankings',
    icon: <BarChart3 className="w-8 h-8" />,
    duration: 'Ongoing',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'SEO Starter',
    price: '$899',
    originalPrice: '$1,200',
    duration: 'Per month',
    description: 'Perfect for small businesses looking to establish their online presence.',
    features: [
      'Keyword research & strategy',
      'On-page optimization',
      'Technical SEO audit',
      'Content optimization',
      'Monthly reporting',
      'Basic link building',
    ],
    popular: false,
    savings: 'Save 25%',
  },
  {
    name: 'SEO Professional',
    price: '$1,899',
    originalPrice: '$2,400',
    duration: 'Per month',
    description: 'Comprehensive SEO solution for growing businesses seeking market dominance.',
    features: [
      'Everything in Starter',
      'Advanced keyword targeting',
      'Content creation (4 articles/month)',
      'Link building campaigns',
      'Local SEO optimization',
      'Conversion optimization',
      'Dedicated SEO manager',
      'Bi-weekly strategy calls',
      'Priority support',
    ],
    popular: true,
    savings: 'Save 21%',
  },
  {
    name: 'SEO Enterprise',
    price: 'Custom',
    originalPrice: '',
    duration: 'Tailored solutions',
    description: 'Enterprise-level SEO and content marketing for large organizations.',
    features: [
      'Everything in Professional',
      'Custom SEO strategy',
      'Unlimited content creation',
      'Advanced analytics & reporting',
      'Multi-location SEO',
      'Brand reputation management',
      'Dedicated team of experts',
      'Weekly strategy sessions',
    ],
    popular: false,
    savings: 'Customized for You',
  },
];

// Reusable PhaseCard component
const PhaseCard: React.FC<{
  phase: ProcessPhase;
  index: number;
  isReversed: boolean;
}> = ({ phase, index, isReversed }) => (
  <div
    className={`relative flex flex-col lg:flex-row items-center gap-8 transition-all duration-700 ease-out ${
      isReversed ? 'lg:flex-row-reverse' : ''
    } animate-slide-in`}
    style={{ animationDelay: `${index * 0.3}s` }}
    role="listitem"
    aria-labelledby={`phase-title-${index}`}
  >
    {/* Timeline Dot */}
    <div
      className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full lg:block hidden z-10 animate-pulse"
      aria-hidden="true"
    />

    {/* Card */}
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

    {/* Empty Spacer for Alignment */}
    <div className="hidden lg:block lg:w-5/12" aria-hidden="true"></div>
  </div>
);

// SEOJourney component
const SEOJourney: React.FC<{ phases: ProcessPhase[] }> = ({ phases }) => (
  <section
    className="py-24 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden"
    aria-label="SEO Process Journey"
  >
    {/* Background Decorative Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      {/* Header Section */}
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Our{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            SEO Process
          </span>
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A proven methodology that transforms your online visibility and drives sustainable growth.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central Timeline Line */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full hidden lg:block"
          aria-hidden="true"
        />

        <div className="space-y-12" role="list">
          {phases.map((phase, index) => (
            <PhaseCard
              key={phase.step}
              phase={phase}
              index={index}
              isReversed={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const SEOContentPage: React.FC<SEOContentPageProps> = ({ setCurrentPage }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const handleBackToHome = () => {
    if (setCurrentPage) {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const openProject = (project: PortfolioProject) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Compacted with reduced height, no back button */}
      <section className="relative flex items-center justify-center overflow-hidden py-16 sm:py-20">
  <div className="absolute inset-0">
    <LazyImage
      src="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1920"
      alt="SEO and Content Marketing"
      className="w-full h-full object-cover"
      loadingClassName="w-full h-full"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
  </div>

  {/* Floating Elements - Compacted sizes */}
  <div className="absolute top-1/4 left-1/4 animate-float">
    <Search className="w-10 h-10 text-yellow-400/30" />
  </div>
  <div className="absolute top-1/3 right-1/4 animate-pulse">
    <TrendingUp className="w-8 h-8 text-yellow-400/20" />
  </div>
  <div className="absolute bottom-1/3 left-1/3 animate-bounce">
    <Target className="w-8 h-8 text-yellow-400/25" />
  </div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="max-w-6xl mx-auto text-center text-white pt-8 sm:pt-12 md:pt-16">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          <span className="text-white">Struggling with Low Traffic</span>
          <br />
          <span className="text-yellow-400">and Poor Rankings?</span>
        </h1>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 max-w-4xl mx-auto leading-relaxed">
          If your site isn't ranking high or driving traffic, you're missing out on potential sales. Our{' '}
          <span className="text-yellow-400 font-semibold">custom SEO strategies</span> are designed to{' '}
          <span className="text-yellow-400 font-semibold">improve search rankings</span>, boost organic traffic, and convert visitors into customers.
        </p>
      </div>

      {/* Stats Row - Compacted */}
      <div
        className="animate-fade-in-up grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-0.5">400%</div>
          <p className="text-gray-300 text-xs">Traffic Increase</p>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-0.5">250%</div>
          <p className="text-gray-300 text-xs">Ranking Improvement</p>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-0.5">180%</div>
          <p className="text-gray-300 text-xs">Lead Generation</p>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-0.5">92%</div>
          <p className="text-gray-300 text-xs">Client Retention</p>
        </div>
      </div>

      {/* CTAs REMOVED */}
    </div>
  </div>
</section>

      {/* Business Problems Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-gray-100 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-red-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" />
              <span className="text-red-600 font-bold text-base sm:text-lg">IF THESE SOUND FAMILIAR, THIS IS FOR YOU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              The Content on Your Website Might Be the <span className="text-red-500">Problem</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Poor content strategy leads to low traffic, poor engagement, high bounce rates, or abandoned conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
            {seoProblems.map((problem, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 border border-red-200/50 hover:shadow-xl hover:border-red-300">
                  {/* Visual */}
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <LazyImage
                      src={problem.visual}
                      alt={`SEO Problem: ${problem.title}`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loadingClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent"></div>
                   
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 relative">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{problem.title}</h3>
                    <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{problem.description}</p>
                    <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-red-800 font-medium text-sm sm:text-base">{problem.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="block">Take Control of Your Rankings Right Now!</span>
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl mb-10 max-w-3xl mx-auto leading-snug">
            Reach out today, and let's work together to create a site that drives results!
          </p>
          <button
            onClick={() => setCurrentPage && setCurrentPage('contact')}
            className="bg-yellow-400 text-black px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center space-x-3 mx-auto shadow-lg hover:shadow-xl"
          >
            <Rocket className="w-6 h-6" />
            <span>Get Free Consultation Today!</span>
          </button>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-lg">
              <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
              <span className="text-green-600 font-bold text-base sm:text-lg">NOW IMAGINE HAVING SEO THAT TRULY WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              Imagine Your Website <span className="text-yellow-600">Ranking at the Top</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Consistently driving organic traffic and converting visitors into loyal customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {seoSolutions.map((solution, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200/50 hover:shadow-xl transition-all duration-500">
                  
                  {/* Icon */}
                  <div className="relative h-32 sm:h-40 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white">
                      {solution.icon}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 relative text-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{solution.title}</h3>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">{solution.description}</p>


                    <div className="bg-green-50 p-3 sm:p-4 transition-transform mb-6 rounded-lg">
                      <p className="text-green-800 font-bold text-center text-sm sm:text-base">
                        {solution.result}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 sm:space-y-3 text-left">
                      {solution.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3 transition-transform"
                        >
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
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

      {/* Tools Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <Settings className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-base sm:text-lg">OUR EXPERTISE IN SEO & CONTENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Powered by <span className="text-yellow-400">Industry-Leading Tools</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              We use the most advanced SEO and content creation tools to deliver exceptional results
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex animate-slide-infinite space-x-6 sm:space-x-8">
                {seoTools.map((tool, index) => (
                  <div key={`first-${index}`} className="flex-shrink-0 group">
                    <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/20 bg-white">
                      <div className="w-12 sm:w-14 md:w-16 h-12 sm:w-14 md:h-16 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{tool.name.slice(0, 3)}</span>
                      </div>
                      <span className="text-black font-bold text-xs sm:text-sm text-center px-2">{tool.name}</span>
                    </div>
                  </div>
                ))}
                {seoTools.map((tool, index) => (
                  <div key={`second-${index}`} className="flex-shrink-0 group">
                    <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/20 bg-white">
                      <div className="w-12 sm:w-14 md:w-16 h-12 sm:w-14 md:h-16 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{tool.name.slice(0, 3)}</span>
                      </div>
                      <span className="text-black font-bold text-xs sm:text-sm text-center px-2">{tool.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <div className="text-center group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">SEO Tools</h3>
              <p className="text-gray-300 text-xs sm:text-sm">SEMrush, Ahrefs, Moz</p>
            </div>
            <div className="text-center group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Content Tools</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Grammarly, Copy.ai, Surfer</p>
            </div>
            <div className="text-center group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Analytics</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Google Analytics, Search Console</p>
            </div>
            <div className="text-center group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Research</h3>
              <p className="text-gray-300 text-xs sm:text-sm">BuzzSumo, Answer The Public</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Let Our Projects <span className="text-yellow-600">Speak for Themselves</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Our clients' success is a testament to our commitment to delivering outstanding results</p>
          </div>

          {/* Project Slider */}
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
                          <LazyImage
                            src={project.images[0]}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loadingClassName="w-full h-full"
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

                          {/* Results Grid */}
                          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            {project.results.map((result, resultIndex) => (
                              <div key={resultIndex} className="text-center bg-green-50 rounded-xl p-3 sm:p-4">
                                <div className="text-lg sm:text-xl font-bold text-green-600">{result.split(' ')[0]}</div>
                                <div className="text-xs sm:text-sm text-green-700">{result.split(' ').slice(1).join(' ')}</div>
                              </div>
                            ))}
                          </div>

                          {/* Metrics */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.metrics.map((metric, metricIndex) => (
                              <span
                                key={metricIndex}
                                className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                              >
                                {metric}
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

            {/* Slider Controls */}
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

            {/* Slider Indicators */}
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

      {/* SEO Journey Section */}
      <SEOJourney phases={seoProcess} />

      {/* Client Testimonials */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,195,75,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Our <span className="text-yellow-400">Clients</span> Speak for Us
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">Real feedback from businesses we've transformed</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 border border-yellow-400/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-yellow-400/10 rounded-full -translate-y-16 sm:-translate-y-20 translate-x-16 sm:translate-x-20"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center mb-6 sm:mb-8">
                  <LazyImage
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6 sm:md:mr-8 border-4 border-yellow-400"
                    loadingClassName="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gray-200"
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

      {/* Pricing Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              SEO & Content <span className="text-yellow-600">Pricing</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Comprehensive SEO packages that deliver measurable results</p>
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
                  >
                    <span>{plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}</span>
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Payment Until You Love Results Section */}
          <div className="mt-16 sm:mt-20 text-center">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border border-green-200">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                No Payment Until You <span className="text-green-600">Love the Results</span>
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                We're so confident in our SEO and content strategies that we guarantee results. You only pay when you see measurable improvements in your rankings, traffic, and conversions.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">30 Days</div>
                  <p className="text-green-700">Free trial period</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                  <p className="text-green-700">Satisfaction guarantee</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">Zero</div>
                  <p className="text-green-700">Upfront payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              Ready to <span className="text-yellow-400">Dominate Search Rankings?</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
              Get your free SEO audit and discover how we can increase your organic traffic and conversions. 
              Start seeing results in 30 days or your money back.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button
                onClick={() => setCurrentPage && setCurrentPage('contact')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              >
                <Search className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>Get Free SEO Audit</span>
              </button>
              <button
                onClick={() => setCurrentPage && setCurrentPage('portfolio')}
                className="border-3 border-yellow-400 text-yellow-400 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center space-x-3"
              >
                <Eye className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>View More Case Studies</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={closeModal}>
          <div
            className="bg-white p-6 sm:p-8 rounded-3xl max-w-4xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              aria-label="Close modal"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">{selectedProject.title}</h3>
            <div className="flex justify-center">
              <LazyImage
                src={selectedProject.images[0]}
                alt={`${selectedProject.title} main image`}
                className="max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl"
                loadingClassName="max-h-[60vh] sm:max-h-[70vh] w-full bg-gray-200 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slide-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-slide-infinite {
          animation: slide-infinite 30s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        @media (max-width: 1024px) {
          .lg\\:flex-row-reverse,
          .lg\\:flex-row {
            flex-direction: column;
          }
          .lg\\:w-5\\/12 {
            width: 100%;
          }
          .lg\\:ml-12,
          .lg\\:mr-12 {
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SEOContentPage;