import { useUI } from '../context.js';

// Text-only for now; the design's 4:5 portrait can go back in once there's a photo.
export default function About() {
  const { t } = useUI();
  return (
    <section id="about" className="about" aria-labelledby="about-t">
      <div className="about-text" data-reveal>
        <p className="mono muted eyebrow">{t.nav.about}</p>
        <h2 id="about-t" className="serif about-title">{t.ab1}<span className="accent-italic">{t.ab2}</span></h2>
        <div className="about-cols">
          <p className="body-copy">{t.abP1}</p>
          <p className="body-copy">{t.abP2}</p>
        </div>
        <p className="mono muted disciplines">{t.disciplines}</p>
      </div>
    </section>
  );
}
