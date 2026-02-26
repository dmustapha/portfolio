import { useEffect, useRef, useCallback } from 'react';

interface FullpageScrollOptions {
  isMobile: boolean | null;
  onSectionChange: (idx: number, prevIdx: number) => void;
  onCarouselNavigate: (direction: number) => boolean; // returns true if carousel handled it
  isOnProjects: () => boolean;
}

export function useFullpageScroll({
  isMobile,
  onSectionChange,
  onCarouselNavigate,
  isOnProjects,
}: FullpageScrollOptions) {
  const currentIdxRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const accumulatedDeltaXRef = useRef(0);
  const deltaResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mainColRef = useRef<HTMLElement | null>(null);
  const sectionsRef = useRef<NodeListOf<Element> | null>(null);

  const DELTA_THRESHOLD = 150;
  const COOLDOWN = 900;
  const ANIMATION_DURATION = 700;

  const goToSection = useCallback(
    (idx: number) => {
      const mainCol = mainColRef.current;
      const sections = sectionsRef.current;
      if (!mainCol || !sections) return;
      if (idx < 0 || idx >= sections.length || isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      const previousIdx = currentIdxRef.current;
      currentIdxRef.current = idx;

      const target = sections[idx] as HTMLElement;
      const offsetTop = target.offsetTop - mainCol.offsetTop;
      const targetTransform = `translateY(-${offsetTop}px)`;
      const fromTransform = mainCol.style.transform || 'translateY(0px)';

      const anim = mainCol.animate(
        [{ transform: fromTransform }, { transform: targetTransform }],
        {
          duration: ANIMATION_DURATION,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          fill: 'forwards',
        }
      );

      anim.onfinish = () => {
        mainCol.style.transform = targetTransform;
        try { anim.cancel(); } catch { /* ok */ }
        onSectionChange(idx, previousIdx);
      };

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, COOLDOWN);
    },
    [onSectionChange]
  );

  // Navigate to section by ID (for dot nav + CTA clicks)
  const goToSectionById = useCallback(
    (id: string) => {
      const sections = sectionsRef.current;
      if (!sections) return;
      for (let i = 0; i < sections.length; i++) {
        if (
          sections[i].getAttribute('data-observe') === id ||
          sections[i].id === id
        ) {
          goToSection(i);
          return;
        }
      }
    },
    [goToSection]
  );

  // Mount: capture DOM refs and attach event listeners
  useEffect(() => {
    if (isMobile !== false) return; // Only desktop

    const mainCol = document.querySelector('.main-col') as HTMLElement;
    if (!mainCol) return;
    mainColRef.current = mainCol;
    sectionsRef.current = mainCol.querySelectorAll('.section-content, .projects-wrapper');

    // ── Wheel handler ──
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const onProjects = isOnProjects();
      const isHorizontal = onProjects && Math.abs(e.deltaX) > Math.abs(e.deltaY);

      if (isHorizontal) {
        accumulatedDeltaXRef.current += e.deltaX;
        accumulatedDeltaRef.current = 0;

        if (deltaResetTimerRef.current) clearTimeout(deltaResetTimerRef.current);
        deltaResetTimerRef.current = setTimeout(() => {
          accumulatedDeltaXRef.current = 0;
        }, 200);

        if (Math.abs(accumulatedDeltaXRef.current) < DELTA_THRESHOLD) return;

        const hDir = accumulatedDeltaXRef.current > 0 ? 1 : -1;
        accumulatedDeltaXRef.current = 0;

        if (isAnimatingRef.current) return;
        onCarouselNavigate(hDir);
        return;
      }

      // Vertical accumulator
      accumulatedDeltaRef.current += e.deltaY;
      accumulatedDeltaXRef.current = 0;

      if (deltaResetTimerRef.current) clearTimeout(deltaResetTimerRef.current);
      deltaResetTimerRef.current = setTimeout(() => {
        accumulatedDeltaRef.current = 0;
      }, 200);

      if (Math.abs(accumulatedDeltaRef.current) < DELTA_THRESHOLD) return;

      const direction = accumulatedDeltaRef.current > 0 ? 1 : -1;
      accumulatedDeltaRef.current = 0;

      // On projects: vertical wheel navigates carousel, fullpage only at boundaries
      if (onProjects) {
        if (isAnimatingRef.current) return;
        const handled = onCarouselNavigate(direction);
        if (handled) return;
        // At carousel boundary — fall through to fullpage
      }

      if (isAnimatingRef.current) return;
      goToSection(currentIdxRef.current + direction);
    };

    // ── Keyboard handler ──
    const handleKeydown = (e: KeyboardEvent) => {
      const onProjects = isOnProjects();

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToSection(currentIdxRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSection(currentIdxRef.current - 1);
      } else if (e.key === 'ArrowRight' && onProjects) {
        const tag = document.activeElement?.tagName;
        if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT') return;
        e.preventDefault();
        onCarouselNavigate(1);
      } else if (e.key === 'ArrowLeft' && onProjects) {
        const tag = document.activeElement?.tagName;
        if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT') return;
        e.preventDefault();
        onCarouselNavigate(-1);
      }
    };

    // ── Touch handler ──
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const deltaX = Math.abs(touchStartX - e.changedTouches[0].clientX);
      if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > deltaX) {
        if (deltaY > 0) goToSection(currentIdxRef.current + 1);
        else goToSection(currentIdxRef.current - 1);
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      if (deltaResetTimerRef.current) clearTimeout(deltaResetTimerRef.current);
    };
  }, [isMobile, goToSection, onCarouselNavigate, isOnProjects]);

  return { currentIdxRef, isAnimatingRef, goToSection, goToSectionById };
}
