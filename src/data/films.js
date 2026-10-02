// Video files live in public/videos/<file>.mp4 with a poster at <file>.jpg.
const VIDEO_BASE = import.meta.env.BASE_URL + 'videos/';

const FILMS = [
  { file: 'aurora', title: 'Aurora', cat: 'Wellness / lifestyle commercial', line: 'Daily balance, built into every moment.' },
  { file: 'jwlr', title: 'Jewelry', cat: 'Luxury / visual transformation', line: 'Liquid silver finds its final form.' },
  { file: 'lipstick', title: 'Wear the Flavor', cat: 'Beauty / product film', line: 'Four flavors become a vivid, tactile lipstick world.' },
  { file: 'not_a_mirage', title: 'Not a Mirage', cat: 'Beverage / concept commercial', line: 'A cold drink appears in an impossible desert.' },
  { file: 'velune', title: 'Velune', cat: 'Fragrance / emotional film', line: 'A scent opens the door to a memory.' },
  { file: 'Cupcake5', title: 'The Story of Cupcake', cat: 'Character story', line: "A puppy's story told with warmth and an emotional payoff." },
  { file: 'soft_pop', title: 'Soft Pop', cat: 'Character animation', line: 'A playful animated world for a playful product.' },
  { file: 'hydra', title: 'Dolce Cream', cat: 'Skincare / product film', line: 'Skincare revealed in a cool, futuristic world.' },
  { file: 'clothes', title: 'VÉRA', cat: 'Fashion film', line: 'One snap, a new version of you.' },
  { file: 'mini', title: 'Absurdity', cat: 'Surreal short film', line: "A trip that isn't quite what it seems." },
];

export const films = FILMS.map((f, i) => ({
  ...f,
  index: i,
  num: String(i + 1).padStart(2, '0'),
  src: VIDEO_BASE + f.file + '.mp4',
  poster: VIDEO_BASE + f.file + '.jpg',
  playLabel: `Play ${f.title}, full film with sound`
}));

export const FEATURED_COUNT = 6;
export const HERO = { main: 0, left: 1, right: 2 };
