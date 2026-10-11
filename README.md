# Ana Sokolova — portfolio

React + Vite single-page portfolio, built from the "Ana Sokolova Portfolio" Claude Design export
(`Ana Sokolova Portfolio.dc.html` is kept as the design reference; the site doesn't use it).

## Commands

```bash
npm install      # once
npm run dev      # local dev server with hot reload (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

Deploy by uploading the contents of `dist/` to any static host. The live site deploys from `main` on GitHub.

## Where things live

| To change…                                         | Edit                                  |
| -------------------------------------------------- | ------------------------------------- |
| Any text, EN and UA (services, prices, about…)     | `src/data/i18n.js`                    |
| Which projects show, their order, video and stills | `src/data/projects.js`                |
| Contact form email address                          | `CONTACT_EMAIL` in `src/data/projects.js` |
| Page sections                                       | `src/components/*.jsx`                |
| Colours, fonts, spacing                             | `src/styles.css` (tokens at the top)  |
| Videos + poster frames                              | `public/videos/`                      |
| Campaign stills                                     | `public/images/`                      |

A project with `hidden: true` in `projects.js` is left off the page, the work index and the viewer, and the
numbering closes up.

## Adding a video

Source clips are usually HEVC, which won't play in Firefox or many Android/Windows browsers. Convert to H.264:

```bash
ffmpeg -i input.mp4 -vf "scale=720:-2" -c:v libx264 -pix_fmt yuv420p -crf 23 -preset slow \
       -c:a aac -b:a 128k -movflags +faststart public/videos/NAME.mp4
ffmpeg -ss 0.6 -i input.mp4 -frames:v 1 -vf "scale=720:-2" -q:v 4 public/videos/NAME.jpg
```

For 16:9 films use `scale=1280:-2`. Stills: `ffmpeg -i still.png -vf "scale=1200:-2" -q:v 3 public/images/NAME.jpg`.

The hero video is `public/videos/ana.mp4`: 1080p, audio stripped (it always plays muted), set as `HERO_VIDEO` in `src/data/projects.js`.

## Contact form

Submissions go to formsubmit.co (address in `src/data/projects.js`). The first submission from a new domain
triggers a one-time activation email; inquiries arrive once it's confirmed.
