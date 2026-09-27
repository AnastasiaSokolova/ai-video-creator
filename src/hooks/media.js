import { useRef, useState } from 'react';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const canHover = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

// play() returns a promise that rejects when autoplay is blocked; that's expected, so swallow it.
export const safePlay = (v) => {
  const p = v && v.play();
  if (p) p.catch(() => {});
};

// Muted preview on mouse hover. Touch devices skip it; a tap opens the viewer instead.
export function useHoverPreview() {
  const videoRef = useRef(null);
  const [missing, setMissing] = useState(false);
  const active = () => !missing && canHover() && !prefersReducedMotion();

  return {
    videoRef,
    missing,
    onVideoError: () => setMissing(true),
    hoverProps: {
      onMouseEnter: () => {
        const v = videoRef.current;
        if (v && active()) { v.muted = true; safePlay(v); }
      },
      onMouseLeave: () => {
        const v = videoRef.current;
        if (!v) return;
        v.pause();
        try { v.currentTime = 0; } catch { /* not seekable yet */ }
      }
    }
  };
}
