import { SERVICES } from '../data/content.js';
import FormLink from './FormLink.jsx';

export default function Services() {
  return (
    <section id="services" className="section section--light" aria-labelledby="services-h">
      <div className="container">
        <div className="section-head" data-reveal>
          <h2 id="services-h" className="display display--md">What I can <em>make</em> for you</h2>
          <p>Starting prices below. Send a brief and I'll reply with a tailored scope and quote.</p>
        </div>
        <div className="services">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="service" data-reveal>
              <span className="mono accent">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="price">
                <span className="serif">{s.price}</span>
                <span>{s.note}</span>
              </div>
              <FormLink className="text-link">{s.cta}</FormLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
