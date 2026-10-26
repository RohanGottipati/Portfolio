# Rohan Gottipati — Portfolio

A minimal, responsive portfolio for Rohan Gottipati, a Toronto-based software engineer and Software Architect Intern at Intact.

Live site: [rohangottipati.com](https://rohangottipati.com)

## Features

- `/`: Toronto skyline image, profile and social links (including X), a short introduction, featured work and projects, and education. Drawn arrows point at the sections.
- `/work`: professional experience and leadership.
- `/projects`: project and hackathon index with GitHub links and live-site buttons where available.
- Résumé link that opens `public/Rohan_Gottipati_Resume.pdf` in a new tab.
- Route-specific SEO: titles, descriptions, canonical URLs, Open Graph/Twitter tags, Person JSON-LD, a sitemap, and static HTML shells for `/work` and `/projects` generated at build time.
- RoRo API (`POST /api/roro`): a serverless endpoint that answers questions about the portfolio with Google Gemini and rejects unrelated questions. No page in the current UI calls it.

## Tech stack

- React 18, TypeScript, Vite, and React Router
- Tailwind CSS and Framer Motion, with the Newsreader font from Google Fonts
- Vitest and Testing Library (jsdom), plus ESLint
- Vercel for hosting and the `api/` serverless function

## Project structure

```text
index.html                    Baseline metadata, social image, Person JSON-LD
src/
  App.tsx                     Router (/, /work, /projects) and per-route metadata
  index.css                   Global colors, typography, and link styles
  redesign/
    pages/                    Home, Work, and Projects pages
    components/               Layout, lists, links, reveal animations, SketchArrows
    data/                     Profile, experience, and project content
    types/                    Content types
  data/
    seo.mjs                   Route metadata shared by the app and build script
    *.mjs                     Portfolio data used by the RoRo API
  types/portfolio.ts          Types for the RoRo data files
scripts/generate-route-html.mjs  Writes route HTML shells after the Vite build
server/
  roro.mjs                    RoRo question filtering and Gemini call
  vite-roro-plugin.mjs        Serves /api/roro from the Vite dev server
api/roro.js                   Vercel serverless handler for /api/roro
public/                       Résumé, images, favicons, sitemap, robots.txt, host fallbacks
vercel.json                   Headers, legacy redirects, and route rewrites
```

## Prerequisites

- Node.js 20.19 or newer
- npm

## Setup and development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`. To build and serve the production output:

```bash
npm run build
npm run preview
```

The preview server runs at `http://localhost:4173`.

## Environment variables

You only need these for the RoRo API. The site runs without them, and `/api/roro` returns `503` until a key is set. Copy `.env.example` to `.env` for local development, or set the variables in the Vercel project.

| Name | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Google Gemini API key used by `server/roro.mjs`. Keep it server-side and don't add a `VITE_` prefix. |
| `GEMINI_MODEL` | Optional Gemini model name. Defaults to `gemini-3.5-flash-lite`. |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server, including `/api/roro` |
| `npm run build` | Build the production bundle into `dist/` and generate the route HTML shells |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | Type-check with `tsc --noEmit` |
| `npm run lint` | Run ESLint with zero warnings allowed |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |

## Updating content

- Profile, social links, résumé URL, and banner image: `src/redesign/data/profile.ts`
- Work, leadership, and education: `src/redesign/data/experience.ts`
- Featured and full project lists: `src/redesign/data/projects.ts`
- Page layout and navigation: `src/redesign/pages/` and `src/redesign/components/`
- Route metadata: `src/data/seo.mjs`. Keep it in sync with `index.html` and `public/sitemap.xml`.
- RoRo answers come from the data in `src/data/*.mjs`, which is separate from the data the pages render.

`SketchArrows.tsx` positions the homepage arrows from `data-anchor` elements. It measures them after layout and redraws on resize. The arrows are hidden on narrow screens.

## SEO and deployment

The canonical origin is `https://rohangottipati.com`. `src/App.tsx` updates the page metadata during client-side navigation. During `vite build`, `scripts/generate-route-html.mjs` writes `work.html`, `projects.html`, `work/index.html`, and `projects/index.html` into `dist/`. `public/sitemap.xml` lists the three live routes, and `public/robots.txt` points to the sitemap.

The site is deployed on Vercel. `vercel.json` adds security and cache headers, rewrites `/work` and `/projects` to their generated shells, and redirects legacy URLs (`/work/:slug`, `/experience`, `/recognition`, `/about`, `/contact`, `/brief`) to the current pages. `api/roro.js` is deployed as a Vercel serverless function. `public/` also has fallback files for other hosts: `_redirects` for Netlify, `.htaccess` for Apache, and `404.html` for GitHub Pages.
