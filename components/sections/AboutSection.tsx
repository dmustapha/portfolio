import { aboutParagraphs, pullQuote } from '@/lib/data';

export function AboutSection() {
  return (
    <div className="section-content section-alt" id="about" data-observe="about">
      <div className="reveal-left">
        <p className="about-text">{aboutParagraphs[0]}</p>
      </div>

      <div className="reveal-left delay-1" style={{ marginTop: '1.25rem' }}>
        <p className="about-text about-text--secondary">{aboutParagraphs[1]}</p>
      </div>

      <div className="reveal-left delay-2" style={{ marginTop: '1.25rem' }}>
        <p className="about-text about-text--secondary">{aboutParagraphs[2]}</p>
      </div>

      <div className="reveal-left delay-3" style={{ marginTop: '2rem' }}>
        <blockquote className="pull-quote">{pullQuote}</blockquote>
      </div>
    </div>
  );
}
