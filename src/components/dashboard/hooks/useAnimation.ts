import { useCallback } from 'react';

export function useAnimation() {
  const animate = useCallback((selector: string, keyframes: any, options: any = {}) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el, index) => {
      const delay = typeof options.delay === 'function' 
        ? options.delay(el, index) 
        : (options.delay || 0);

      el.animate(keyframes, {
        duration: options.duration || 300,
        delay,
        easing: options.easing || 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: options.fill || 'forwards'
      });
    });
  }, []);

  return { animate };
}