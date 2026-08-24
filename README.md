# Rohan Gottipati - Portfolio

A tactile, editorial portfolio for software engineer Rohan Gottipati. The site presents selected projects, experience, education, technical skills, contact links, and a portfolio-only Gemini assistant named RoRo.

Live site: [rohangottipati.com](https://rohangottipati.com)

## Highlights

- Responsive paper-collage interface with an animated intro, experience-index hero, and fine-pointer paper cursor
- Thirteen filterable project case studies with dedicated routes
- Separate Projects, Experience, About, and Contact pages, plus a downloadable résumé
- RoRo, a Gemini-powered portfolio assistant with adaptive responses, contextual highlighted-text questions, local fallbacks, and a strict portfolio-only boundary
- Route-specific titles, descriptions, canonical URLs, Open Graph tags, Twitter cards, and project structured data
- Person structured data, sitemap, robots policy, web app manifest, and SPA deployment fallbacks
- Keyboard navigation, skip link, focus-visible states, accessible dialog behavior, semantic landmarks, and reduced-motion support
- Vitest and Testing Library coverage for routes, filters, SEO state, 404 behavior, and RoRo

## Tech stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- Gemini Interactions API through a server-only endpoint
- Vercel Functions
- Vitest + Testing Library

## Local development

Requirements: Node.js 20.19 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

The development server runs at `http://localhost:3000`.

Set a rotated Gemini key in `.env.local` for local RoRo responses:

```text
GEMINI_API_KEY=your_server_side_key
GEMINI_MODEL=gemini-3.5-flash-lite
```

Never prefix the key with `VITE_`; Vite-prefixed values are included in the browser bundle. Without a key, RoRo keeps working through its local portfolio fallback.

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Use `npm run preview` to inspect the production build at `http://localhost:4173`.

## Project structure

```text
src/
├── components/       Shared UI, navigation, cards, SEO, and RoRo
├── contexts/         RoRo visibility and contextual-question state
├── data/             Profile, experience, project, and skills content
├── pages/            Home, Projects, Project Detail, Experience, About, Contact, and 404
├── test/             Test environment setup
├── types/            Portfolio data types
└── utils/            Accent mapping and RoRo response logic
scripts/
└── generate-route-html.mjs  Build-time route metadata shells
server/
├── roro.mjs                 Portfolio boundary, prompt, and Gemini request
└── vite-roro-plugin.mjs     Local server-only API middleware
api/
└── roro.js                  Production Vercel Function
public/
├── *.jpg             Project artwork supplied with the redesign
├── robots.txt        Search crawler policy
├── sitemap.xml       Canonical route inventory
└── site.webmanifest  Install metadata and icons
```

## Updating content

- Personal details and contact links: `src/data/profile.ts`
- Experience, education, and clubs: `src/data/experience.ts`
- Projects and case studies: `src/data/projects.mjs`
- Skills: `src/data/skills.ts`
- Gemini portfolio context and boundaries: `server/roro.mjs`
- Local fallback answers and links: `src/utils/askRoRo.ts`

When adding a project:

1. Add its typed record to `src/data/projects.mjs`.
2. Place its optimized image in `public/` and set the record's `image` path.
3. Add the route to `public/sitemap.xml`.
4. Update any affected RoRo copy and tests.

## SEO

The canonical production origin is `https://rohangottipati.com`.

- Baseline metadata and Person JSON-LD live in `index.html`.
- Shared route metadata lives in `src/data/seo.mjs` and is managed at runtime by `src/components/Seo.tsx`.
- The production build emits a metadata-complete HTML shell for every page and project via `scripts/generate-route-html.mjs`, so non-JavaScript crawlers and link unfurlers receive route-specific metadata.
- Crawl discovery is configured in `public/robots.txt` and `public/sitemap.xml`.
- Unknown routes receive `noindex, nofollow`.

If the production domain changes, update `SITE_URL` in `src/data/seo.mjs`, canonical URLs in `index.html`, and URLs in the public crawler files.

## Deployment

Vite generates directory and flat HTML entries for every public route. Vercel maps known routes to those metadata-complete files, while unknown routes retain a real HTTP 404; `vercel.json` also adds security and immutable asset-cache headers. The `/api/roro` Vercel Function requires a server-side `GEMINI_API_KEY` environment variable and optionally accepts `GEMINI_MODEL`. Equivalent SPA fallbacks are retained for Netlify (`public/_redirects`), Apache (`public/.htaccess`), and GitHub Pages (`public/404.html` plus the redirect recovery script in `index.html`).

RoRo sends the current question, optional highlighted portfolio text, and at most six recent chat turns to the server endpoint. The Gemini request uses `store: false`, low thinking effort, and a short output limit. No other portfolio feature calls Gemini.
