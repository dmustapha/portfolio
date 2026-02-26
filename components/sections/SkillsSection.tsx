import { skillGroups } from '@/lib/data';
import { SkillTag } from '@/components/ui/SkillTag';

export function SkillsSection() {
  // Delay mapping matches original HTML: group 0 → delay-1, group 1 → delay-2, group 2 → delay-1
  const delays = [1, 2, 1];

  return (
    <div className="section-content" id="skills" data-observe="skills">
      <div className="reveal-left">
        <h2 className="section-heading">Skills</h2>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group, idx) => (
          <div key={group.label} className={`reveal-left delay-${delays[idx]}`}>
            <div className="skill-group-label">{group.label}</div>
            <div className="skill-tags">
              {group.skills.map((skill) => (
                <SkillTag key={skill} name={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
