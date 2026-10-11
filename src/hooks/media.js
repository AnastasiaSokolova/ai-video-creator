import { useEffect, useRef, useState } from 'react';
import { useUI } from '../context.js';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = () => !!(navigator.connection && navigator.connection.saveData);

// play() returns a promise that rejects when autoplay is blocked; that's expected, so swallow it.
export const safePlay = (v) => {
  const p = v && v.play();
  if (p) p.catch(() => {});
};

// Muted looping preview for a film frame: plays while the frame is mostly on
// screen, pauses when it scrolls away or the viewer is open, and stays still
// with reduced motion or data saver on.
// `playing` stays false until frames are actually rendering, so the frame can
// keep showing its poster image instead of a black frame while the video loads.
// `soundRef` (optional): while soundRef.current is true the video isn't re-muted
// when it scrolls back into view (the hero's "Sound on" button).
export function useVideoPreview({ soundRef } = {}) {
  const { overlayOpen } = useUI();
  const videoRef = useRef(null);
  const [missing, setMissing] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || missing || prefersReducedMotion() || saveData() || !('IntersectionObserver' in window)) return;
    if (overlayOpen) { v.pause(); return; }

    // Start buffering about a screen before the frame arrives, so it can start promptly
    const warm = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      if (v.preload !== 'auto') { v.preload = 'auto'; v.load(); }
      warm.disconnect();
    }, { rootMargin: '100% 0px' });

    const play = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.muted = !soundRef?.current; safePlay(v); } else v.pause();
    }, { threshold: 0.5 });

    warm.observe(v);
    play.observe(v);
    return () => { warm.disconnect(); play.disconnect(); v.pause(); };
  }, [overlayOpen, missing, soundRef]);

  return {
    videoRef,
    missing,
    playing,
    videoProps: {
      ref: videoRef,
      onPlaying: () => setPlaying(true),
      onPause: () => setPlaying(false),
      onError: () => setMissing(true)
    }
  };
}
