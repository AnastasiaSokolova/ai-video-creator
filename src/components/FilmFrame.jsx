import { useUI } from '../context.js';
import { useHoverPreview } from '../hooks/media.js';

// 9:16 video tile that previews on hover and opens the viewer on click.
export default function FilmFrame({ film, className = '', preload = 'none', children }) {
  const { openFilm } = useUI();
  const { videoRef, missing, onVideoError, hoverProps } = useHoverPreview();

  return (
    <button
      type="button"
      className={`film-frame ${className} ${missing ? 'is-missing' : ''}`}
      data-file={film.file + '.mp4'}
      aria-label={film.playLabel}
      onClick={() => openFilm(film.index)}
      {...hoverProps}
    >
      <video ref={videoRef} src={film.src} poster={film.poster} muted playsInline loop preload={preload} onError={onVideoError} />
      {children}
    </button>
  );
}
