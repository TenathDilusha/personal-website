import { useEffect, useRef } from 'react';

export default function useReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const targets = root.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return containerRef;
}
