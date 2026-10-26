# Ana Sokolova — portfolio

React + Vite single-page portfolio, built from **"Ana Sokolova Portfolio v5.dc.html"** (Claude Design export).
The other `.dc.html` files (main, v2–v4) are the alternative design directions, kept for reference; the site doesn't use them.

## Commands

```bash
npm install      # once
npm run dev      # local dev server with hot reload (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

The live site deploys from `main` on GitHub.

## Where things live

| To change…                                             | Edit                                        |
| ------------------------------------------------------ | ------------------------------------------- |
| Any text, EN and UA                                    | `STR` in `src/data/content.js`              |
| Projects: order, text, photos, videos, featured        | `PROJECTS` in `src/data/content.js`         |
| Prices / packages                                      | `PKG` in `src/data/content.js`              |
| Hero video (`hero` = hero.mp4 showreel, or `bags`, `sunscreen`, …) | `HERO_VIDEO` in `src/data/content.js` |
| Contact email / form delivery                          | `EMAIL`, `FORM_ENDPOINT` in `src/data/content.js` |
| Page sections                                          | `src/components/*.jsx`                      |
| Colours, fonts, spacing                                | `src/styles.css` (tokens at the top)        |
| Photos and posters                                     | `public/assets/*.jpg`                       |
| Videos                                                 | `public/assets/video/*.mp4`                 |

All projects always show; the ones listed in `FEATURED` (in `content.js`) come first, in that order.
Filter chips come from each project's `tags` (`campaign`, `photo`, `video`, `ugc`).

## Adding a video

Source clips are usually HEVC, which won't play in Firefox or many Android/Windows browsers. Convert to H.264:

```bash
ffmpeg -i input.mp4 -vf "scale=720:-2" -c:v libx264 -pix_fmt yuv420p -crf 23 -preset slow \
       -c:a aac -b:a 128k -movflags +faststart public/assets/video/NAME.mp4
ffmpeg -ss 0.6 -i input.mp4 -frames:v 1 -vf "scale=720:-2" -q:v 4 public/assets/poster-NAME.jpg
```

For 16:9 films use `scale=1280:-2` and pass `'16/9'` as the 4th argument to `vid()` in `content.js`.

## Contact form

Submissions go to formsubmit.co (address in `src/data/content.js`). The first submission from a new domain
triggers a one-time activation email; inquiries arrive once it's confirmed.
