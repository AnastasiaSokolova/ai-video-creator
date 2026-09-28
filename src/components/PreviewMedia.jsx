// Poster image with the preview video layered on top. The video stays
// transparent until it's actually playing, then fades in, so there's no black
// flash while it loads (iOS drops a <video poster> as soon as play() is called).
export default function PreviewMedia({ film, playing, videoProps, preload = 'none' }) {
  return (
    <>
      <img className="preview-poster" src={film.poster} alt="" decoding="async" />
      <video
        className={`preview-video ${playing ? 'is-playing' : ''}`}
        src={film.src}
        muted
        playsInline
        loop
        preload={preload}
        {...videoProps}
      />
    </>
  );
}
