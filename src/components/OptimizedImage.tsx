// src/components/OptimizedImage.tsx
import React, { useState, useRef, useEffect, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  placeholder?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  placeholder,
  alt,
  className,
  loading = 'lazy',
  width,
  height,
  style,
  priority = false,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const currentSrc = isInView ? src : placeholder;
  const showPlaceholder = !isInView || (!isLoaded && !hasError);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {showPlaceholder && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-30"
          loading="eager"
        />
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : loading}
        decoding="async"
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage };
