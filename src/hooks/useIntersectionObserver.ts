import { useRef, useState, useEffect, useCallback } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver(options: IntersectionObserverOptions = {}) {
  const [inView, setInView] = useState(false);
  const elementRef = useRef<Element | null>(null);

  const observerRef = useCallback((element: Element | null) => {
    if (elementRef.current) {
      // Clean up old observer
      elementRef.current = null;
    }

    if (element) {
      elementRef.current = element;
      const observer = new IntersectionObserver(([entry]) => {
        setInView(entry.isIntersecting);
      }, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
      });

      observer.observe(element);

      return () => {
        observer.disconnect();
        elementRef.current = null;
      };
    }
  }, [options.threshold, options.rootMargin]);

  return { observerRef, inView };
}