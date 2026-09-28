import { useUI } from '../context.js';
import { useVideoPreview } from '../hooks/media.js';
import PreviewMedia from './PreviewMedia.jsx';

// 9:16 video tile: previews on hover (mouse) or while on screen (touch), opens the viewer on click.
export default function FilmFrame({ film, className = '', preload = 'none', children }) {
  const { openFilm } = useUI();
  const { missing, playing, videoProps, hoverProps } = useVideoPreview();

  return (
    <button
      type="button"
      className={`film-frame ${className} ${missing ? 'is-missing' : ''}`}
      data-file={film.file + '.mp4'}
      aria-label={film.playLabel}
      onClick={() => openFilm(film.index)}
      {...hoverProps}
    >
      <PreviewMedia film={film} playing={playing} videoProps={videoProps} preload={preload} />
      {children}
    </button>
  );
}
