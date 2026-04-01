'use client';

import { useCallback } from 'react';
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

export default function Home() {
  const isMobile = useIsMobile();
  const { activeSection, activateSection } = useDotNavSync(isMobile);

  useRevealAnimations({ isMobile });

  // ── Dot nav click ──
  const handleDotClick = useCallback(
    (id: string) => {
      const target =
        document.querySelector(`[data-observe="${id}"]`) ||
        document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        activateSection(id);
      }
    },
    [activateSection]
  );

  // ── CTA navigate ──
  const handleNavigate = useCallback(
    (id: string) => {
      const target =
        document.querySelector(`[data-observe="${id}"]`) ||
        document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        activateSection(id);
      }
    },
    [activateSection]
  );

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
