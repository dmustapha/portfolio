import { projects } from '@/lib/data';
import { ProjectSlide } from './ProjectSlide';

interface ProjectsSectionProps {
  currentProjectIdx: number;
}

export function ProjectsSection({ currentProjectIdx }: ProjectsSectionProps) {
  return (
    <div id="projects" className="projects-wrapper" data-observe="projects">
      <div className="projects-snap" id="projectsSnap">
        {projects.map((project, idx) => (
          <ProjectSlide
            key={project.name}
            project={project}
            index={idx}
            totalProjects={projects.length}
            currentDisplayIdx={currentProjectIdx}
          />
        ))}
      </div>

      {/* Scroll hint (shown once on first visit) */}
      <div className="scroll-hint" id="scrollHint" style={{ display: 'none' }}>
        <span>Scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14m-6-6l6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}
