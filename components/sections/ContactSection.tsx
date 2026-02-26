import { personalInfo, socialLinks } from '@/lib/data';
import { SocialCircle } from '@/components/ui/SocialCircle';

export function ContactSection() {
  return (
    <div className="section-content" id="contact" data-observe="contact">
      <div className="reveal-left">
        <h2 className="section-heading">Let&apos;s Connect</h2>
      </div>

      <div className="reveal-left delay-1">
        <a href={`mailto:${personalInfo.email}`} className="contact-email">
          {personalInfo.email}
        </a>
      </div>

      <div className="reveal-left delay-2" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
        {socialLinks.map((link) => (
          <SocialCircle key={link.platform} link={link} />
        ))}
      </div>

      <div className="reveal-left delay-3" style={{ marginTop: '4rem' }}>
        <p style={{ fontSize: '0.8125rem', color: '#8B8B8B', letterSpacing: '0.08em' }}>
          &copy; 2026 {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
