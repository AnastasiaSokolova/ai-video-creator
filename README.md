# Anastasiia Sokolova — portfolio

React + Vite single-page portfolio.

## Commands

```bash
npm install      # once
npm run dev      # local dev server with hot reload (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

Deploy by uploading the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Where things live

| To change…                                   | Edit                                   |
| -------------------------------------------- | -------------------------------------- |
| Film titles, categories, order, hero picks   | `src/data/films.js`                    |
| Services, prices, process steps, FAQ, email  | `src/data/content.js`                  |
| Page sections                                | `src/components/*.jsx`                 |
| Colours, fonts, spacing, breakpoints         | `src/styles.css` (tokens at the top)   |
| Video files and poster images                | `public/videos/`                       |

## Adding a film

1. Export it as H.264 MP4 (HEVC/.mov won't play in Firefox or many Android/Windows browsers). With ffmpeg:
   ```bash
   ffmpeg -i input.mov -vf "scale=720:-2" -c:v libx264 -pix_fmt yuv420p -crf 23 -preset slow \
          -c:a aac -b:a 128k -movflags +faststart public/videos/NAME.mp4
   ffmpeg -ss 0.6 -i input.mov -frames:v 1 -vf "scale=720:-2" -q:v 4 public/videos/NAME.jpg
   ```
2. Add an entry to `FILMS` in `src/data/films.js` with `file: 'NAME'`. The first six are featured; the rest appear under "More films".

## Inquiry form

Submissions go to formsubmit.co (address in `src/data/content.js`). The first submission triggers a one-time activation email; inquiries arrive once it's confirmed.
