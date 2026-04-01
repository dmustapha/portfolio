import { useEffect, useRef, useCallback } from 'react';

interface RevealOptions {
  isMobile: boolean | null;
}

// Extend Element to track animation state
declare global {
  interface HTMLElement {
    _revealAnim?: Animation | null;
    _revealComplete?: boolean;
  }
}

export function useRevealAnimations({ isMobile }: RevealOptions) {
  const projectsObserverRef = useRef<IntersectionObserver | null>(null);

  // ── Desktop: triggerReveal for a single element ──
  const triggerReveal = useCallback((el: HTMLElement) => {
    let fromTransform: string;
    let duration: number;

    if (el.classList.contains('reveal-right')) {
      fromTransform = 'translateX(80px)';
      duration = 900;
    } else if (el.classList.contains('reveal-left')) {
      fromTransform = 'translateX(-80px)';
      duration = 900;
    } else if (el.classList.contains('reveal-up')) {
      fromTransform = 'translateY(30px)';
      duration = 600;
    } else {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    // Parse delay from delay-N class
    let delay = 0;
    const classes = el.className.split(' ');
    for (const cls of classes) {
      const match = cls.match(/^delay-(\d)$/);
      if (match) { delay = parseInt(match[1], 10) * 100; break; }
    }

    // Cancel existing animation
    if (el._revealAnim) {
      try { el._revealAnim.cancel(); } catch { /* ok */ }
      el._revealAnim = null;
    }

    // Set hidden state
    el.style.opacity = '0';
    el.style.transform = fromTransform;
    void el.offsetWidth; // Force reflow

    const anim = el.animate(
      [
        { opacity: 0, transform: fromTransform },
        { opacity: 1, transform: 'translateX(0) translateY(0)' },
      ],
      {
        duration,
        delay,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards',
      }
    );

    if (typeof anim.persist === 'function') anim.persist();
    el._revealAnim = anim;

    anim.onfinish = () => {
      try {
        if (typeof anim.commitStyles === 'function') {
          anim.commitStyles();
        } else {
          el.style.opacity = '1';
          el.style.transform = 'translateX(0) translateY(0)';
        }
      } catch {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0) translateY(0)';
      }
      try { anim.cancel(); } catch { /* ok */ }
      el._revealAnim = null;
      el._revealComplete = true;
    };
  }, []);

  // ── Desktop: resetReveal for a single element ──
  const resetReveal = useCallback((el: HTMLElement) => {
    if (el._revealAnim) {
      try { el._revealAnim.cancel(); } catch { /* ok */ }
      el._revealAnim = null;
    }
    el._revealComplete = false;

    if (el.classList.contains('reveal-right')) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(80px)';
    } else if (el.classList.contains('reveal-left')) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-80px)';
    } else if (el.classList.contains('reveal-up')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    }
  }, []);

  // ── Reveal all elements within a section ──
  const revealSection = useCallback(
    (sectionEl: Element) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const reveals = sectionEl.querySelectorAll('.reveal-right, .reveal-left, .reveal-up');
          reveals.forEach((el) => triggerReveal(el as HTMLElement));
        });
      });
    },
    [triggerReveal]
  );

  // ── Reset all elements within a section ──
  const resetSection = useCallback(
    (sectionEl: Element) => {
      const reveals = sectionEl.querySelectorAll('.reveal-right, .reveal-left, .reveal-up');
      reveals.forEach((el) => resetReveal(el as HTMLElement));
    },
    [resetReveal]
  );

  // ── Setup IntersectionObserver for projects grid cards ──
  const setupProjectsObserver = useCallback(() => {
    const wrapper = document.getElementById('projects');
    if (!wrapper) return;

    // Disconnect previous observer
    if (projectsObserverRef.current) {
      projectsObserverRef.current.disconnect();
      projectsObserverRef.current = null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (!el._revealComplete) {
              triggerReveal(el);
            }
            observer.unobserve(el);
          }
        });
      },
      { root: wrapper, threshold: 0.15 }
    );

    const reveals = wrapper.querySelectorAll('.reveal-right, .reveal-left, .reveal-up');
    reveals.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (!htmlEl._revealComplete) {
        observer.observe(el);
      }
    });

    projectsObserverRef.current = observer;
  }, [triggerReveal]);

  // ── Teardown projects observer ──
  const teardownProjectsObserver = useCallback(() => {
    if (projectsObserverRef.current) {
      projectsObserverRef.current.disconnect();
      projectsObserverRef.current = null;
    }
  }, []);

  // ── Desktop init: set hidden state on all reveal elements ──
  useEffect(() => {
    if (isMobile !== false) return;

    const allReveals = document.querySelectorAll('.reveal-right, .reveal-left, .reveal-up');
    allReveals.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.classList.contains('reveal-right')) {
        htmlEl.style.opacity = '0';
        htmlEl.style.transform = 'translateX(80px)';
      } else if (htmlEl.classList.contains('reveal-left')) {
        htmlEl.style.opacity = '0';
        htmlEl.style.transform = 'translateX(-80px)';
      } else if (htmlEl.classList.contains('reveal-up')) {
        htmlEl.style.opacity = '0';
        htmlEl.style.transform = 'translateY(30px)';
      }
    });

    // Hero auto-reveal on load (double-rAF)
    const handleLoad = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const heroReveals = document.querySelectorAll(
            '[data-observe="hero"] .reveal-right, [data-observe="hero"] .reveal-left, [data-observe="hero"] .reveal-up'
          );
          heroReveals.forEach((el) => triggerReveal(el as HTMLElement));

          const heroLine = document.getElementById('heroLine');
          if (heroLine) {
            heroLine.classList.remove('animate');
            void heroLine.offsetWidth;
            heroLine.classList.add('animate');
          }
        });
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isMobile, triggerReveal]);

  // ── Mobile: IntersectionObserver for reveals ──
  useEffect(() => {
    if (isMobile !== true) return;

    const revealElements = document.querySelectorAll('.reveal-right, .reveal-left, .reveal-up');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    requestAnimationFrame(() => {
      revealElements.forEach((el) => observer.observe(el));
    });

    // Hero safety net + coral underline on mobile
    requestAnimationFrame(() => {
      const heroReveals = document.querySelectorAll(
        '[data-observe="hero"] .reveal-right, [data-observe="hero"] .reveal-left, [data-observe="hero"] .reveal-up'
      );
      heroReveals.forEach((el) => el.classList.add('revealed'));

      const heroLine = document.getElementById('heroLine');
      if (heroLine) heroLine.classList.add('animate');
    });

    return () => observer.disconnect();
  }, [isMobile]);

  // ── Mobile: coral underline observer ──
  useEffect(() => {
    if (isMobile !== true) return;
    const heroLine = document.getElementById('heroLine');
    if (!heroLine) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(heroLine);

    return () => observer.disconnect();
  }, [isMobile]);

  return {
    revealSection,
    resetSection,
    setupProjectsObserver,
    teardownProjectsObserver,
    triggerReveal,
    resetReveal,
  };
}
