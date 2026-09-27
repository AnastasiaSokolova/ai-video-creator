import { films, FEATURED_COUNT } from '../data/films.js';
import FilmFrame from './FilmFrame.jsx';

export default function FeaturedFilms() {
  return (
    <section id="work" className="section section--rule" aria-labelledby="work-h">
      <div className="container">
        <div className="section-head" data-reveal>
          <h2 id="work-h" className="display">Selected <em>films</em></h2>
          <p>Independent concepts and personal projects. Each film was developed as a complete idea, from visual direction to final edit.</p>
        </div>
        <div className="film-grid">
          {films.slice(0, FEATURED_COUNT).map((f) => (
            <article key={f.file} className="film-card" data-reveal>
              <FilmFrame film={f}>
                <span className="num-tag">{f.num}</span>
                <span className="play-badge" aria-hidden="true" />
              </FilmFrame>
              <div className="card-meta"><span>{f.cat}</span><span>Independent concept</span></div>
              <h3>{f.title}</h3>
              <p>{f.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
