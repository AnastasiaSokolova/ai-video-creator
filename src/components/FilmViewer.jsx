import { useEffect, useRef, useState } from 'react';
import { films } from '../data/films.js';
import { safePlay } from '../hooks/media.js';
import Modal from './Modal.jsx';

// index: number of the open film, or null when closed.
export default function FilmViewer({ index, onChange, onClose }) {
  const videoRef = useRef(null);
  const touchX = useRef(null);
  const [missing, setMissing] = useState(false);
  const film = index === null ? null : films[index];
  const step = (d) => onChange((index + d + films.length) % films.length);

  // Start each film from the top, with sound (the click that opened it counts as a user gesture)
  useEffect(() => {
    setMissing(false);
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    safePlay(v);
  }, [film]);

  const onKeyDown = (e) => {
    if (!film || e.target.tagName === 'VIDEO') return;
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  };

  // Swipe left/right on touch screens to change film
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null || !film) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 60 && e.target.tagName !== 'VIDEO') step(dx < 0 ? 1 : -1);
  };

  return (
    <Modal
      open={film !== null}
      onClose={onClose}
      className="viewer"
      labelledBy="viewer-title"
      initialFocus=".viewer-close"
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {film && (
        <>
          <button type="button" className="btn btn-ghost btn-sm viewer-close" onClick={onClose}>Close</button>
          <span className="viewer-count mono">{film.num} / {String(films.length).padStart(2, '0')}</span>
          <div className="viewer-stage">
            <div className={`viewer-video ${missing ? 'film-frame is-missing' : ''}`} data-file={film.file + '.mp4'}>
              <video ref={videoRef} src={film.src} poster={film.poster} controls playsInline preload="auto" onError={() => setMissing(true)} />
            </div>
            <div className="viewer-info">
              <span className="meta">{film.cat}</span>
              <h2 id="viewer-title" className="serif">{film.title}</h2>
              <p>{film.line}</p>
              <span className="small muted">Independent concept / personal work</span>
              <div className="viewer-nav">
                <button type="button" className="round-btn" aria-label="Previous film" onClick={() => step(-1)}>←</button>
                <button type="button" className="round-btn" aria-label="Next film" onClick={() => step(1)}>→</button>
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
