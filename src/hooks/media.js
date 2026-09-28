import { useEffect, useRef, useState } from 'react';
import { useUI } from '../context.js';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const canHover = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
const saveData = () => !!(navigator.connection && navigator.connection.saveData);

// play() returns a promise that rejects when autoplay is blocked; that's expected, so swallow it.
export const safePlay = (v) => {
  const p = v && v.play();
  if (p) p.catch(() => {});
};

const stop = (v) => {
  if (!v) return;
  v.pause();
  try { v.currentTime = 0; } catch { /* not seekable yet */ }
};

// Muted looping preview for a film tile.
// Mouse: plays on hover. Touch: plays while the tile is mostly on screen,
// since there's no hover. Paused whenever the viewer or form is open.
export function useVideoPreview() {
  const { overlayOpen } = useUI();
  const videoRef = useRef(null);
  const [missing, setMissing] = useState(false);
  const allowed = () => !missing && !prefersReducedMotion() && !saveData();

  useEffect(() => {
    const v = videoRef.current;
    if (!v || canHover() || !allowed() || !('IntersectionObserver' in window)) return;
    if (overlayOpen) { v.pause(); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.muted = true; safePlay(v); } else stop(v);
    }, { threshold: 0.6 });
    io.observe(v);
    return () => { io.disconnect(); v.pause(); };
    // allowed() depends on `missing`, listed below
  }, [overlayOpen, missing]);

  return {
    videoRef,
    missing,
    onVideoError: () => setMissing(true),
    hoverProps: {
      onMouseEnter: () => {
        const v = videoRef.current;
        if (v && canHover() && allowed()) { v.muted = true; safePlay(v); }
      },
      onMouseLeave: () => { if (canHover()) stop(videoRef.current); }
    }
  };
}
