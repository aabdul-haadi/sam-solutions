
import React, { memo, useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { ImageSkeleton } from './ImageSkeleton';
import { useImageLoader } from '../hooks/useImageLoader';

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

const placeholderMap: Record<string, string> = {
  // This would be populated with the actual placeholders
};

const getPlaceholder = (importFn: () => Promise<any>): string => {
  const match = importFn.toString().match(/['"]([^'"]+)['"]/);
  const key = match ? match[1].split('/').pop()?.split('.').shift() || 'cons1' : 'cons1';
  return placeholderMap[key] || '';
};

const ModalImage = memo(({ importFn, alt }: { importFn: () => Promise<{ default: string }>; alt: string }) => {
  const placeholder = getPlaceholder(importFn);
  const { src, loaded } = useImageLoader(importFn, placeholder);

  return (
    <React.Suspense fallback={<ImageSkeleton />}>
      <OptimizedImage
        src={src}
        alt={alt}
        className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
      />
      {!loaded && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-md"
          style={{ backgroundImage: `url(${placeholder})` }}
        />
      )}
    </React.Suspense>
  );
});

interface PortfolioModalProps {
  project: Project;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
  const [magnifierStyle, setMagnifierStyle] = useState<any>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const nextImage = useCallback(() => {
    if (project?.slides && project.slides.length > 1) {
      setCurrentImageIndex((i) => (i === project.slides!.length - 1 ? 0 : i + 1));
      setZoomLevel(1);
      setShowMagnifier(false);
    }
  }, [project]);

  const prevImage = useCallback(() => {
    if (project?.slides && project.slides.length > 1) {
      setCurrentImageIndex((i) => (i === 0 ? project.slides!.length - 1 : i - 1));
      setZoomLevel(1);
      setShowMagnifier(false);
    }
  }, [project]);
    const zoomIn = useCallback(() => {
    setZoomLevel((z) => {
      const newZ = Math.min(z + 0.5, 3);
      if (!isMobile && newZ > 1) setShowMagnifier(true);
      return newZ;
    });
  }, [isMobile]);

  const zoomOut = useCallback(() => {
    setZoomLevel((z) => {
      const newZ = Math.max(z - 0.5, 0.5);
      if (!isMobile && newZ <= 1) setShowMagnifier(false);
      return newZ;
    });
  }, [isMobile]);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setShowMagnifier(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((f) => !f);
    setZoomLevel(1);
    setShowMagnifier(false);
  }, []);

  // Magnifier
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (!showMagnifier || isMobile) return;
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setMagnifierStyle({
        backgroundPosition: `${x}% ${y}%`,
        left: e.pageX - 75,
        top: e.pageY - 75,
      });
    },
    [showMagnifier, isMobile]
  );

  const handleMouseEnter = useCallback(() => {
    if (zoomLevel > 1 && !isMobile) setShowMagnifier(true);
  }, [zoomLevel, isMobile]);

  const handleMouseLeave = useCallback(() => {
    setShowMagnifier(false);
  }, []);

  // Touch swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX === null) return;
      const diff = touchStartX - e.touches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextImage();
        else prevImage();
        setTouchStartX(null);
      }
    },
    [touchStartX, nextImage, prevImage]
  );

    const handleTouchEnd = useCallback(() => {
    setTouchStartX(null);
  }, []);

  // Pre-load next image
  useEffect(() => {
    if (!project?.slides) return;
    const nextIdx = (currentImageIndex + 1) % project.slides.length;
    const img = new Image();
    project.slides[nextIdx]().then((m) => (img.src = m.default));
  }, [project, currentImageIndex]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!project) return;
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'f':
        case 'F':
          if (project.type === 'webpage') toggleFullscreen();
          break;
        case '+':
        case '=':
          if (!isMobile) zoomIn();
          break;
        case '-':
          if (!isMobile) zoomOut();
          break;
        case '0':
          if (!isMobile) resetZoom();
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, onClose, prevImage, nextImage, toggleFullscreen, zoomIn, zoomOut, resetZoom, isMobile]);


  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      {showMagnifier && !isMobile && (
        <div
          className="fixed w-24 sm:w-32 h-24 sm:h-32 border-2 border-yellow-400 rounded-full pointer-events-none z-60 shadow-2xl"
          style={{
            ...magnifierStyle,
            backgroundImage: `url(${(project.slides ? project.slides[currentImageIndex] : project.thumb)().then(m => m.default)})`,
            backgroundSize: '300%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
      <div
        className={`relative w-full bg-black rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
          project.type === 'webpage' && isFullscreen ? 'max-w-none max-h-none h-full rounded-none' : 'max-w-[95vw] sm:max-w-5xl max-h-[90vh]'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500/40 transition-all duration-300 border border-red-400/30"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-30 flex space-x-1 sm:space-x-2">
          {!isMobile && (
            <>
              <button onClick={zoomIn} className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-yellow-500/70 transition-all duration-300 border border-white/20" title="Zoom In (+)">
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button onClick={zoomOut} className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-yellow-500/70 transition-all duration-300 border border-white/20" title="Zoom Out (-)">
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button onClick={resetZoom} className="px-2 sm:px-4 py-1 sm:py-2 bg-black/70 backdrop-blur-md rounded-full text-white text-xs sm:text-sm hover:bg-yellow-500/70 transition-all duration-300 border border-white/20" title="Reset Zoom (0)">
                Reset
              </button>
            </>
          )}
          {project.type === 'webpage' && (
            <button onClick={toggleFullscreen} className="w-10 h-10 sm:w-12 sm:h-12 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-yellow-500/70 transition-all duration-300 border border-white/20" title="Toggle Fullscreen (F)">
              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
        <div className="w-full h-full flex items-center justify-center overflow-auto" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          {project.slides ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <ModalImage importFn={project.slides[currentImageIndex]} alt={`${project.title} - ${currentImageIndex + 1}`} />
              {project.slides.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-yellow-500/70 transition-all duration-300 border border-white/20">
                    <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                  </button>
                  <button onClick={nextImage} className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-yellow-500/70 transition-all duration-300 border border-white/20">
                    <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                  </button>
                </>
              )}
              {project.slides.length > 1 && !isFullscreen && (
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 bg-black/70 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
                  {project.slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                        i === currentImageIndex ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <ModalImage importFn={project.thumb} alt={project.title} />
          )}
        </div>
        {!isFullscreen && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-bold mb-1">{project.title}</h2>
                {project.niche && <div className="text-yellow-400 text-sm sm:text-lg font-semibold">{project.niche}</div>}
              </div>
              {project.slides && project.slides.length > 1 && (
                <span className="text-gray-400 text-xs sm:text-sm bg-white/10 px-2 sm:px-3 py-1 rounded-full backdrop-blur-md">
                  {currentImageIndex + 1} / {project.slides.length}
                </span>
              )}
            </div>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-3">{project.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 text-xs sm:text-sm md:text-base font-bold bg-yellow-400/20 px-2 sm:px-3 py-1 rounded-full">{project.year}</span>
              {project.type === 'webpage' && (
                <span className="text-gray-400 text-xs sm:text-sm">
                  Full-screen webpage • Press F for fullscreen {isMobile ? '' : '• +/- to zoom'}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioModal;
