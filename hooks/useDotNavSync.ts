import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Keeps activeSection in sync across dot nav, sidebar, and scroll position.
 * - Desktop: updated imperatively via activateSection callback from fullpage hook.
 * - Mobile: IntersectionObserver on [data-observe] sections.
 */
export function useDotNavSync(isMobile: boolean | null) {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const activateSection = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  // Mobile: IntersectionObserver for section tracking
  useEffect(() => {
    if (isMobile !== true) return;

    const sectionElements = document.querySelectorAll('[data-observe]');
    if (!sectionElements.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-observe');
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' }
    );

    sectionElements.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isMobile]);

  return { activeSection, activateSection };
}
