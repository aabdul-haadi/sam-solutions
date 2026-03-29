
import React, {
  useState,
  useCallback,
  useMemo,
  Suspense,
  lazy,
  memo,
} from 'react';
import {
  Filter,
  Eye,
} from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { ImageSkeleton } from '../components/ImageSkeleton';
import { useImageLoader } from '../hooks/useImageLoader';

import {
  placeholder_cons1,
  placeholder_cons2,
  placeholder_cons3,
  placeholder_cosmetics1,
  placeholder_cosmetics2,
  placeholder_cosmetics3,
  placeholder_consul1,
  placeholder_consul2,
  placeholder_consul3,
  placeholder_consul4,
  placeholder_gym1,
  placeholder_gym2,
  placeholder_gym3,
  placeholder_gym4,
  placeholder_gym5,
  placeholder_saas1,
  placeholder_saas2,
  placeholder_saas3,
  placeholder_saas4,
  placeholder_ad1,
  placeholder_ad2,
  placeholder_ad3,
  placeholder_ad4,
  placeholder_logo1,
  placeholder_logo2,
  placeholder_logo3,
  placeholder_logo4,
} from '../assets/placeholders';

const PortfolioModal = lazy(() => import('./PortfolioModal'));

const loadWeb = (name: string) => import(`../assets/sam/web/${name}.jpg`);
const loadSaas = (name: string) => import(`../assets/saas/${name}.webp`);
const loadAd = (name: string) => import(`../assets/ads/${name}.jpg`);
const loadLogo = (name: string) => import(`../assets/logo/${name}.jpg`);

interface Project {
  id: number;
  title: string;
  category: string;
  niche?: string;
  thumb: () => Promise<{ default: string }>;
  slides?: (() => Promise<{ default: string }>)[];
  description: string;
  year: string;
  type: 'single' | 'webpage';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Construction Company',
    category: 'web',
    niche: 'Construction Company',
    thumb: () => loadWeb('cons1'),
    slides: [() => loadWeb('cons1'), () => loadWeb('cons2'), () => loadWeb('cons3')],
    description:
      'Professional construction company website with project galleries, service showcases, and client testimonials.',
    year: '2024',
    type: 'webpage',
  },
  {
    id: 2,
    title: 'Luxury Beauty Brand',
    category: 'web',
    niche: 'Cosmetics & Beauty Brand',
    thumb: () => loadWeb('cosmetics1'),
    slides: [
      () => loadWeb('cosmetics1'),
      () => loadWeb('cosmetics2'),
      () => loadWeb('cosmetics3'),
    ],
    description:
      'Elegant cosmetics brand website featuring product catalogs, beauty tutorials, and e-commerce functionality.',
    year: '2024',
    type: 'webpage',
  },
  {
    id: 3,
    title: 'Business Consulting Firm',
    category: 'web',
    niche: 'Consulting & Coaching',
    thumb: () => loadWeb('consul1'),
    slides: [
      () => loadWeb('consul1'),
      () => loadWeb('consul2'),
      () => loadWeb('consul3'),
      () => loadWeb('consul4'),
    ],
    description:
      'Professional consulting website with service breakdowns, case studies, and client success stories.',
    year: '2024',
    type: 'webpage',
  },
  {
    id: 4,
    title: 'Elite Fitness Center',
    category: 'web',
    niche: 'Gym & Boxing',
    thumb: () => loadWeb('gym1'),
    slides: [
      () => loadWeb('gym1'),
      () => loadWeb('gym2'),
      () => loadWeb('gym3'),
      () => loadWeb('gym4'),
      () => loadWeb('gym5'),
    ],
    description:
      'Dynamic fitness center website with class schedules, trainer profiles, and membership options.',
    year: '2024',
    type: 'webpage',
  },
  {
    id: 5,
    title: 'TechFlow SaaS Platform',
    category: 'saas',
    thumb: () => loadSaas('saas1'),
    description:
      'Complete business automation platform with AI-powered analytics and workflow management.',
    year: '2024',
    type: 'single',
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    category: 'saas',
    thumb: () => loadSaas('saas2'),
    description:
      'Advanced analytics dashboard with real-time data visualization and reporting.',
    year: '2024',
    type: 'single',
  },
  {
    id: 7,
    title: 'Fintech App Interface',
    category: 'saas',
    thumb: () => loadSaas('saas3'),
    description:
      'Modern fintech application with secure payment processing and intuitive design.',
    year: '2024',
    type: 'single',
  },
  {
    id: 8,
    title: 'CRM Solution',
    category: 'saas',
    thumb: () => loadSaas('saas4'),
    description:
      'Customer relationship management system with advanced automation features.',
    year: '2024',
    type: 'single',
  },
  {
    id: 9,
    title: 'Digital Campaign Ad 1',
    category: 'ads',
    thumb: () => loadAd('ad1'),
    description: 'Engaging digital advertisement for brand promotion.',
    year: '2024',
    type: 'single',
  },
  {
    id: 10,
    title: 'Product Launch Ad',
    category: 'ads',
    thumb: () => loadAd('ad2'),
    description: 'High-impact ad for new product launch campaign.',
    year: '2024',
    type: 'single',
  },
  {
    id: 11,
    title: 'Social Media Ad 1',
    category: 'ads',
    thumb: () => loadAd('ad3'),
    description: 'Targeted social media advertisement with dynamic visuals.',
    year: '2024',
    type: 'single',
  },
  {
    id: 12,
    title: 'Event Promotion Ad',
    category: 'ads',
    thumb: () => loadAd('ad4'),
    description: 'Promotional ad for large-scale event marketing.',
    year: '2023',
    type: 'single',
  },
  {
    id: 13,
    title: 'Corporate Logo Design',
    category: 'logo',
    thumb: () => loadLogo('1'),
    description:
      'Professional logo design with multiple variations and brand applications.',
    year: '2024',
    type: 'single',
  },
  {
    id: 14,
    title: 'Fashion Brand Logo',
    category: 'logo',
    thumb: () => loadLogo('2'),
    description: 'Elegant logo design for luxury fashion brand with timeless appeal.',
    year: '2024',
    type: 'single',
  },
  {
    id: 15,
    title: 'Tech Startup Logo',
    category: 'logo',
    thumb: () => loadLogo('3'),
    description: 'Modern logo for innovative tech startup.',
    year: '2024',
    type: 'single',
  },
  {
    id: 16,
    title: 'Eco Brand Logo',
    category: 'logo',
    thumb: () => loadLogo('4'),
    description: 'Sustainable brand logo with eco-friendly design.',
    year: '2023',
    type: 'single',
  },
];

const placeholderMap: Record<string, string> = {
  cons1: placeholder_cons1,
  cons2: placeholder_cons2,
  cons3: placeholder_cons3,
  cosmetics1: placeholder_cosmetics1,
  cosmetics2: placeholder_cosmetics2,
  cosmetics3: placeholder_cosmetics3,
  consul1: placeholder_consul1,
  consul2: placeholder_consul2,
  consul3: placeholder_consul3,
  consul4: placeholder_consul4,
  gym1: placeholder_gym1,
  gym2: placeholder_gym2,
  gym3: placeholder_gym3,
  gym4: placeholder_gym4,
  gym5: placeholder_gym5,
  saas1: placeholder_saas1,
  saas2: placeholder_saas2,
  saas3: placeholder_saas3,
  saas4: placeholder_saas4,
  ad1: placeholder_ad1,
  ad2: placeholder_ad2,
  ad3: placeholder_ad3,
  ad4: placeholder_ad4,
  logo1: placeholder_logo1,
  logo2: placeholder_logo2,
  logo3: placeholder_logo3,
  logo4: placeholder_logo4,
};

const getPlaceholder = (importFn: () => Promise<any>): string => {
  const match = importFn.toString().match(/['"]([^'"]+)['"]/);
  const key = match ? match[1].split('/').pop()?.split('.').shift() || 'cons1' : 'cons1';
  return placeholderMap[key] || placeholderMap.cons1;
};

const PortfolioGridItem = memo(
  ({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) => {
    const placeholder = getPlaceholder(project.thumb);
    const { src, loaded } = useImageLoader(project.thumb, placeholder);

    return (
      <div
        className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
        onClick={() => onOpen(project)}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <Suspense fallback={<ImageSkeleton />}>
            <OptimizedImage
              src={src}
              alt={project.title}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!loaded && (
              <div
                className="absolute inset-0 bg-cover bg-center blur-md scale-110"
                style={{ backgroundImage: `url(${placeholder})` }}
              />
            )}
          </Suspense>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-2">
                {project.title}
              </h3>
              {project.niche && (
                <div className="text-yellow-400 text-xs sm:text-sm font-semibold mb-2">
                  {project.niche}
                </div>
              )}
              <p className="text-gray-200 text-xs sm:text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="bg-yellow-400 text-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {project.year}
                </span>
                <div className="flex items-center text-white">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm font-medium">
                    View Project
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs uppercase font-medium">
            {project.category}
          </div>
          {project.type === 'webpage' && project.slides && project.slides.length > 1 && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-black px-2 sm:px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
              {project.slides.length} Pages
            </div>
          )}
        </div>
      </div>
    );
  }
);

interface PortfolioProps {
  setCurrentPage: (page: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo(
    () => [
      { id: 'all', label: 'All Projects', count: 16 },
      { id: 'web', label: 'Web Development', count: 4 },
      { id: 'saas', label: 'SaaS Applications', count: 4 },
      { id: 'ads', label: 'Advertisements', count: 4 },
      { id: 'logo', label: 'Logo Designs', count: 4 },
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    return activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <section id="portfolio" className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-yellow-600">Work</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2">
            Discover our curated collection of projects showcasing innovation
            and creativity.
          </p>
        </div>

        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
            <span className="text-gray-600 font-medium text-sm md:text-base">
              Filter by category
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                {cat.label}
                <span className="ml-2 text-xs md:text-sm opacity-75">
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProjects.map((p) => (
            <PortfolioGridItem key={p.id} project={p} onOpen={openProject} />
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <button
            onClick={() => {
              setCurrentPage('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 sm:px-8 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
          >
            Explore Full Portfolio
          </button>
        </div>
      </div>

      {selectedProject && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"><ImageSkeleton /></div>}>
          <PortfolioModal project={selectedProject} onClose={closeProject} />
        </Suspense>
      )}
    </section>
  );
};

export default Portfolio;
