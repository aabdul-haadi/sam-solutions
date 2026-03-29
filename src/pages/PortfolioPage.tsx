'use client';

import React, {
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
  useRef,
  useEffect,
  forwardRef,
  memo,
} from 'react';
import {
  ArrowLeft,
  Eye,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';

// ================== IMAGES ==================
import cons1 from '../assets/sam/web/cons1.jpg';
import cons2 from '../assets/sam/web/cons2.jpg';
import cons3 from '../assets/sam/web/cons3.jpg';
import cosmetics1 from '../assets/sam/web/cosmetics1.jpg';
import cosmetics2 from '../assets/sam/web/cosmetics2.jpg';
import cosmetics3 from '../assets/sam/web/cosmetics3.jpg';
import consul1 from '../assets/sam/web/consul1.jpg';
import consul2 from '../assets/sam/web/consul2.jpg';
import consul3 from '../assets/sam/web/consul3.jpg';
import consul4 from '../assets/sam/web/consul4.jpg';
import gym1 from '../assets/sam/web/gym1.jpg';
import gym2 from '../assets/sam/web/gym2.jpg';
import gym3 from '../assets/sam/web/gym3.jpg';
import gym4 from '../assets/sam/web/gym4.jpg';
import gym5 from '../assets/sam/web/gym5.jpg';
import travel1 from '../assets/sam/web/travel1.jpg';
import travel2 from '../assets/sam/web/travel2.jpg';
import travel3 from '../assets/sam/web/travel3.jpg';
import travel4 from '../assets/sam/web/travel4.jpg';
import real1 from '../assets/sam/web/real1.jpg';
import real2 from '../assets/sam/web/real2.jpg';
import real3 from '../assets/sam/web/real3.jpg';
import res1 from '../assets/sam/web/res1.jpg';
import res2 from '../assets/sam/web/res2.jpg';
import res3 from '../assets/sam/web/res3.jpg';

import ad1 from '../assets/ads/ad1.jpg';
import ad2 from '../assets/ads/ad2.jpg';
import ad3 from '../assets/ads/ad3.jpg';
import ad4 from '../assets/ads/ad4.jpg';
import ad5 from '../assets/ads/ad5.jpg';
import ad6 from '../assets/ads/ad6.jpg';
import ad7 from '../assets/ads/ad7.jpg';
import ad8 from '../assets/ads/ad8.jpg';
import ad9 from '../assets/ads/ad9.jpg';

import logo1 from '../assets/logo/1.jpg';
import logo2 from '../assets/logo/2.jpg';
import logo3 from '../assets/logo/3.jpg';
import logo4 from '../assets/logo/4.jpg';
import logo5 from '../assets/logo/5.jpg';
import logo6 from '../assets/logo/6.jpg';
import logo7 from '../assets/logo/7.jpeg';

import saas1 from '../assets/saas/saas1.webp';
import saas2 from '../assets/saas/saas2.webp';
import saas3 from '../assets/saas/saas3.webp';
import saas4 from '../assets/saas/saas4.webp';
import { OptimizedImage } from '../components/OptimizedImage';

// ================== SKELETON CARD ==================
const SkeletonCard = memo(() => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
    <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"></div>
    <div className="p-6 space-y-3">
      <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
    </div>
  </div>
));

// ================== TYPES ==================
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  images?: string[];
  description: string;
  year: string;
  type: 'single' | 'slider' | 'webpage';
  niche?: string;
}

interface Category {
  id: string;
  label: string;
  count: number;
}

interface PortfolioPageProps {
  setCurrentPage?: (page: string) => void;
}

