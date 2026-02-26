import { useEffect, useRef, useCallback } from 'react';
import { projects } from '@/lib/data';

interface CarouselOptions {
  isMobile: boolean | null;
  onRevealSlide: (slideIdx: number) => void;
  onResetSlide: (slideIdx: number) => void;
  onProjectIdxChange: (idx: number) => void;
}

export function useProjectCarousel({
  isMobile,
  onRevealSlide,
  onResetSlide,
  onProjectIdxChange,
}: CarouselOptions) {
  const currentProjectIdxRef = useRef(0);
  const isCarouselAnimatingRef = useRef(false);
  const lastRevealedIdxRef = useRef(-1);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSlides = projects.length;
  const COOLDOWN = 800;

  const goToProject = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= totalSlides || isCarouselAnimatingRef.current) return;
      isCarouselAnimatingRef.current = true;
      currentProjectIdxRef.current = idx;
      onProjectIdxChange(idx);

      const snap = document.getElementById('projectsSnap');
      if (!snap) return;
      const slides = snap.querySelectorAll('.project-snap-section');

      // Calculate scroll target from cumulative widths
      let targetLeft = 0;
      for (let i = 0; i < idx; i++) targetLeft += (slides[i] as HTMLElement).offsetWidth;
      snap.scrollTo({ left: targetLeft, behavior: 'smooth' });

      // Update arrow disabled states
      updateArrowStates(idx, slides.length);

      // Update counters
      const counters = document.querySelectorAll('.project-counter-current');
      counters.forEach((c) => { c.textContent = String(idx + 1); });

      // Reset other slides, reveal current
      slides.forEach((_, i) => {
        if (i !== idx) onResetSlide(i);
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          onRevealSlide(idx);
          lastRevealedIdxRef.current = idx;
        });
      });

      setTimeout(() => {
        isCarouselAnimatingRef.current = false;
      }, COOLDOWN);
    },
    [totalSlides, onRevealSlide, onResetSlide, onProjectIdxChange]
  );

  /**
   * Called by fullpage scroll when entering projects section.
   * Resets carousel to first or last slide based on direction.
   */
  const resetCarousel = useCallback(
    (fromBelow: boolean) => {
      const snap = document.getElementById('projectsSnap');
      if (!snap) return;
      const slides = snap.querySelectorAll('.project-snap-section');

      const idx = fromBelow ? slides.length - 1 : 0;
      currentProjectIdxRef.current = idx;
      onProjectIdxChange(idx);

      let targetLeft = 0;
      for (let i = 0; i < idx; i++) targetLeft += (slides[i] as HTMLElement).offsetWidth;
      snap.scrollTo({ left: targetLeft, behavior: 'instant' });

      updateArrowStates(idx, slides.length);
      lastRevealedIdxRef.current = idx;
    },
    [onProjectIdxChange]
  );

  /**
   * Navigate carousel by direction (+1/-1).
   * Returns true if handled, false if at boundary (let fullpage take over).
   */
  const navigateCarousel = useCallback(
    (direction: number): boolean => {
      if (isCarouselAnimatingRef.current) return true; // still animating, swallow input
      const nextIdx = currentProjectIdxRef.current + direction;
      if (nextIdx >= 0 && nextIdx < totalSlides) {
        goToProject(nextIdx);
        return true;
      }
      return false; // at boundary
    },
    [goToProject, totalSlides]
  );

  // Mount: attach scroll/scrollend listeners + arrow clicks + indicator clicks
  useEffect(() => {
    if (isMobile !== false) return;

    const snap = document.getElementById('projectsSnap');
    if (!snap) return;

    function getCurrentProjectIndex(): number {
      if (!snap) return 0;
      const scrollLeft = snap.scrollLeft;
      const slides = snap.querySelectorAll('.project-snap-section');
      let cumulative = 0;
      for (let i = 0; i < slides.length; i++) {
        const w = (slides[i] as HTMLElement).offsetWidth;
        if (scrollLeft < cumulative + w * 0.5) return i;
        cumulative += w;
      }
      return slides.length - 1;
    }

    function handleProjectScrollEnd() {
      if (isCarouselAnimatingRef.current) return;
      const idx = getCurrentProjectIndex();
      if (idx !== lastRevealedIdxRef.current) {
        lastRevealedIdxRef.current = idx;
        const slides = snap!.querySelectorAll('.project-snap-section');
        slides.forEach((_, i) => {
          if (i !== idx) onResetSlide(i);
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            onRevealSlide(idx);
          });
        });
      }
    }

    // scrollend support
    if ('onscrollend' in window) {
      snap.addEventListener('scrollend', handleProjectScrollEnd);
    }

    // Scroll tracking
    const handleScroll = () => {
      const idx = getCurrentProjectIndex();
      currentProjectIdxRef.current = idx;
      onProjectIdxChange(idx);
      updateArrowStates(idx, totalSlides);

      const counters = document.querySelectorAll('.project-counter-current');
      counters.forEach((c) => { c.textContent = String(idx + 1); });

      // Debounced scrollend fallback
      if (!('onscrollend' in window)) {
        if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
        scrollEndTimerRef.current = setTimeout(handleProjectScrollEnd, 200);
      }
    };

    snap.addEventListener('scroll', handleScroll);

    // Arrow button clicks
    const prevButtons = document.querySelectorAll('.proj-arrow-prev');
    const nextButtons = document.querySelectorAll('.proj-arrow-next');

    const handlePrev = () => goToProject(currentProjectIdxRef.current - 1);
    const handleNext = () => goToProject(currentProjectIdxRef.current + 1);

    prevButtons.forEach((btn) => btn.addEventListener('click', handlePrev));
    nextButtons.forEach((btn) => btn.addEventListener('click', handleNext));

    // Sidebar indicator clicks
    const indicators = document.querySelectorAll('.project-indicator');
    const indicatorHandlers: Array<() => void> = [];
    indicators.forEach((ind) => {
      const handler = () => {
        const targetIdx = parseInt(ind.getAttribute('data-proj-idx') || '0', 10);
        goToProject(targetIdx);
      };
      indicatorHandlers.push(handler);
      ind.addEventListener('click', handler);
    });

    return () => {
      if ('onscrollend' in window) {
        snap.removeEventListener('scrollend', handleProjectScrollEnd);
      }
      snap.removeEventListener('scroll', handleScroll);
      prevButtons.forEach((btn) => btn.removeEventListener('click', handlePrev));
      nextButtons.forEach((btn) => btn.removeEventListener('click', handleNext));
      indicators.forEach((ind, i) => ind.removeEventListener('click', indicatorHandlers[i]));
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    };
  }, [isMobile, goToProject, onRevealSlide, onResetSlide, onProjectIdxChange, totalSlides]);

  // Mobile: IntersectionObserver for vertical project tracking
  useEffect(() => {
    if (isMobile !== true) return;

    const sections = document.querySelectorAll('.project-snap-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-project') || '0', 10);
            onProjectIdxChange(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [isMobile, onProjectIdxChange]);

  return { currentProjectIdxRef, isCarouselAnimatingRef, goToProject, resetCarousel, navigateCarousel };
}

function updateArrowStates(idx: number, total: number) {
  document.querySelectorAll('.proj-arrow-prev').forEach((btn) => {
    (btn as HTMLButtonElement).disabled = idx <= 0;
  });
  document.querySelectorAll('.proj-arrow-next').forEach((btn) => {
    (btn as HTMLButtonElement).disabled = idx >= total - 1;
  });
}
