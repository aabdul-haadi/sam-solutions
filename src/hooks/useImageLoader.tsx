import { useState, useEffect } from 'react';

interface ImageState {
  src: string;
  loaded: boolean;
  error: boolean;
}

export const useImageLoader = (
  importFn: () => Promise<{ default: string }>,
  placeholder: string
): ImageState => {
  const [state, setState] = useState<ImageState>({
    src: placeholder,
    loaded: false,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;
    importFn()
      .then((mod) => {
        if (!cancelled) {
          setState({ src: mod.default, loaded: true, error: false });
        }
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, error: true }));
      });
    return () => {
      cancelled = true;
    };
  }, [importFn, placeholder]);

  return state;
};