// ================== MAIN COMPONENT ==================
const PortfolioPage: React.FC<PortfolioPageProps> = ({ setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // ================== DATA ==================
  const categories: Category[] = useMemo(
    () => [
      { id: 'all', label: 'All Projects', count: 27 },
      { id: 'web', label: 'Web Development', count: 7 },
      { id: 'saas', label: 'SaaS Applications', count: 4 },
      { id: 'ads', label: 'Advertisements', count: 9 },
      { id: 'logo', label: 'Logo Designs', count: 7 },
    ],
    []
  );

  const projects: Project[] = useMemo(
    () => [
      // Web Projects
      {
        id: 1,
        title: 'Modern Construction Company',
        category: 'web',
        niche: 'Construction',
        image: cons1,
        images: [cons1, cons2, cons3],
        description: 'Professional construction site with project galleries and client portal.',
        year: '2024',
        type: 'webpage',
      },
      {
        id: 2,
        title: 'Luxury Beauty Brand',
        category: 'web',
        niche: 'Cosmetics',
        image: cosmetics1,
        images: [cosmetics1, cosmetics2, cosmetics3],
        description: 'E-commerce beauty platform with product filters and tutorials.',
        year: '2024',
        type: 'webpage',
      },
      {
        id: 3,
        title: 'Business Consulting Firm',
        category: 'web',
        niche: 'Consulting',
        image: consul1,
        images: [consul1, consul2, consul3, consul4],
        description: 'Case studies, testimonials, and booking system.',
        year: '2024',
        type: 'webpage',
      },
      {
        id: 4,
        title: 'Elite Fitness Center',
        category: 'web',
        niche: 'Gym',
        image: gym1,
        images: [gym1, gym2, gym3, gym4, gym5],
        description: 'Class schedules, trainer profiles, and membership plans.',
        year: '2024',
        type: 'webpage',
      },
      {
        id: 5,
        title: 'Luxury Resort & Travel',
        category: 'web',
        niche: 'Hospitality',
        image: travel1,
        images: [travel1, travel2, travel3, travel4],
        description: 'Virtual tours, booking engine, and amenities showcase.',
        year: '2024',
        type: 'webpage',
      },
      {
        id: 6,
        title: 'Premium Real Estate',
        category: 'web',
        niche: 'Real Estate',
        image: real1,
        images: [real1, real2, real3],
        description: 'Property listings, 3D tours, and agent directory.',
        year: '2024',
        type: 'webpage',
      },
      {
        id: 7,
        title: 'Fine Dining Restaurant',
        category: 'web',
        niche: 'Restaurant',
        image: res1,
        images: [res1, res2, res3],
        description: 'Menu, reservation system, and chef spotlight.',
        year: '2024',
        type: 'webpage',
      },

      // SaaS
      { id: 8, title: 'TechFlow SaaS', category: 'saas', image: saas1, description: 'AI-powered workflow automation.', year: '2024', type: 'single' },
      { id: 9, title: 'Analytics Dashboard', category: 'saas', image: saas2, description: 'Real-time data visualization.', year: '2024', type: 'single' },
      { id: 10, title: 'Fintech App', category: 'saas', image: saas3, description: 'Secure payment processing.', year: '2024', type: 'single' },
      { id: 11, title: 'CRM Solution', category: 'saas', image: saas4, description: 'Customer automation platform.', year: '2024', type: 'single' },

      // Ads
      ...[ad1, ad2, ad3, ad4, ad5, ad6, ad7, ad8, ad9].map((img, i) => ({
        id: 12 + i,
        title: `Campaign Ad ${i + 1}`,
        category: 'ads',
        image: img,
        description: 'High-impact digital advertisement.',
        year: i < 5 ? '2024' : '2023',
        type: 'single' as const,
      })),

      // Logos
      ...[logo1, logo2, logo3, logo4, logo5, logo6, logo7].map((img, i) => ({
        id: 21 + i,
        title: `Brand Logo ${i + 1}`,
        category: 'logo',
        image: img,
        description: 'Professional logo design.',
        year: '2024',
        type: 'single' as const,
      })),
    ],
    []
  );

  const filteredProjects = useMemo(
    () => (activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory)),
    [activeCategory, projects]
  );

  // ================== HANDLERS ==================
  const handleBackToHome = useCallback(() => setCurrentPage?.('home'), [setCurrentPage]);

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setZoomLevel(1);
    setIsFullscreen(false);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    setZoomLevel(1);
    setShowMagnifier(false);
  }, []);

  const nextImage = useCallback(() => {
    if (selectedProject?.images && selectedProject.images.length > 1) {
      setCurrentImageIndex(prev => (prev + 1) % selectedProject.images!.length);
      setZoomLevel(1);
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject?.images && selectedProject.images.length > 1) {
      setCurrentImageIndex(prev => (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length);
      setZoomLevel(1);
    }
  }, [selectedProject]);

  const handleDoubleClick = useCallback(() => {
    setZoomLevel(prev => (prev === 1 ? 2 : 1));
  }, []);

  const zoomIn = useCallback(() => setZoomLevel(prev => Math.min(prev + 0.5, 3)), []);
  const zoomOut = useCallback(() => setZoomLevel(prev => Math.max(prev - 0.5, 0.5)), []);
  const resetZoom = useCallback(() => setZoomLevel(1), []);
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
    setZoomLevel(1);
  }, []);

  // Magnifier
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (!showMagnifier || !imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMagnifierPos({ x: e.clientX, y: e.clientY });
    },
    [showMagnifier]
  );

  useEffect(() => {
    setShowMagnifier(zoomLevel > 1);
  }, [zoomLevel]);

  // Keyboard Navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closeProject();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    selectedProject,
    closeProject,
    prevImage,
    nextImage,
    toggleFullscreen,
    zoomIn,
    zoomOut,
    resetZoom,
  ]);

  const currentImage = selectedProject?.images
    ? selectedProject.images[currentImageIndex]
    : selectedProject?.image;

  // ================== RENDER ==================
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.12),transparent_60%)] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <button
              onClick={handleBackToHome}
              className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors mb-8 group text-sm md:text-base"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>

            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Our <span className="text-yellow-400">Portfolio</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                Excellence in design, innovation in execution — across industries.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['150+', '98%', '25+', '50+'].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">{stat}</div>
                    <p className="text-gray-300 text-sm">
                      {['Projects', 'Satisfaction', 'Industries', 'Awards'][i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Grid */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center mb-6 text-gray-600">
              <Filter className="w-5 h-5 mr-2" />
              <span className="font-medium">Filter by category</span>
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-medium text-xs transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-md scale-105'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat.label} <span className="ml-1 opacity-70">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                onClick={() => openProject(project)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <Suspense fallback={<SkeletonCard />}>
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </Suspense>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{project.title}</h3>
                      {project.niche && <p className="text-yellow-400 text-sm font-medium">{project.niche}</p>}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.category}
                  </div>
                  {project.images && project.images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold backdrop-blur-sm">
                      {project.images.length} pages
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
            onClick={closeProject}
          >
            <div
              className={`relative w-full bg-black rounded-2xl overflow-hidden ${
                isFullscreen ? 'h-full rounded-none' : 'max-w-7xl max-h-[95vh]'
              }`}
              onClick={e => e.stopPropagation()}
            >
              {/* Magnifier Lens */}
              {showMagnifier && zoomLevel > 1 && imageRef.current && (
                <div
                  className="fixed w-40 h-40 border-4 border-yellow-400 rounded-full pointer-events-none z-50 shadow-2xl overflow-hidden"
                  style={{
                    left: magnifierPos.x - 80,
                    top: magnifierPos.y - 80,
                    backgroundImage: `url(${currentImage})`,
                    backgroundSize: `${imageRef.current.offsetWidth * zoomLevel * 2}px`,
                    backgroundPosition: `${
                      -((magnifierPos.x - imageRef.current.getBoundingClientRect().left) * zoomLevel)
                    }px ${
                      -((magnifierPos.y - imageRef.current.getBoundingClientRect().top) * zoomLevel)
                    }px`,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}

              {/* Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between z-40">
                <div className="flex gap-2">
                  <button
                    onClick={zoomIn}
                    className="p-3 bg-black/70 backdrop-blur rounded-full text-white hover:bg-yellow-600 transition"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button
                    onClick={zoomOut}
                    className="p-3 bg-black/70 backdrop-blur rounded-full text-white hover:bg-yellow-600 transition"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button
                    onClick={resetZoom}
                    className="px-4 py-2 bg-black/70 backdrop-blur rounded-full text-white text-sm hover:bg-yellow-600 transition"
                  >
                    Reset
                  </button>
                  {selectedProject.type === 'webpage' && (
                    <button
                      onClick={toggleFullscreen}
                      className="p-3 bg-black/70 backdrop-blur rounded-full text-white hover:bg-yellow-600 transition"
                      aria-label="Toggle fullscreen"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={closeProject}
                  className="p-3 bg-red-600/80 backdrop-blur rounded-full text-white hover:bg-red-700 transition"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image Container */}
              <div className="flex items-center justify-center h-full p-8 md:p-12 overflow-auto">
                <div className="relative max-w-full max-h-full">
                  <Suspense fallback={<div className="w-96 h-96 bg-gray-800 rounded-lg animate-pulse" />}>
                    <OptimizedImage
                      ref={imageRef}
                      src={currentImage}
                      alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain transition-transform duration-300"
                      style={{ transform: `scale(${zoomLevel})` }}
                      onDoubleClick={handleDoubleClick}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setShowMagnifier(false)}
                    />
                  </Suspense>

                  {/* Navigation Arrows */}
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur rounded-full text-white hover:bg-yellow-600 transition"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur rounded-full text-white hover:bg-yellow-600 transition"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Project Info */}
              {!isFullscreen && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-1">{selectedProject.title}</h2>
                  {selectedProject.niche && (
                    <p className="text-yellow-400 font-medium text-lg">{selectedProject.niche}</p>
                  )}
                  <p className="text-gray-300 mt-2 text-sm md:text-base">{selectedProject.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      {selectedProject.year}
                    </span>
                    {selectedProject.images && (
                      <span className="text-sm text-gray-400">
                        {currentImageIndex + 1} / {selectedProject.images.length}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioPage;
