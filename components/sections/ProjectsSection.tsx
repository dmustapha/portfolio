import { projects } from '@/lib/data';
import type { Project } from '@/lib/types';
import { TechTag } from '@/components/ui/TechTag';
import { ProjectLink } from '@/components/ui/ProjectLink';

const featuredProjects = projects.filter((p) => p.featured);
const gridProjects = projects.filter((p) => !p.featured);

function FeaturedCard({ project }: { project: Project }) {
  const dir = project.revealDirection;
  const isRight = dir === 'left';

  return (
    <div className={`featured-card${isRight ? ' featured-card-right' : ''}${project.isAlt ? ' section-alt' : ''}`}>
      <div className="featured-card-content">
        {project.badge && (
          <div className={`reveal-${dir}`}>
            <span className="winner-badge">{project.badge}</span>
          </div>
        )}
        <div className={`reveal-${dir}`}>
          <div className="project-name">{project.name}</div>
          <div className="project-chain">{project.chain} &middot; {project.type}</div>
        </div>
        <div className={`reveal-${dir} delay-1`}>
          <p className="project-desc">{project.description}</p>
        </div>
        <div className={`reveal-${dir} delay-2 tech-tags-row`} style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tech.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </div>
        <div className={`reveal-${dir} delay-3 links-row`} style={{ marginTop: '1.5rem', display: 'flex', gap: '1.25rem' }}>
          {project.links.map((link) => (
            <ProjectLink key={link.label} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GridCard({ project, index }: { project: Project; index: number }) {
  const delay = Math.min(index, 5);

  return (
    <div className={`grid-card reveal-up delay-${delay}`}>
      <div className="project-name">{project.name}</div>
      <div className="project-chain">{project.chain} &middot; {project.type}</div>
      <p className="project-desc">{project.description}</p>
      <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {project.tech.map((t) => (
          <TechTag key={t} name={t} />
        ))}
      </div>
      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem' }}>
        {project.links.map((link) => (
          <ProjectLink key={link.label} link={link} />
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <div id="projects" className="projects-wrapper" data-observe="projects">
      <div className="projects-inner">
        <div className="featured-section">
          {featuredProjects.map((project) => (
            <FeaturedCard key={project.name} project={project} />
          ))}
        </div>

        <div className="projects-divider" />
        <div className="grid-label">More Projects</div>

        <div className="projects-grid">
          {gridProjects.map((project, idx) => (
            <GridCard key={project.name} project={project} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
