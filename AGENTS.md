# AGENTS.md

## Command convention

Prefix shell commands with `rtk` when it is available. If it is not installed, use the underlying command.

## Active project

This is a React 18, TypeScript, Vite, React Router, Tailwind CSS, and Framer Motion portfolio. The active routes are `/`, `/work`, and `/projects`. `src/App.tsx` mounts pages from `src/redesign/pages/`. Older components and pages elsewhere under `src/` are retained but are not part of the active UI.

The homepage shows a skyline image, profile links, a short introduction, featured work and projects, and education. Work and Projects retain the image and show a back link and the relevant list. The current résumé is `public/Rohan_Gottipati_Resume.pdf`.

## Main files

- `src/redesign/data/profile.ts`: profile, contact links, résumé URL, and image
- `src/redesign/data/experience.ts`: work, leadership, and education
- `src/redesign/data/projects.ts`: featured and full project lists, GitHub URLs, and deployed URLs
- `src/redesign/pages/`: active route content
- `src/redesign/components/`: shared layout, lists, links, animations, and measured arrows
- `src/index.css` and `tailwind.config.cjs`: typography, color, and layout tokens
- `src/data/seo.mjs`: route metadata shared by the app and static HTML generator
- `scripts/generate-route-html.mjs`: build-time route shells
- `index.html`, `public/sitemap.xml`, and `public/robots.txt`: baseline SEO
- `vercel.json`: deployed route mapping and legacy redirects

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

The development server uses port 3000. The production preview uses port 4173. Run typecheck, lint, tests, and build before committing changes that affect routing, data, or metadata.

## Editing guidance

Keep the live three-route metadata, sitemap, and generated HTML shells in sync. Use `src/redesign/data/` for content changes. The homepage arrows are positioned from `data-anchor` elements by `SketchArrows.tsx`; preserve those anchors when changing layout or copy. Keep the Work page free of an Education section; Education belongs on the homepage.
