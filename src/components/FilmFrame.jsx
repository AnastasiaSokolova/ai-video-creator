import { useUI } from '../context.js';
import { projectName } from '../data/projects.js';
import { useVideoPreview } from '../hooks/media.js';
import PreviewMedia from './PreviewMedia.jsx';

// Film frame: muted preview while on screen; click opens the viewer with sound.
export default function FilmFrame({ project, className = '', children }) {
  const { t, openFilm } = useUI();
  const { missing, playing, videoProps } = useVideoPreview();

  return (
    <button
      type="button"
      className={`frame film-frame ${className} ${missing ? 'is-missing' : ''}`}
      style={{ aspectRatio: project.ratio }}
      data-file={project.video + '.mp4'}
      aria-label={`${t.viewer.play}: ${projectName(project, t)}, ${t.viewer.withSound}`}
      onClick={() => openFilm(project.index)}
    >
      <PreviewMedia film={project} playing={playing} videoProps={videoProps} />
      {children}
      <span className="frame-cue" aria-hidden="true"><span className="tri" />{t.viewer.play} {t.viewer.withSound}</span>
    </button>
  );
}

// Text link styled per the design ("Watch film →") that opens the viewer.
export function WatchLink({ project, label, className = '' }) {
  const { openFilm } = useUI();
  return (
    <button type="button" className={`arrow-link ${className}`} onClick={() => openFilm(project.index)}>
      {label} <span aria-hidden="true">→</span>
    </button>
  );
}
