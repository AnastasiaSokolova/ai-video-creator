import { useEffect, useState } from 'react';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// play() returns a promise that rejects when autoplay is blocked; that's expected, so swallow it.
export const safePlay = (v) => {
  const p = v && v.play();
  if (p) p.catch(() => {});
  return p;
};

// The design switches layouts at 900px: desktop grid vs phone carousel and menu.
export function useWide() {
  const query = '(min-width: 900px)';
  const [wide, setWide] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setWide(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return wide;
}
