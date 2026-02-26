import type { ProjectLink as ProjectLinkType } from '@/lib/types';

export function ProjectLink({ link }: { link: ProjectLinkType }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener"
      className="project-link"
    >
      {link.label}
    </a>
  );
}
