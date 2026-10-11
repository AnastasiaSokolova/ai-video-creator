import { useEffect, useRef, useState } from 'react';
import { useUI } from '../context.js';
import { projectName, projects } from '../data/projects.js';
import { safePlay } from '../hooks/media.js';
import Modal from './Modal.jsx';

// index: number of the open project, or null when closed.
export default function FilmViewer({ index, onChange, onClose }) {
  const { t } = useUI();
  const videoRef = useRef(null);
  const touchX = useRef(null);
  const [missing, setMissing] = useState(false);
  const p = index === null ? null : projects[index];
  const step = (d) => onChange((index + d + projects.length) % projects.length);

  // Start each film from the top, with sound (the click that opened it counts as a user gesture)
  useEffect(() => {
    setMissing(false);
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    safePlay(v);
  }, [p]);

  const onKeyDown = (e) => {
    if (!p || e.target.tagName === 'VIDEO') return;
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  };

  // Swipe left/right on touch screens to change film
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null || !p) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 60 && e.target.tagName !== 'VIDEO') step(dx < 0 ? 1 : -1);
  };

  const wide = p && p.ratio === '16 / 9';

  return (
    <Modal
      open={p !== null}
      onClose={onClose}
      className="viewer"
      labelledBy="viewer-title"
      initialFocus=".viewer-close"
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {p && (
        <>
          <button type="button" className="viewer-close mono" onClick={onClose}>{t.viewer.close}</button>
          <span className="viewer-count mono muted">{p.num} / {String(projects.length).padStart(2, '0')}</span>
          <div className={`viewer-stage ${wide ? 'is-wide' : ''}`}>
            <div className={`viewer-video ${missing ? 'film-frame is-missing' : ''}`} style={{ aspectRatio: p.ratio }} data-file={p.video + '.mp4'}>
              <video ref={videoRef} src={p.src} poster={p.poster} controls playsInline preload="auto" onError={() => setMissing(true)} />
            </div>
            <div className="viewer-info">
              <span className="mono muted">{p.num} — {t.p[p.textKey].cat}</span>
              <h2 id="viewer-title" className="serif">{projectName(p, t)}</h2>
              <p className="body-copy small">{t.p[p.textKey].d}</p>
              <div className="viewer-nav">
                <button type="button" aria-label={t.viewer.prev} onClick={() => step(-1)}>←</button>
                <button type="button" aria-label={t.viewer.next} onClick={() => step(1)}>→</button>
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
