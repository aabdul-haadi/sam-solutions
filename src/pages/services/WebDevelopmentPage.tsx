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
} from 'lucide-react';

interface WebDevelopmentPageProps {
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
  { name: 'React', logo: 'https://simpleicons.org/icons/react.svg', color: 'from-blue-400 to-blue-600' },
  { name: 'Next.js', logo: 'https://simpleicons.org/icons/nextdotjs.svg', color: 'from-gray-700 to-black' },
  { name: 'TypeScript', logo: 'https://simpleicons.org/icons/typescript.svg', color: 'from-blue-500 to-blue-700' },
  { name: 'Node.js', logo: 'https://simpleicons.org/icons/nodedotjs.svg', color: 'from-green-400 to-green-600' },
  { name: 'Python', logo: 'https://simpleicons.org/icons/python.svg', color: 'from-yellow-400 to-yellow-600' },
  { name: 'MongoDB', logo: 'https://simpleicons.org/icons/mongodb.svg', color: 'from-green-500 to-green-700' },
  { name: 'PostgreSQL', logo: 'https://simpleicons.org/icons/postgresql.svg', color: 'from-blue-600 to-indigo-600' },
  { name: 'Docker', logo: 'https://simpleicons.org/icons/docker.svg', color: 'from-blue-400 to-blue-600' },
  { name: 'GraphQL', logo: 'https://simpleicons.org/icons/graphql.svg', color: 'from-pink-400 to-pink-600' },
  { name: 'Redis', logo: 'https://simpleicons.org/icons/redis.svg', color: 'from-red-400 to-red-600' },
  { name: 'Kubernetes', logo: 'https://simpleicons.org/icons/kubernetes.svg', color: 'from-blue-500 to-purple-600' },
];

