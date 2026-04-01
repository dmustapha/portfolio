'use client';

import { useCallback, useEffect, useRef } from 'react';
import { GridOverlays } from '@/components/layout/GridOverlays';
import { CoralDivider } from '@/components/layout/CoralDivider';
import { DotNav } from '@/components/layout/DotNav';
import { Sidebar } from '@/components/layout/Sidebar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useDotNavSync } from '@/hooks/useDotNavSync';
import { useRevealAnimations } from '@/hooks/useRevealAnimations';
import { useFullpageScroll } from '@/hooks/useFullpageScroll';

export default function Home() {
  const isMobile = useIsMobile();
  const { activeSection, activateSection } = useDotNavSync(isMobile);

  const {
    revealSection,
    resetSection,
    setupProjectsObserver,
    teardownProjectsObserver,
  } = useRevealAnimations({ isMobile });

  // ── Projects scroll boundary check ──
  const onProjectsScrollCheck = useCallback(() => {
    const wrapper = document.getElementById('projects');
    if (!wrapper) return { atTop: true, atBottom: true };
    const atTop = wrapper.scrollTop <= 1;
    const atBottom = wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 1;
    return { atTop, atBottom };
  }, []);

  // ── Section change handler (called by fullpage scroll) ──
  const handleSectionChange = useCallback(
    (idx: number, prevIdx: number) => {
      const mainCol = document.querySelector('.main-col');
      if (!mainCol) return;
      const sections = mainCol.querySelectorAll('.section-content, .projects-wrapper');

      const target = sections[idx];
      const prev = sections[prevIdx];

      const isTargetProjects =
        target?.id === 'projects' || target?.getAttribute('data-observe') === 'projects';
      const isPrevProjects =
        prev?.id === 'projects' || prev?.getAttribute('data-observe') === 'projects';

      // Teardown projects observer when leaving
      if (isPrevProjects && !isTargetProjects) {
        teardownProjectsObserver();
      }

      // Reset previous section reveals
      if (prev && prevIdx !== idx) {
        resetSection(prev);
      }

      // Update dot nav + sidebar
      const observeId = target?.getAttribute('data-observe') || target?.id;
      if (observeId) activateSection(observeId);

      if (isTargetProjects) {
        // Reset scroll position based on direction
        const wrapper = document.getElementById('projects');
        if (wrapper) {
          wrapper.scrollTop = prevIdx < idx ? 0 : wrapper.scrollHeight;
        }

        // Setup observer and reveal featured cards
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setupProjectsObserver();
          });
        });
      } else if (target) {
        revealSection(target);

        // Re-trigger coral underline on hero
        if (idx === 0) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const heroLine = document.getElementById('heroLine');
              if (heroLine) {
                heroLine.classList.remove('animate');
                void heroLine.offsetWidth;
                heroLine.classList.add('animate');
              }
            });
          });
        }
      }
    },
    [activateSection, resetSection, revealSection, setupProjectsObserver, teardownProjectsObserver]
  );

  // ── isOnProjects check ──
  const currentFullpageIdxRef = useRef(0);
  const isOnProjects = useCallback(() => {
    const mainCol = document.querySelector('.main-col');
    if (!mainCol) return false;
    const sections = mainCol.querySelectorAll('.section-content, .projects-wrapper');
    const section = sections[currentFullpageIdxRef.current];
    return (
      section?.id === 'projects' ||
      section?.getAttribute('data-observe') === 'projects'
    );
  }, []);

  // Wrap onSectionChange to track current index
  const handleSectionChangeTracked = useCallback(
    (idx: number, prevIdx: number) => {
      currentFullpageIdxRef.current = idx;
      handleSectionChange(idx, prevIdx);
    },
    [handleSectionChange]
  );

  const fullpage = useFullpageScroll({
    isMobile,
    onSectionChange: handleSectionChangeTracked,
    onProjectsScrollCheck,
    isOnProjects,
  });

  // Sync fullpage idx ref
  useEffect(() => {
    currentFullpageIdxRef.current = fullpage.currentIdxRef.current;
  });

  // ── Dot nav click ──
  const handleDotClick = useCallback(
    (id: string) => {
      if (isMobile) {
        const target =
          document.querySelector(`[data-observe="${id}"]`) ||
          document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          activateSection(id);
        }
        return;
      }
      fullpage.goToSectionById(id);
    },
    [isMobile, fullpage, activateSection]
  );

  // ── CTA navigate ──
  const handleNavigate = useCallback(
    (id: string) => {
      if (isMobile) {
        const target =
          document.querySelector(`[data-observe="${id}"]`) ||
          document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          activateSection(id);
        }
        return;
      }
      fullpage.goToSectionById(id);
    },
    [isMobile, fullpage, activateSection]
  );

  // ── Mobile safety net ──
  useEffect(() => {
    if (isMobile !== true) return;

    const mainCol = document.querySelector('.main-col') as HTMLElement;
    if (mainCol) {
      mainCol.style.transform = 'none';
      mainCol.style.willChange = 'auto';
    }

    const layout = document.querySelector('.architect-layout') as HTMLElement;
    if (layout) {
      layout.style.height = 'auto';
      layout.style.overflow = 'visible';
      layout.style.minHeight = '0';
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          if (mainCol && mainCol.style.transform && mainCol.style.transform !== 'none') {
            mainCol.style.transform = 'none';
          }
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Don't render until isMobile is resolved (prevent hydration mismatch)
  if (isMobile === null) {
    return <div style={{ background: '#0F0F0F', height: '100vh' }} />;
  }

  return (
    <>
      <GridOverlays />
      <CoralDivider />
      <DotNav activeSection={activeSection} onDotClick={handleDotClick} />

      <section id="hero">
        <div className="architect-layout">
          <Sidebar activeSection={activeSection} />

          <div className="main-col">
            <HeroSection onNavigate={handleNavigate} />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </div>
        </div>
      </section>
    </>
  );
}
