import { sidebarPanels, projects } from '@/lib/data';

interface SidebarProps {
  activeSection: string;
  activeProjectIdx: number;
  onProjectIndicatorClick: (idx: number) => void;
}

export function Sidebar({ activeSection, activeProjectIdx, onProjectIndicatorClick }: SidebarProps) {
  return (
    <div className="sidebar-col">
      {sidebarPanels.map((panel) => (
        <div
          key={panel.id}
          className={`sidebar-section${activeSection === panel.id ? ' active' : ''}`}
          data-sidebar={panel.id}
        >
          <div className="sidebar-number" aria-hidden="true">{panel.number}</div>
          <div className="sidebar-label">{panel.label}</div>
          {panel.sublabel && <div className="sidebar-sublabel">{panel.sublabel}</div>}

          {panel.id === 'projects' && (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {projects.map((project, idx) => (
                <span
                  key={idx}
                  className={`project-indicator${activeProjectIdx === idx ? ' active' : ''}`}
                  data-proj-idx={idx}
                  onClick={() => onProjectIndicatorClick(idx)}
                >
                  {String(idx + 1).padStart(2, '0')} {project.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
