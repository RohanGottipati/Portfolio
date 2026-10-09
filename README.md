# Rohan Gottipati — Portfolio

A minimal, responsive portfolio for Rohan Gottipati, a Toronto-based software engineer and Software Architect Intern at Intact.

Live site: [rohangottipati.com](https://rohangottipati.com)

## Current site

- `/` — Toronto skyline image, profile and contact links, introduction, featured work and projects, and education
- `/work` — professional experience and leadership
- `/projects` — project and hackathon index with GitHub links and live-site buttons where available
- The résumé link opens `public/Rohan_Gottipati_Resume.pdf`.

The site uses React 18, TypeScript, Vite, React Router, Tailwind CSS, and Framer Motion. Its white background, Newsreader typography, blue profile links, reveal animations, and drawn arrows are implemented in the active `src/redesign/` components. The arrow component measures its text anchors after layout and redraws on resize; arrows are hidden on narrow screens.

## Develop and verify

Requires Node.js 20.19 or newer and npm.

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

The dev server runs at `http://localhost:3000`; `npm run preview` serves the production build at `http://localhost:4173`.

## Update content

- Profile, contact links (including X), and résumé URL: `src/redesign/data/profile.ts`
- Work, leadership, and education: `src/redesign/data/experience.ts`
- Featured and full project lists: `src/redesign/data/projects.ts`
- Page layout and navigation: `src/redesign/pages/` and `src/redesign/components/`
- Global colors and link interactions: `src/index.css`
- Résumé PDF and skyline image: `public/`

The older `src/pages/`, `src/components/`, and related data remain in the repository but are not mounted by the active router in `src/App.tsx`.

## SEO and deployment

The canonical origin is `https://rohangottipati.com`. The three live routes share metadata in `src/data/seo.mjs`. `src/App.tsx` updates it during client-side navigation, and `scripts/generate-route-html.mjs` writes route-specific HTML shells during the Vite build. Baseline metadata, the social image, and Person JSON-LD are in `index.html`. `public/sitemap.xml` lists the live routes, and `public/robots.txt` points to it.

Vercel serves the generated `/work.html` and `/projects.html` shells according to `vercel.json`. Legacy URLs redirect to the current pages. Netlify, Apache, and GitHub Pages fallback files remain in `public/`.
