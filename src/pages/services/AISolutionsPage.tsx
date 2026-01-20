import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Code,
  Globe,
  CheckCircle,
  TrendingUp,
  Rocket,
  Target,
  Eye,
  Star,
  Monitor,
  Database,
  Server,
  Palette,
  Settings,
  ChevronRight,
  ChevronLeft,
  X,
  Cpu,
  Workflow,
  Shield,
  Layers,
} from 'lucide-react';

interface AIAutomationPageProps {
  setCurrentPage?: (page: string) => void;
}

// Define interfaces for type safety
interface TechStack {
  name: string;
  logo: string;
  color: string;
}

interface BusinessProblem {
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
  { name: 'n8n', logo: 'https://simpleicons.org/icons/n8n.svg', color: 'from-blue-400 to-blue-600' },
  { name: 'Zapier', logo: 'https://simpleicons.org/icons/zapier.svg', color: 'from-orange-400 to-orange-600' },
  { name: 'Make', logo: 'https://simpleicons.org/icons/make.svg', color: 'from-purple-400 to-purple-600' },
  { name: 'Node-RED', logo: 'https://simpleicons.org/icons/nodered.svg', color: 'from-pink-400 to-pink-600' },
  // { name: 'Stack AI', logo: 'https://simpleicons.org/icons/stackai.svg', color: 'from-cyan-400 to-cyan-600' },
  // { name: 'Dify AI', logo: 'https://simpleicons.org/icons/dify.svg', color: 'from-teal-400 to-teal-600' },
  { name: 'Anthropic', logo: 'https://simpleicons.org/icons/anthropic.svg', color: 'from-yellow-400 to-yellow-600' },
];