const businessProblems: BusinessProblem[] = [
  {
    description: '73% of users abandon websites that take longer than 3 seconds to load',
    impact: '$2.6B lost annually due to poor performance',
    visual: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    description: "61% of users won't return to a mobile site they had trouble accessing",
    impact: '54% of traffic comes from mobile devices',
    visual: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    description: '43% of cyber attacks target small businesses with outdated websites',
    impact: 'Average cost of a data breach: $4.45M',
    visual: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

import { FaMapSigns, FaPalette, FaRocket, FaMobileAlt } from 'react-icons/fa';

const solutions: Solution[] = [
  {
    icon: <FaMapSigns className="w-20 h-20 text-green-500" />,
    title: 'Easy Navigation',
    description: 'A user-friendly design with clear, intuitive menus and a logical flow.',
    result: '40% reduction in bounce rates and 30% increase in user engagement.',
    features: ['Intuitive menus', 'Logical flow', 'Seamless user journey', 'Quick access to info'],
    metric: '30%',
    metricLabel: 'User Engagement Boost',
  },
  {
    icon: <FaPalette className="w-20 h-20 text-blue-500" />,
    title: 'Professional Design',
    description: 'A polished, modern look that builds trust and aligns with your brand.',
    result: '75% of users are more likely to trust your business with a professional website.',
    features: ['Modern aesthetics', 'Brand alignment', 'Trust-building elements', 'High-quality visuals'],
    metric: '75%',
    metricLabel: 'Trust Increase',
  },
  {
    icon: <FaRocket className="w-20 h-20 text-red-500" />,
    title: 'Fast Load Speed',
    description: 'Optimized images, fast hosting, and clean code to speed up your site.',
    result: '40% more visitors stay longer, and 20% more conversions.',
    features: ['Image optimization', 'Fast hosting', 'Clean code', 'CDN integration'],
    metric: '20%',
    metricLabel: 'Conversion Increase',
  },
  {
    icon: <FaMobileAlt className="w-20 h-20 text-yellow-500" />,
    title: 'Mobile-Friendly Experience',
    description: 'A responsive design that adapts perfectly to any screen size.',
    result: '57% higher chance of user recommendations and 25% increase in mobile traffic.',
    features: ['Responsive layouts', 'Touch-friendly UI', 'Cross-device compatibility', 'Mobile optimization'],
    metric: '25%',
    metricLabel: 'Mobile Traffic Boost',
  },
];


const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'E-commerce Website',
    images: [
      'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A modern e-commerce website with secure checkout, product management, and responsive design for seamless shopping.',
    results: ['+300% traffic growth', '+45% sales conversions', 'Optimized performance'],
    tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Corporate Business Website',
    images: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A professional corporate website with CMS integration, modern UI/UX, and SEO-friendly architecture.',
    results: ['Faster page loads', 'Better SEO ranking', 'More leads generated'],
    tech: ['Next.js', 'Tailwind CSS', 'GraphQL', 'Vercel'],
    category: 'Web Development',
  },
  {
    id: 3,
    title: 'Portfolio & Personal Website',
    images: [
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'A sleek and responsive portfolio website designed to showcase projects, skills, and achievements online.',
    results: ['Increased visibility', 'Stronger personal brand', 'Higher client inquiries'],
    tech: ['React', 'Tailwind CSS', 'Netlify'],
    category: 'Web Development',
  },
  {
    id: 4,
    title: 'Educational Website',
    images: [
      'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'An educational website with course listings, interactive resources, and a mobile-friendly design.',
    results: ['Higher user engagement', 'Improved course signups', 'Better accessibility'],
    tech: ['React', 'Node.js', 'MongoDB'],
    category: 'Web Development',
  },
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
    quote: 'The team at SAM Creatives was professional and delivered a fantastic website. We’ve seen a noticeable increase in traffic!',
    rating: 5,
  },
  {
    name: 'Emily',
    position: 'Founder',
    company: 'Urban Essentials',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'I’m thrilled with our new site. It looks great and functions even better. Thank you, SAM Creatives!',
    rating: 5,
  },
  {
    name: 'James',
    position: 'Marketing Director',
    company: 'GreenTech Solutions',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'SAM Creatives took our website to the next level. It’s more engaging, and our customer retention has improved.',
    rating: 5,
  },
  {
    name: 'Lisa',
    position: 'Owner',
    company: 'Bella’s Bakery',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Thanks to their expertise, our site is more efficient and user-friendly. We’ve seen better engagement!',
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

const developmentProcess: DevelopmentPhase[] = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'Deep dive into your business goals, target audience, and technical requirements',
    icon: <Target className="w-8 h-8" />,
    duration: '1-2 weeks',
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    description: 'Create wireframes, mockups, and interactive prototypes for validation',
    icon: <Palette className="w-8 h-8" />,
    duration: '2-3 weeks',
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Build with modern technologies and rigorous testing protocols',
    icon: <Code className="w-8 h-8" />,
    duration: '4-8 weeks',
  },
  {
    step: '04',
    title: 'Launch & Optimization',
    description: 'Deploy, monitor, and continuously optimize for peak performance',
    icon: <Rocket className="w-8 h-8" />,
    duration: '1-2 weeks',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic Landing Page',
    price: '$250',
    originalPrice: '$400',
    duration: '3-5 days',
    description: 'A clean and modern single-page website to kickstart your online presence.',
    features: [
      '1 landing page',
      'Responsive design',
      'Basic SEO setup',
      'Contact form integration',
      'Fast loading speed',
      'Mobile-friendly design',
    ],
    popular: false,
    savings: 'Save 38%',
  },
  {
    name: 'Standard Website',
    price: '$750',
    originalPrice: '$1,000',
    duration: '1-2 weeks',
    description: 'A professional website with up to 5 pages, perfect for small businesses.',
    features: [
      'Up to 5 pages',
      'Custom design & animations',
      'SEO optimization',
      'Blog or CMS integration',
      'Social media integration',
      'Analytics integration',
      '30 days support',
      'Performance optimization',
      'Security features',
    ],
    popular: true,
    savings: 'Save 25%',
  },
  {
    name: 'Premium Custom Solution',
    price: "Let's Discuss",
    originalPrice: '',
    duration: 'Timeline varies',
    description: 'Fully custom website solutions with unlimited features and scalability.',
    features: [
      'Fully customized solution',
      'Unlimited pages & features',
      'E-commerce or SaaS support',
      'Priority support',
      'Dedicated project manager',
      'Extended warranty & maintenance',
    ],
    popular: false,
    savings: 'Customed for You',
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
    aria-label="Development Journey"
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
            Development Journey
          </span>
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A structured process that transforms your vision into a high-performing web experience.
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

const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({ setCurrentPage }) => {
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
      {/* Hero Section - Compacted with reduced height, text sizes, and no buttons */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Web Development"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Code className="w-12 h-12 text-yellow-400/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse">
          <Globe className="w-10 h-10 text-yellow-400/20" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce">
          <Rocket className="w-12 h-12 text-yellow-400/25" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
                <Code className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-base">WEB DEVELOPMENT EXCELLENCE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
                <span className="text-white">Custom Websites,</span>
                <br />
                <span className="text-yellow-400">Built to Convert and</span>
                <br />
                <span className="text-white">Boost Sales</span>
              </h1>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Struggling to drive sales? A generic design could be turning customers away. We create{' '}
                <span className="text-yellow-400 font-semibold">custom websites</span> that{' '}
                <span className="text-yellow-400 font-semibold">convert</span>, helping you boost your
                bottom line.
              </p>
            </div>
            <div
              className="animate-fade-in-up grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">300%</div>
                <p className="text-gray-300 text-xs sm:text-sm">Traffic Increase</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">85%</div>
                <p className="text-gray-300 text-xs sm:text-sm">Faster Loading</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">150%</div>
                <p className="text-gray-300 text-xs sm:text-sm">Conversion Boost</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">98%</div>
                <p className="text-gray-300 text-xs sm:text-sm">Client Satisfaction</p>
              </div>
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
              <span className="text-red-600 font-bold text-base sm:text-lg">BUSINESS REALITY CHECK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              The <span className="text-red-500">Hidden Costs</span> of Poor Web Development
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Every day, businesses lose customers, revenue, and opportunities due to outdated websites.
              Here's what the data reveals:
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            <span className="block">Stop Losing Sales!</span>
            <span className="block text-yellow-400">It’s Time to Ignite Your Growth!</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-snug">
            Transform your website into a powerful sales tool. Attract more customers, boost conversions, and watch your business thrive with a website that works as hard as you do!
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.15),transparent_70%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-lg">
              <Target className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
              <span className="text-green-600 font-bold text-base sm:text-lg">IMAGINE THE POSSIBILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              Now Imagine Having a Website That <span className="text-yellow-600">Works for You</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Imagine a website that not only looks amazing but also works seamlessly to grow your business
              and bring your vision to life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200/50">
                  <div className="relative h-28 sm:h-32 flex items-center justify-center">
                    {solution.icon}
                  </div>
                  <div className="p-5 sm:p-6 relative text-center">
                    <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-green-400/10 rounded-full blur-xl -translate-y-8 sm:-translate-y-12 translate-x-8 sm:translate-x-12"></div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{solution.title}</h3>
                    <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">{solution.description}</p>
                    <div className="bg-green-50 p-2 sm:p-3 transition-transform mb-4">
                      <p className="text-green-800 font-bold text-center text-xs sm:text-sm">
                        {solution.result}
                      </p>
                    </div>
                    <div className="space-y-2 text-left pl-3">
                      {solution.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 transition-transform">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700 font-medium text-xs sm:text-sm">{feature}</span>
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

      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <Settings className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-base sm:text-lg">CUTTING-EDGE TECHNOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Powered by <span className="text-yellow-400">Modern Tech</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              We use the latest technologies and frameworks to build fast, secure, and scalable web applications
            </p>
          </div>

          {/* INFINITE SCROLLING TECH STACK */}
          <div className="relative overflow-hidden py-8">
            <div className="flex animate-marquee-infinite gap-8">
              {[...techStacks, ...techStacks].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/20 bg-white p-3">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 object-contain mb-1"
                      loading="lazy"
                    />
                    <span className="text-black font-bold text-xs sm:text-sm">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Static Tech Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <div className="text-center group">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Monitor className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">Frontend</h3>
              <p className="text-gray-300 text-xs">React, Next.js, TypeScript</p>
            </div>
            <div className="text-center group">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Server className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">Backend</h3>
              <p className="text-gray-300 text-xs">Node.js, Python, APIs</p>
            </div>
            <div className="text-center group">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Database className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">Database</h3>
              <p className="text-gray-300 text-xs">MongoDB, PostgreSQL</p>
            </div>
            <div className="text-center group">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">Cloud</h3>
              <p className="text-gray-300 text-xs">AWS, Docker, Kubernetes</p>
            </div>
          </div>
        </div>

        {/* INFINITE MARQUEE ANIMATION */}
        <style jsx>{`
          @keyframes marquee-infinite {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee-infinite {
            display: flex;
            width: max-content;
            animation: marquee-infinite 25s linear infinite;
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
              Our <span className="text-yellow-600">Featured Projects</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Real projects, real results, real impact on business growth</p>
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

      {/* Development Journey Section */}
      <DevelopmentJourney phases={developmentProcess} />

      {/* Client Testimonials */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,195,75,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              What Our <span className="text-yellow-400">Clients</span> Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">Real feedback from businesses we've transformed</p>
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

      {/* Pricing Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Web Development <span className="text-yellow-600">Pricing</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Custom websites and web applications tailored to your needs</p>
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
                    <span>{plan.price === "Let's Discuss" ? 'Contact Sales' : 'Get Started'}</span>
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Compacted */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Transform Your <span className="text-yellow-400">Digital Presence?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Join hundreds of satisfied clients who have transformed their businesses with our web
              development expertise. Let's create something extraordinary together.
            </p>
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
              <img
                src={selectedProject.images[0]}
                alt={`${selectedProject.title} main image`}
                className="max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebDevelopmentPage;