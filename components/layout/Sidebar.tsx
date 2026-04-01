import { sidebarPanels } from '@/lib/data';

interface SidebarProps {
  activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
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
        </div>
      ))}
    </div>
  );
}