const businessProblems: BusinessProblem[] = [
  {
    description: 'Manual processes waste 40% of employee time on repetitive tasks',
    impact: '$1.8T lost annually in productivity across global businesses',
    visual: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    description: 'Siloed data systems lead to 35% error rates in decision-making',
    impact: 'Missed opportunities costing businesses $500B yearly',
    visual: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    description: 'Lack of automation exposes 47% of companies to compliance risks',
    impact: 'Average fine for data breaches: $4.5M per incident',
    visual: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const solutions: Solution[] = [
  {
    icon: <Cpu className="w-24 h-24 text-blue-500" />,
    title: 'Seamless AI Integration',
    description: 'Connect AI models with workflows using n8n for intelligent automation.',
    result: '50% faster processing and 40% improved accuracy in tasks.',
    features: ['Drag-n-drop AI nodes', 'LLM integration', 'Data validation', 'Error handling'],
    metric: '40%',
    metricLabel: 'Accuracy Boost',
  },
  {
    icon: <Workflow className="w-24 h-24 text-green-500" />,
    title: 'Workflow Optimization',
    description: 'Streamline processes with visual builders and custom logic.',
    result: '65% reduction in manual work and 30% productivity increase.',
    features: ['Trigger-based automation', 'Multi-app integration', 'Real-time monitoring', 'Scalable designs'],
    metric: '30%',
    metricLabel: 'Productivity Increase',
  },
  {
    icon: <Shield className="w-24 h-24 text-red-500" />,
    title: 'Secure Data Handling',
    description: 'Implement best practices for data privacy and compliance.',
    result: 'Reduced risk by 55% with encrypted flows and audit logs.',
    features: ['Clean data pipelines', 'Ethics frameworks', 'Access controls', 'Compliance checks'],
    metric: '55%',
    metricLabel: 'Risk Reduction',
  },
  {
    icon: <Layers className="w-24 h-24 text-purple-500" />,
    title: 'Scalable Automation',
    description: 'Build extensible systems aligned with business goals.',
    result: '75% faster scaling and 25% cost savings.',
    features: ['High-impact process selection', 'Continuous optimization', 'Predictive analytics', 'Business-led approach'],
    metric: '25%',
    metricLabel: 'Cost Savings',
  },
];

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'AI-Powered Lead Generation Workflow',
    images: [
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Automated lead capture from web forms, enrichment with AI, and CRM integration using n8n.',
    results: ['+250% lead quality', '+35% conversion rate', '24/7 operation'],
    tech: ['n8n', 'OpenAI', 'HubSpot', 'Google Sheets'],
    category: 'AI Automation',
  },
  {
    id: 2,
    title: 'Content Creation Automation System',
    images: [
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'AI-generated content workflows with approval loops and social media publishing via n8n-like tools.',
    results: ['3x content output', 'Reduced errors by 40%', 'Seamless multi-platform posting'],
    tech: ['n8n', 'GPT-4', 'Buffer', 'WordPress'],
    category: 'AI Automation',
  },
  {
    id: 3,
    title: 'Inventory Management Automation',
    images: [
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Real-time stock monitoring, predictive reordering, and alerts using n8n integrations.',
    results: ['Reduced stockouts by 60%', 'Optimized inventory costs', 'Automated reporting'],
    tech: ['n8n', 'Shopify', 'Google Analytics', 'Slack'],
    category: 'AI Automation',
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Alex',
    position: 'CTO',
    company: 'TechFlow Inc.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'The AI automation transformed our operations. Efficiency skyrocketed!',
    rating: 5,
  },
  {
    name: 'Jordan',
    position: 'Operations Manager',
    company: 'AutoBiz Solutions',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Best practices implemented flawlessly. Our workflows are now seamless and scalable.',
    rating: 5,
  },
  {
    name: 'Taylor',
    position: 'Founder',
    company: 'SmartAutomate',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'n8n integration was a game-changer. Highly recommend for AI-driven automation.',
    rating: 5,
  },
];

const developmentProcess: DevelopmentPhase[] = [
  {
    step: '01',
    title: 'Discovery & Process Mapping',
    description: 'Analyze business needs, identify automation opportunities, and map workflows with focus on clean data and high-impact areas.',
    icon: <Target className="w-8 h-8" />,
    duration: '1-2 weeks',
  },
  {
    step: '02',
    title: 'Design & Tool Selection',
    description: 'Design automations using n8n or similar, incorporate AI nodes, ensure ethics and data quality.',
    icon: <Palette className="w-8 h-8" />,
    duration: '2-3 weeks',
  },
  {
    step: '03',
    title: 'Implementation & Testing',
    description: 'Build, integrate, and rigorously test automations with real-time monitoring and error handling.',
    icon: <Code className="w-8 h-8" />,
    duration: '3-6 weeks',
  },
  {
    step: '04',
    title: 'Deployment & Optimization',
    description: 'Launch, monitor performance, and continuously optimize using predictive analytics and business feedback.',
    icon: <Rocket className="w-8 h-8" />,
    duration: 'Ongoing',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic Automation Setup',
    price: '$500',
    originalPrice: '$800',
    duration: '1-2 weeks',
    description: 'Simple workflows with n8n for small businesses.',
    features: [
      'Up to 5 workflows',
      'Basic integrations',
      'AI node setup',
      'Testing & deployment',
      '1 month support',
    ],
    popular: false,
    savings: 'Save 38%',
  },
  {
    name: 'Standard AI Automation',
    price: '$1,500',
    originalPrice: '$2,000',
    duration: '2-4 weeks',
    description: 'Comprehensive automations with advanced features.',
    features: [
      'Up to 20 workflows',
      'Custom AI agents',
      'Multi-tool integration',
      'Performance optimization',
      'Compliance checks',
      '3 months support',
      'Training session',
    ],
    popular: true,
    savings: 'Save 25%',
  },
  {
    name: 'Enterprise Custom Automation',
    price: "Let's Discuss",
    originalPrice: '',
    duration: 'Timeline varies',
    description: 'Fully scalable AI automation solutions.',
    features: [
      'Unlimited workflows',
      'Advanced AI & ML integration',
      'Dedicated support',
      'Custom development',
      'Ongoing maintenance',
    ],
    popular: false,
    savings: 'Tailored Pricing',
  },
];

// Reusable PhaseCard component for Development Journey
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
    aria-label="Automation Journey"
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
            AI Automation Journey
          </span>
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A structured process that automates your operations with n8n-like tools and best practices.
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

const AIAutomationPage: React.FC<AIAutomationPageProps> = ({ setCurrentPage }) => {
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
<div className="min-h-screen bg-white">      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="AI Automation"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Code className="w-16 h-16 text-yellow-400/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse">
          <Globe className="w-12 h-12 text-yellow-400/20" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce">
          <Rocket className="w-14 h-14 text-yellow-400/25" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={handleBackToHome}
            className="absolute top-8 left-4 flex items-center text-white/80 hover:text-yellow-400 transition-colors group"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
                <Code className="w-6 h-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-lg">AI AUTOMATION EXCELLENCE</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="text-white">Intelligent Automations,</span>
                <br />
                <span className="text-yellow-400">Powered by AI</span>
                <br />
                <span className="text-white">to Supercharge Efficiency</span>
              </h1>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Overwhelmed by repetitive tasks? Our <span className="text-yellow-400 font-semibold">AI-driven automations</span> streamline operations, reduce errors, and boost productivity.
              </p>
            </div>
            <div
              className="animate-fade-in-up grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">250%</div>
                <p className="text-gray-300 text-sm sm:text-base">Efficiency Increase</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">60%</div>
                <p className="text-gray-300 text-sm sm:text-base">Cost Reduction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">99%</div>
                <p className="text-gray-300 text-sm sm:text-base">Uptime Guarantee</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">95%</div>
                <p className="text-gray-300 text-sm sm:text-base">Client Satisfaction</p>
              </div>
            </div>
            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
              style={{ animationDelay: '0.6s' }}
            >
              <button
                onClick={() => setCurrentPage?.('contact')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                aria-label="Start Your Automation"
              >
                <Rocket className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>Start Your Automation</span>
              </button>
              <button
                onClick={() => setCurrentPage?.('portfolio')}
                className="border-3 border-yellow-400 text-yellow-400 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center space-x-3"
                aria-label="View Portfolio"
              >
                <Eye className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>View Portfolio</span>
              </button>
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
              <span className="text-red-600 font-bold text-base sm:text-lg">BUSINESS CHALLENGES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              The <span className="text-red-500">Hidden Costs</span> of Manual Processes
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Without AI automation, businesses face inefficiencies, errors, and lost opportunities. Here's the reality:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
            {businessProblems.map((problem, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 border border-red-200/50">
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={problem.visual}
                      alt={`Problem ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 sm:p-8 relative">
                    <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-red-400/10 rounded-full blur-xl -translate-y-8 sm:-translate-y-12 translate-x-8 sm:translate-x-12"></div>
                    <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                      {problem.description}
                    </p>
                    <div className="bg-red-50 p-3 sm:p-4 mb-4 sm:mb-6 transition-transform">
                      <p className="text-red-800 font-bold text-center text-base sm:text-lg md:text-xl">
                        {problem.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.4),transparent_70%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="block">End Manual Drudgery!</span>
            <span className="block text-yellow-400">Ignite AI-Powered Growth!</span>
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl mb-10 max-w-3xl mx-auto leading-snug">
            Transform inefficiencies into intelligent automations with n8n and best practices. Boost productivity, reduce costs, and scale effortlessly!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button
              onClick={() => setCurrentPage?.('contact')}
              className="bg-yellow-400 text-black px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              aria-label="Get Started Today"
            >
              <Rocket className="w-6 h-6" />
              <span>Get Started Today</span>
            </button>
            <button
              onClick={() => setCurrentPage?.('portfolio')}
              className="border-2 border-yellow-400 text-yellow-400 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              aria-label="Explore Our Work"
            >
              <Eye className="w-6 h-6" />
              <span>Explore Our Work</span>
            </button>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.15),transparent_70%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-lg">
              <Target className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
              <span className="text-green-600 font-bold text-base sm:text-lg">BEST PRACTICES IN ACTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              Unlock Efficiency with <span className="text-yellow-600">AI Automation Solutions</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our solutions incorporate best practices like clean data handling, business-aligned goals, and scalable designs using n8n-like tools.
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
                      <p className="text-green-800 font-bold text-center text-sm sm:text-base">
                        {solution.result}
                      </p>
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
      {/* TECH STACK – INFINITE SCROLL */}
<section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-12 sm:mb-16">
      <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
        <Settings className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400" />
        <span className="text-yellow-400 font-semibold text-base sm:text-lg">ADVANCED AUTOMATION STACK</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
        Powered by <span className="text-yellow-400">n8n & AI Tools</span>
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
        We leverage n8n for visual workflows, AI integration, and 400+ apps, alongside top alternatives for robust automations.
      </p>
    </div>

    {/* INFINITE MARQUEE */}
    <div className="relative overflow-hidden py-8">
      <div className="flex animate-marquee-infinite gap-8">
        {[...techStacks, ...techStacks].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/20 bg-white p-4">
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-14 sm:w-16 md:w-18 h-14 sm:h-16 md:h-18 object-contain mb-2"
                loading="lazy"
              />
              <span className="text-black font-bold text-sm sm:text-base">{tech.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* STATIC CATEGORIES */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
      <div className="text-center group">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Monitor className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Workflow Builders</h3>
        <p className="text-gray-300 text-xs sm:text-sm">n8n, Zapier, Make</p>
      </div>
      <div className="text-center group">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Server className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">AI Integrations</h3>
        <p className="text-gray-300 text-xs sm:text-sm">OpenAI, Anthropic, Custom LLMs</p>
      </div>
      <div className="text-center group">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Database className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Data Tools</h3>
        <p className="text-gray-300 text-xs sm:text-sm">Google Sheets, Airtable, Databases</p>
      </div>
      <div className="text-center group">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Globe className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Cloud Deployment</h3>
        <p className="text-gray-300 text-xs sm:text-sm">AWS, Vercel, Self-Hosted</p>
      </div>
    </div>
  </div>

  {/* MARQUEE ANIMATION */}
  <style jsx>{`
    @keyframes marquee-infinite {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee-infinite {
      display: flex;
      width: max-content;
      animation: marquee-infinite 20s linear infinite;
    }
    .animate-marquee-infinite:hover {
      animation-play-state: paused;
    }
  `}</style>
</section>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our <span className="text-yellow-600">Featured Automations</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Real-world AI automations built with n8n and best practices</p>
          </div>
          <div className="relative max-w-6xl mx-auto" role="region" aria-label="Project slider">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {portfolioProjects.map((project) => (
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
              What Our <span className="text-yellow-400">Clients</span> Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">Feedback from businesses automated with n8n and AI</p>
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
              AI Automation <span className="text-yellow-600">Pricing</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Tailored services with n8n focus for your automation needs</p>
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
              Ready to Transform Your <span className="text-yellow-400">Operations?</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
              Join businesses that have streamlined their workflows with our AI automation expertise. Let's automate your success together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button
                onClick={() => setCurrentPage?.('contact')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                aria-label="Start Your Automation Today"
              >
                <Rocket className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>Start Your Automation Today</span>
              </button>
              <button
                onClick={() => setCurrentPage?.('portfolio')}
                className="border-3 border-yellow-400 text-yellow-400 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center space-x-3"
                aria-label="View More Projects"
              >
                <Eye className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>View More Projects</span>
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
            <div className="flex justify-center">
              <img
                src={selectedProject.images[0]}
                alt={`${selectedProject.title} main image`}
                className="max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl"
                loading="lazy"
              />
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

export default AIAutomationPage;