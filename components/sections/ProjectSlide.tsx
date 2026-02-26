import type { Project } from '@/lib/types';
import { TechTag } from '@/components/ui/TechTag';
import { ProjectLink } from '@/components/ui/ProjectLink';

interface ProjectSlideProps {
  project: Project;
  index: number;
  totalProjects: number;
  currentDisplayIdx: number;
}

export function ProjectSlide({ project, index, totalProjects, currentDisplayIdx }: ProjectSlideProps) {
  const dir = project.revealDirection;

  return (
    <div
      className={`project-snap-section${project.isAlt ? ' section-alt' : ''}`}
      data-project={index}
    >
      <div className="relative z-10">
        <div className={`reveal-${dir}`}>
          <div className="project-name">{project.name}</div>
          <div className="project-chain">
            {project.chain} &middot; {project.type}
          </div>
        </div>
        <div className={`reveal-${dir} delay-1`}>
          <p className="project-desc">{project.description}</p>
        </div>
        <div
          className={`reveal-${dir} delay-2`}
          style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}
        >
          {project.tech.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </div>
        <div
          className={`reveal-${dir} delay-3`}
          style={{ marginTop: '1.5rem', display: 'flex', gap: '1.25rem' }}
        >
          {project.links.map((link) => (
            <ProjectLink key={link.label} link={link} />
          ))}
        </div>
      </div>

      {/* Nav arrows + counter */}
      <div className="projects-nav-arrows">
        <button
          className="proj-arrow-prev"
          aria-label="Previous project"
          disabled={index === 0}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5m6-6l-6 6 6 6" />
          </svg>
        </button>
        <div className="project-counter">
          <span className="project-counter-current">{currentDisplayIdx + 1}</span> / {totalProjects}
        </div>
        <button
          className="proj-arrow-next"
          aria-label="Next project"
          disabled={index === totalProjects - 1}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
