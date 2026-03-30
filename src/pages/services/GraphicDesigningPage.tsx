import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Palette,
  Eye,
  Star,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  X,
  Target,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  Zap,
  Globe,
  Settings,
  Rocket,
  MessageSquare
} from 'lucide-react';

interface GraphicDesigningPageProps {
  setCurrentPage?: (page: string) => void;
}

// Define interfaces for type safety
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
const designServices = [
  { name: 'Logo Design', icon: '🎨', color: 'from-purple-400 to-purple-600' },
  { name: 'Banner Design', icon: '🖼️', color: 'from-blue-400 to-blue-600' },
  { name: 'Social Media Posts', icon: '📱', color: 'from-pink-400 to-pink-600' },
  { name: 'Video Animation', icon: '🎬', color: 'from-red-400 to-red-600' },
  { name: '2D Design', icon: '🎭', color: 'from-green-400 to-green-600' },
  { name: '3D Design', icon: '🎲', color: 'from-indigo-400 to-indigo-600' },
  { name: 'UI/UX Design', icon: '💻', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Illustrations', icon: '✏️', color: 'from-orange-400 to-orange-600' },
  { name: 'Business Cards', icon: '💼', color: 'from-gray-400 to-gray-600' },
  { name: 'Infographics', icon: '📊', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Brochure Design', icon: '📄', color: 'from-teal-400 to-teal-600' },
  { name: 'Packaging Design', icon: '📦', color: 'from-rose-400 to-rose-600' }
];

const businessProblems: BusinessProblem[] = [
  {
    title: 'Inconsistent Branding',
    description: 'Using mismatched colors, fonts, or styles makes your brand look unprofessional.',
    impact: 'Research shows consistent branding can increase revenue by up to 23%.',
    visual: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Outdated Design',
    description: 'Old-fashioned or cluttered designs can push customers away.',
    impact: 'First impressions are 94% design-related.',
    visual: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Poor Visual Communication',
    description: 'If your graphics don\'t clearly convey your message, customers lose interest fast.',
    impact: 'People process visuals 60,000x faster than text.',
    visual: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Low-Quality Graphics',
    description: 'Pixelated or generic designs reduce trust and credibility.',
    impact: 'A survey found that 75% of users judge a brand\'s credibility based on design.',
    visual: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const solutions: Solution[] = [
  {
    icon: <Sparkles className="w-24 h-24 text-yellow-600" />,
    title: 'Consistent Branding',
    description: 'Cohesive color schemes, typography, and styles that strengthen brand identity.',
    result: 'Brands with consistent visuals see up to 3.5x more visibility.',
    features: ['Brand guidelines', 'Color consistency', 'Typography system', 'Style standards'],
    metric: '3.5x',
    metricLabel: 'More Visibility'
  },
  {
    icon: <Award className="w-24 h-24 text-yellow-600" />,
    title: 'Modern & Professional Look',
    description: 'Creative, polished designs that build trust and set you apart from competitors.',
    result: 'Studies show 75% of users judge credibility by design quality.',
    features: ['Modern aesthetics', 'Professional polish', 'Trust-building design', 'Competitive edge'],
    metric: '75%',
    metricLabel: 'Trust Increase'
  },
  {
    icon: <Eye className="w-24 h-24 text-yellow-600" />,
    title: 'Clear Visual Communication',
    description: 'Graphics that simplify complex ideas and make your message easy to understand.',
    result: 'Content paired with visuals generates 94% more views.',
    features: ['Message clarity', 'Visual storytelling', 'Simplified concepts', 'Engaging graphics'],
    metric: '94%',
    metricLabel: 'More Views'
  },
  {
    icon: <Zap className="w-24 h-24 text-yellow-600" />,
    title: 'High-Quality & Versatile Assets',
    description: 'Pixel-perfect designs tailored for print, web, and social media campaigns.',
    result: 'Businesses using strong visuals see a 37% boost in engagement across platforms.',
    features: ['Pixel-perfect quality', 'Multi-platform ready', 'Versatile formats', 'Campaign-ready'],
    metric: '37%',
    metricLabel: 'Engagement Boost'
  }
];

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Brand Identity Design',
    images: [
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Complete brand identity package with logo, business cards, and marketing materials.',
    results: ['+200% brand recognition', '+150% customer trust', 'Professional identity'],
    tech: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma'],
    category: 'Brand Identity'
  },
  {
    id: 2,
    title: 'Social Media Campaign',
    images: [
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Engaging social media graphics and video content for brand awareness campaign.',
    results: ['+300% engagement', '+180% followers', 'Viral content'],
    tech: ['After Effects', 'Illustrator', 'Photoshop', 'Canva'],
    category: 'Social Media'
  },
  {
    id: 3,
    title: 'Marketing Materials',
    images: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Professional brochures, flyers, and promotional materials for marketing campaigns.',
    results: ['+250% lead generation', '+120% conversion rate', 'Professional appeal'],
    tech: ['InDesign', 'Illustrator', 'Photoshop'],
    category: 'Print Design'
  },
  {
    id: 4,
    title: '3D Product Visualization',
    images: [
      'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Realistic 3D product renders and animations for e-commerce and marketing.',
    results: ['+400% product views', '+90% sales increase', 'Premium presentation'],
    tech: ['Blender', 'Cinema 4D', 'After Effects'],
    category: '3D Design'
  }
];

const testimonials: Testimonial[] = [
  {
    name: 'Adeel',
    position: 'Owner',
    company: 'Nova Café',
    image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'SAM Creatives designed a stunning logo for our brand. It perfectly reflects our identity and has received so many compliments!',
    rating: 5
  },
  {
    name: 'Rabia',
    position: 'Marketing Lead',
    company: 'EduSmart Academy',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'We needed engaging social media posts, and SAM Creatives delivered beyond expectations. Our pages look more professional than ever.',
    rating: 5
  },
  {
    name: 'Kamran',
    position: 'CEO',
    company: 'BrightTech Solutions',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Their team created eye-catching banners and flyers for our campaign. We saw a huge jump in engagement!',
    rating: 5
  },
  {
    name: 'Mehak',
    position: 'Product Manager',
    company: 'EcoLiving',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'SAM Creatives handled our 3D design project with perfection. The visuals were realistic, creative, and exactly what we needed.',
    rating: 5
  },
  {
    name: 'Fahad',
    position: 'Founder',
    company: 'MoveWell Fitness',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'The video animation they produced for us was incredible. It told our story in a way that grabbed attention instantly.',
    rating: 5
  },
  {
    name: 'Anam',
    position: 'Co-Founder',
    company: 'LuxeWear Apparel',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'From logo to complete branding, SAM Creatives gave our business a professional identity we\'re proud of.',
    rating: 5
  }
];

const developmentProcess: DevelopmentPhase[] = [
  {
    step: '01',
    title: 'Brand Discovery & Research',
    description: 'Deep dive into your brand values, target audience, and competitive landscape',
    icon: <Target className="w-8 h-8" />,
    duration: '1-2 weeks'
  },
  {
    step: '02',
    title: 'Concept Development',
    description: 'Create initial design concepts and mood boards for your approval',
    icon: <Palette className="w-8 h-8" />,
    duration: '1-2 weeks'
  },
  {
    step: '03',
    title: 'Design & Refinement',
    description: 'Develop final designs with unlimited revisions until perfect',
    icon: <Sparkles className="w-8 h-8" />,
    duration: '2-3 weeks'
  },
  {
    step: '04',
    title: 'Delivery & Brand Guidelines',
    description: 'Final files delivery with comprehensive brand guidelines',
    icon: <Rocket className="w-8 h-8" />,
    duration: '1 week'
  }
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Logo Design Package',
    price: '$199',
    originalPrice: '$299',
    duration: '3-5 days',
    description: 'Professional logo design with multiple concepts and revisions.',
    features: [
      '3 logo concepts',
      'Unlimited revisions',
      'High-resolution files',
      'Vector formats (AI, EPS)',
      'Social media kit',
      'Basic brand guidelines'
    ],
    popular: false,
    savings: 'Save 33%'
  },
  {
    name: 'Complete Brand Identity',
    price: '$599',
    originalPrice: '$899',
    duration: '1-2 weeks',
    description: 'Full brand identity package with logo, stationery, and marketing materials.',
    features: [
      '5 logo concepts',
      'Business card design',
      'Letterhead design',
      'Social media templates',
      'Brand guidelines document',
      'Marketing materials',
      'Unlimited revisions',
      '60 days support',
      'All file formats'
    ],
    popular: true,
    savings: 'Save 33%'
  },
  {
    name: 'Premium Design Suite',
    price: "Let's Discuss",
    originalPrice: '',
    duration: 'Timeline varies',
    description: 'Comprehensive design solution with ongoing support and custom requirements.',
    features: [
      'Complete brand identity',
      'Marketing campaign designs',
      'Video animations',
      '3D visualizations',
      'Packaging design',
      'Dedicated designer',
      'Priority support',
      'Ongoing design support'
    ],
    popular: false,
    savings: 'Custom Quote'
  }
];

// Reusable PhaseCard component
const PhaseCard: React.FC<{
  phase: DevelopmentPhase;
  index: number;
  isReversed: boolean;
}> = ({ phase, index, isReversed }) => (
  <div
    className={`relative flex flex-col lg:flex-row items-center gap-8 transition-all duration-700 ease-out ${
      isReversed ? 'lg:flex-row-reverse' : ''
    } animate-slide-in`}
    style={{ animationDelay: `${index * 0.3}s` }}
  >
    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full lg:block hidden z-10 animate-pulse" />

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
          <div className="text-2xl font-bold text-white">{phase.step}</div>
          <div className="text-yellow-400 text-sm font-medium">{phase.duration}</div>
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{phase.title}</h3>
      <p className="text-gray-300 leading-relaxed text-sm md:text-base">{phase.description}</p>
    </div>

    <div className="hidden lg:block lg:w-5/12"></div>
  </div>
);

const GraphicDesigningPage: React.FC<GraphicDesigningPageProps> = ({ setCurrentPage }) => {
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
      {/* Hero Section - Compacted height, reduced text sizes */}
      <section className="relative flex items-center justify-center overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Graphic Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Palette className="w-12 h-12 text-yellow-400/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse">
          <Sparkles className="w-10 h-10 text-yellow-400/20" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce">
          <Eye className="w-10 h-10 text-yellow-400/25" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Palette className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm">GRAPHIC DESIGN EXCELLENCE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Stunning Designs,</span><br />
                <span className="text-yellow-400">Built to Captivate</span>
              </h1>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                From weak branding to impactful designs that communicate and drive engagement.
              </p>
            </div>

            {/* Stats Row - Compacted */}
            <div className="animate-fade-in-up grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">200%</div>
                <p className="text-gray-300 text-xs sm:text-sm">Brand Recognition</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">94%</div>
                <p className="text-gray-300 text-xs sm:text-sm">Design Impact</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">150%</div>
                <p className="text-gray-300 text-xs sm:text-sm">Trust Increase</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">37%</div>
                <p className="text-gray-300 text-xs sm:text-sm">Engagement Boost</p>
              </div>
            </div>

            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={() => setCurrentPage && setCurrentPage('contact')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Rocket className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>Start Your Design</span>
              </button>
              <button
                onClick={() => setCurrentPage && setCurrentPage('portfolio')}
                className="border-2 border-yellow-400 text-yellow-400 px-6 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center space-x-2"
              >
                <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>View Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Problems Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-gray-100 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-red-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" />
              <span className="text-red-600 font-bold text-base sm:text-lg">DESIGN REALITY CHECK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              If These Sound Familiar, <span className="text-red-500">This Is For You</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your brand visuals might be the reason for low engagement, poor conversions, weak recognition, or lost customers.
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
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white mb-1">{problem.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 relative">
                    <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-red-400/10 rounded-full blur-xl -translate-y-8 sm:-translate-y-12 translate-x-8 sm:translate-x-12"></div>

                    <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                      {problem.description}
                    </p>

                    <div className="bg-red-50 p-3 sm:p-4 mb-4 sm:mb-6 transition-transform">
                      <p className="text-red-800 font-bold text-center text-sm sm:text-base">
                        {problem.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 text-white max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Take Control of Your Graphics Right</h3>
              <p className="text-xl text-gray-300 mb-6">
                Reach out today, and let's work together to create designs that drive results!
              </p>
              <button 
                onClick={() => setCurrentPage && setCurrentPage('contact')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
              >
                Get Free Consultation Today!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.15),transparent_70%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-lg">
              <Target className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
              <span className="text-green-600 font-bold text-base sm:text-lg">IMAGINE THE POSSIBILITIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              Now Imagine Having Designs That <span className="text-yellow-600">Truly Work for You</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Imagine visuals that not only look stunning but also communicate your brand story, attract the right audience, and inspire action.
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

      {/* Design Services Section – INFINITE SCROLL */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <Settings className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-base sm:text-lg">OUR EXPERTISE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Our Expertise in <span className="text-yellow-400">Graphic Designing</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              We specialize in creating designs that capture attention, strengthen branding, and inspire action
            </p>
          </div>

          {/* INFINITE MARQUEE */}
          <div className="relative overflow-hidden py-8">
            <div className="flex animate-marquee-infinite gap-8">
              {[...designServices, ...designServices].map((service, index) => (
                <div
                  key={`${service.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/20 bg-white p-4">
                    <div className="text-4xl sm:text-5xl mb-2">{service.icon}</div>
                    <span className="text-black font-bold text-sm sm:text-base text-center px-2">{service.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS ANIMATION */}
        <style jsx>{`
          @keyframes marquee-infinite {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-infinite {
            display: flex;
            width: max-content;
            animation: marquee-infinite 22s linear infinite;
          }
          .animate-marquee-infinite:hover {
            animation-play-state: paused;
          }
        `}</style>
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
          <div className="relative max-w-6xl mx-auto">
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
                    >
                      <div className="grid lg:grid-cols-2 gap-0">
                        <div className="relative overflow-hidden h-64 sm:h-80 lg:h-auto">
                          <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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

                          {/* Tech Stack */}
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

            {/* Slider Controls */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? portfolioProjects.length - 1 : prev - 1))}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-12 sm:w-14 h-12 sm:h-14 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors z-10"
            >
              <ChevronLeft className="w-6 sm:w-7 h-6 sm:h-7" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % portfolioProjects.length)}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-12 sm:w-14 h-12 sm:h-14 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors z-10"
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
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Design Process</span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A creative process that transforms your vision into stunning visual identity
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full hidden lg:block" />

            <div className="space-y-12">
              {developmentProcess.map((phase, index) => (
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

      {/* Client Testimonials */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,195,75,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Our <span className="text-yellow-400">Clients Speak for Us</span>
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
              No Payment <span className="text-yellow-600">Until You Love Your Design</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Professional design services with guaranteed satisfaction</p>
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

                <div className={`p-6 sm:p-8 relative z-10 ${plan.popular ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : ''}`}>
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

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              Ready to Elevate Your <span className="text-yellow-400">Brand Identity?</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
              Transform your brand with stunning designs that capture attention and drive results. 
              Let's create visual identity that sets you apart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button
                onClick={() => setCurrentPage && setCurrentPage('contact')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              >
                <Rocket className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>Start Your Design Project</span>
              </button>
              <button
                onClick={() => setCurrentPage && setCurrentPage('portfolio')}
                className="border-3 border-yellow-400 text-yellow-400 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center space-x-3"
              >
                <Eye className="w-5 sm:w-6 h-5 sm:h-6" />
                <span>View Design Portfolio</span>
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
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">{selectedProject.title}</h3>
            <div className="flex justify-center">
              <img
                src={selectedProject.images[0]}
                alt={selectedProject.title}
                className="max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphicDesigningPage;