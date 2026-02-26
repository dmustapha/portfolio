import { navItems } from '@/lib/data';

const sectionLabels: Record<string, string> = {
  hero: 'Home',
  about: 'About',
  projects: 'Work',
  skills: 'Skills',
  contact: 'Contact',
};

interface DotNavProps {
  activeSection: string;
  onDotClick: (id: string) => void;
}

export function DotNav({ activeSection, onDotClick }: DotNavProps) {
  return (
    <nav className="dot-nav" aria-label="Section navigation">
      <span className="dot-nav-label" aria-live="polite">
        {sectionLabels[activeSection] || ''}
      </span>
      <div className="dot-nav-dots">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`dot-nav-item${activeSection === item.id ? ' active' : ''}`}
            data-section={item.id}
            aria-label={item.ariaLabel}
            onClick={() => onDotClick(item.id)}
          >
            <span className="dot-tooltip">{item.tooltip}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
