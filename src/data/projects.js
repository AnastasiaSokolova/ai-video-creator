// Portfolio projects, in page order. Text for each lives in i18n.js under p[textKey].
// Media: public/videos/<video>.mp4 + <video>.jpg poster; stills in public/images/<still>.jpg.
// Set `hidden: true` to leave a project off the site (index, page and viewer) until its media is ready.
const BASE = import.meta.env.BASE_URL;

export const CONTACT_EMAIL = 'a.sokolova4work@gmail.com';
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
// Hero video: silent loop (audio stripped), full width on phones
export const HERO_VIDEO = { src: BASE + 'videos/ana.mp4', poster: BASE + 'videos/ana.jpg' };

const PROJECTS = [
  { id: 'desir', textKey: 'desir', name: 'Désir', video: 'desir' },
  { id: 'ellips', textKey: 'ellips', name: 'Ellips', video: 'ellips', stills: ['ellips-1', 'ellips-2', 'ellips-3'] },
  { id: 'laneige', textKey: 'laneige', name: 'Laneige', video: 'laneige', stills: ['laneige-1', 'laneige-2', 'laneige-3'] },
  { id: 'aurora', textKey: 'aurora', name: 'Aurora Vitamins', video: 'aurora' },
  { id: 'room505', textKey: 'room', name: 'Room 505', video: 'room505', ratio: '16 / 9' },
  { id: 'cupcake', textKey: 'cupcake', name: 'Cupcake', video: 'Cupcake5' },
  { id: 'ugc', textKey: 'ugc', video: 'ugc' },
  { id: 'jewelry', textKey: 'jewel', video: 'jwlr' }
];

export const projects = PROJECTS.filter((p) => !p.hidden).map((p, i) => ({
  ...p,
  index: i,
  num: String(i + 1).padStart(2, '0'),
  ratio: p.ratio || '9 / 16',
  src: BASE + 'videos/' + p.video + '.mp4',
  poster: BASE + 'videos/' + p.video + '.jpg',
  stills: (p.stills || []).map((s) => BASE + 'images/' + s + '.jpg')
}));

export const byId = Object.fromEntries(projects.map((p) => [p.id, p]));

// Display name in the current language (UGC and Jewelry are translated; brand names aren't)
export const projectName = (p, t) => p.name || t.p[p.textKey].t1 + t.p[p.textKey].t2;
export const projectShort = (p, t) => t.p[p.textKey].short || p.name;
