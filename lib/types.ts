export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'telegram' | 'email';
  url: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  name: string;
  chain: string;
  type: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  revealDirection: 'right' | 'left';
  isAlt: boolean;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface NavItem {
  id: string;
  tooltip: string;
  ariaLabel: string;
}

export interface SidebarPanel {
  id: string;
  number: string;
  label: string;
  sublabel?: string;
}
