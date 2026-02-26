import { personalInfo } from '@/lib/data';
import { CTAButton } from '@/components/ui/CTAButton';

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="section-content" data-observe="hero">
      <div className="reveal-right">
        <div className="hero-name">I&apos;m {personalInfo.firstName}.</div>
      </div>

      <div className="reveal-right delay-2" style={{ marginTop: '1.5rem' }}>
        <p className="hero-tagline">
          {personalInfo.title}{' '}
          <span style={{ color: '#FF6B4A', margin: '0 0.5rem' }}>&middot;</span>{' '}
          {personalInfo.subtitle}
        </p>
      </div>

      <div className="coral-underline" id="heroLine" style={{ marginTop: '1.25rem' }} />

      <div className="reveal-right delay-4" style={{ marginTop: '1.5rem' }}>
        <p className="hero-description">{personalInfo.description}</p>
      </div>

      <div className="reveal-right delay-5" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <CTAButton
          href="#projects"
          onClick={(e) => { e.preventDefault(); onNavigate('projects'); }}
        >
          View Work
        </CTAButton>
        <CTAButton
          href="#contact"
          onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
        >
          Get in Touch
        </CTAButton>
      </div>
    </div>
  );
}
