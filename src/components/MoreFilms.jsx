import { films, FEATURED_COUNT } from '../data/films.js';
import { useUI } from '../context.js';
import { useVideoPreview } from '../hooks/media.js';
import PreviewMedia from './PreviewMedia.jsx';

function FilmRow({ film }) {
  const { openFilm } = useUI();
  const { missing, playing, videoProps, hoverProps } = useVideoPreview();
  return (
    <li data-reveal>
      <button type="button" className="film-row" aria-label={film.playLabel} onClick={() => openFilm(film.index)} {...hoverProps}>
        <span className={`row-thumb ${missing ? 'film-frame is-missing' : ''}`} data-file={film.file + '.mp4'}>
          <PreviewMedia film={film} playing={playing} videoProps={videoProps} />
        </span>
        <span className="row-num">{film.num}</span>
        <span className="row-body">
          <span className="row-title">{film.title}</span>
          <span className="row-text"><span className="meta">{film.cat}</span><span>{film.line}</span></span>
        </span>
        <span className="row-play" aria-hidden="true" />
      </button>
    </li>
  );
}

export default function MoreFilms() {
  return (
    <section className="section section--rule section--tight" aria-labelledby="more-h">
      <div className="container split">
        <div className="split-head" data-reveal>
          <h2 id="more-h" className="display display--sm">More <em>films</em></h2>
          <p className="muted">Four more short pieces, from skincare to surreal.</p>
        </div>
        <ul className="film-list">
          {films.slice(FEATURED_COUNT).map((f) => <FilmRow key={f.file} film={f} />)}
        </ul>
      </div>
    </section>
  );
}
