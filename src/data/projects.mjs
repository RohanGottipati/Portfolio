/** @typedef {import('../types/portfolio').Project} Project */

/** @type {Project[]} */
export const projects = [
{
  slug: 'portfolio',
  name: 'This Portfolio',
  year: '2026',
  summary:
  'Paper-collage portfolio built as both an engineering project and a visual design system.',
  description:
  'I built this site as the home for my projects, experience, and experiments. I designed the paper-collage system around a dotted canvas, taped index cards, custom project artwork, and a serif and mono type pairing. I also built the multi-stage intro, the hand-cut paper cursor, highlighted-text questions, and RoRo, my Gemini-powered portfolio assistant.',
  stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  features: [
  'Designed the dotted canvas, taped index cards, custom project artwork, and serif and mono typography as one cohesive visual system',
  'Built a reduced-motion-safe intro sequence with a typed headline, marker sweep, staggered paper drop, and split reveal',
  'Created a custom paper cursor and highlighted-text flow that lets visitors ask RoRo about selected portfolio content',
  'Shipped a Gemini-powered portfolio assistant with server-side relevance filtering, concise answers, and local fallbacks'],

  role: 'Designer & Developer',
  links: [
  { label: 'Live site', href: 'https://rohangottipati.com' },
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/Portfolio' }],

  tags: ['Design', 'Front-end', 'Motion', 'React'],
  accent: 'tangerine',
  image: "/c7482166-3a87-4a04-8b46-94156b0b0e28.jpg",
  featured: false
},
{
  slug: 'greenlens-ai',
  name: 'GreenLens AI',
  year: '2026',
  summary:
  'ESG audit platform that evaluates AI carbon, water, license waste, and ROI through a 6-agent pipeline.',
  description:
  'My team and I built GreenLens AI to automate a previously manual ESG audit. Our six-agent pipeline evaluates AI carbon, water, license waste and ROI, ingests enterprise signals from Microsoft Graph, Google Workspace and OpenAI, and generates PDF reports with z-score anomaly detection and OLS regression to flag outliers and surface trends.',
  stack: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI API'],
  features: [
  'Built a 6-agent pipeline evaluating AI carbon, water, license waste, and ROI, automating a previously manual ESG audit',
  'Integrated Microsoft Graph, Google Workspace, and OpenAI APIs to automatically ingest enterprise ESG signals',
  'Generated ESG PDF reports using z-score anomaly detection and OLS regression to flag outliers and surface trends'],

  role: 'Developer',
  links: [
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/Greenlens' }],

  impact: '1st Overall, Data Minds Challenge 2.0',
  tags: ['ESG', 'AI Agents', 'Analytics', 'Next.js'],
  accent: 'lime',
  image: "/15958fba-0eb9-4d42-9c49-c72e86d80c5b.jpg",

  featured: true
},
{
  slug: 'techto',
  name: 'TechTO',
  year: '2026',
  summary:
  'Toronto digital twin that turns natural-language planning questions into simulations, analyses and map actions.',
  description:
  'My team and I built TechTO as a Next.js and MapLibre decision-support tool for City of Toronto planning, or "the Claude Code of city planning." We let planners ask free-form questions and receive simulations, Python analyses and map actions grounded in 158-neighbourhood boundaries, 2021 Census profiles and official TTC GTFS geometry. Our model predicts day-one acceptance, not physical or economic consequences, and we separate measured inputs from modeled assumptions in every report.',
  stack: [
  'Next.js',
  'TypeScript',
  'Python',
  'MongoDB Atlas',
  'MapLibre GL',
  'Zustand'],

  features: [
  'Built a Toronto digital twin turning natural-language questions into simulations, Python analyses, and map actions',
  'Generated 100,000+ Census-grounded simulated citizens, modeling acceptance across demographics and neighbourhoods',
  'Fine-tuned a GPU-backed Qwen model with SFT and reinforcement learning to predict weighted citizen reactions'],

  role: 'Developer',
  links: [
  { label: 'Live site', href: 'https://tech-to.vercel.app' },
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/TechTO' },
  { label: 'Devpost', href: 'https://devpost.com/software/twin-sli6v1' }],

  impact: 'Best Use of MongoDB Atlas, Hack the 6ix',
  tags: ['Digital Twin', 'AI Agents', 'Civic Tech', 'Next.js'],
  accent: 'sky',
  image: "/dad7ed1a-9bb3-474d-9bc6-f96c477d641e.jpg",

  featured: true
},
{
  slug: 'scotiacheck',
  name: 'ScotiaCheck',
  year: '2026',
  date: 'August 2026',
  summary:
  'An AI-powered financial advice checker that weighs online money advice against a Gen Z user’s real financial context before they act.',
  description:
  'I built ScotiaCheck for the Scotiabank x Tangerine Student Hackathon: S:\\HA<KS 2026. It lets Gen Z paste or upload financial advice, extracts the action and assumptions behind it, and compares the recommendation with balances, spending, debt, income and upcoming obligations. The Alex demo showed why a headline $400 car payment did not fit an 18-year-old with roughly $10.8K saved and a $6,000 tuition payment due in six weeks. ScotiaCheck provides personalized context and a useful next step without reducing nuanced advice to a universal good-or-bad verdict.',
  stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router'],
  features: [
  'Accepts pasted advice or screenshots from social platforms, AI tools and friends',
  'Extracts the recommended action and surfaces the assumptions behind it',
  'Compares the advice with real financial context and shows hidden costs visually',
  'Suggests an appropriate next step without labelling advice universally good or bad'],
  role: 'Developer',
  event: 'Scotiabank x Tangerine Student Hackathon: S:\\HA<KS 2026',
  challenge: 'Financial Confidence in an AI World: “When everyone has advice, who do you trust?”',
  tagline: 'Don’t just take financial advice. Check it.',
  links: [],
  impact: '2nd Place at S:\\HA<KS 2026',
  tags: [
  'AI',
  'FinTech',
  'Financial Literacy',
  'Personalization',
  'Product Design',
  'Scotiabank',
  'Hackathon'],
  accent: 'blush',
  image: '/f924dd4c-4bcd-4e4c-9c5f-5824883194f4.jpg',
  featured: true
},
{
  slug: 'aura',
  name: 'A.U.R.A.',
  year: '2026',
  summary:
  'AI floor-plan conversion system that turns 2D layouts into interactive 3D environments.',
  description:
  'My team and I built A.U.R.A. to convert detailed floor plans into full 3D environments through a three-agent AI pipeline. We automated each modeling stage and presented the result in a custom Three.js viewer with walk mode, object editing and sub-50ms frame render times.',
  stack: [
  'Next.js',
  'TypeScript',
  'Three.js',
  'PostgreSQL',
  'Gemini API'],

  features: [
  'Converted detailed floor plans into full 3D environments through a 3-agent AI pipeline that automated each modeling stage',
  'Built a custom Three.js viewer with walk mode and object editing, holding sub-50ms frame render times in TypeScript',
  'Deployed on a cloud VPS with S3-compatible storage, PostgreSQL, and load balancing to handle 100+ concurrent renders'],

  role: 'Developer',
  links: [
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/A.U.R.A' },
  {
    label: 'Devpost',
    href: 'https://devpost.com/software/a-u-r-a-architectural-understanding-rendering-agent'
  }],

  impact: '2x Sponsor Award Winner, BearHacks',
  tags: ['AI Agents', 'Three.js', '3D', 'Hackathon'],
  accent: 'tangerine',
  image: "/ca04a1bb-f5cc-4571-8ad0-490d773503a8.jpg",

  featured: true
},
{
  slug: 'scout',
  name: 'Scout',
  year: '2026',
  summary:
  'Grounded research engine that reveals the history, gaps, and build path behind a new idea.',
  description:
  'My team and I built Scout to mine 9+ sources through Google Search while deduping and URL-validating every cited result. We keep a persistent memory graph with RAG-style semantic recall over structured metadata to reuse prior research, then synthesize an opportunity gap and build plan with Gemini, JSON schema validation, retries and fallbacks.',
  stack: [
  'JavaScript',
  'React',
  'Node.js',
  'Express',
  'Gemini API',
  'Tailwind CSS'],

  features: [
  'Built a grounded retrieval engine that mines 9+ sources via Google Search, deduping and URL-validating every cited result',
  'Engineered a persistent memory graph that runs RAG-style semantic recall over structured metadata to reuse prior research',
  'Synthesized an opportunity gap and build plan with Gemini, hardened by JSON schema validation, retries, and fallbacks'],

  role: 'Developer',
  links: [
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/Scout' },
  { label: 'Devpost', href: 'https://devpost.com/software/1-hlgbas' }],

  impact: 'Sponsor Award Winner, HuskyHacks',
  tags: ['AI Agents', 'Research', 'RAG'],
  accent: 'lime',
  image: "/57d75bc7-671b-4424-9ffb-7fbe18de701d.jpg",

  featured: false
},
{
  slug: 'playground',
  name: 'Playground',
  year: '2026',
  summary:
  'One photo of a desk becomes a playable 2D platformer that anyone can publish.',
  description:
  'My team and I built Playground around four steps: arrange, snap, play and publish. We send a single photo of physical objects through Backboard GPT-4o with a strict JSON-only contract, then deterministically map detected objects to platformer mechanics. Books become platforms, cables become moving platforms and scissors become hazards. We BFS-check and auto-repair every level before rendering with Phaser 3, and give every published game a public slug and leaderboard.',
  stack: [
  'Next.js',
  'TypeScript',
  'Phaser 3',
  'Supabase',
  'Backboard GPT-4o',
  'zod'],

  features: [
  'Turns one photo of everyday objects into a playable, originally generated 2D platformer',
  'Maps objects to mechanics deterministically, so the model never controls physics or playability',
  'Validates every level with a BFS reachability check and records each auto-repair action',
  'Ships four seeded game modes plus publishing, leaderboards and a generation learning loop'],

  role: 'Developer',
  links: [
  { label: 'Live site', href: 'https://playground-gaming.vercel.app' },
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/Playground' },
  { label: 'Devpost', href: 'https://devpost.com/software/playground-41cijq' }],

  impact: '3rd Place Overall, SumerHacks',
  tags: ['Computer Vision', 'Games', 'AI Agents', 'Next.js'],
  accent: 'peach',
  image: "/9eb2df58-4f36-40d9-9a51-6c7a2a29b212.jpg",

  featured: true
},
{
  slug: 'spar',
  name: 'Spar',
  year: '2026',
  summary:
  'AI mock coding interview platform for debugging broken codebases with live voice feedback and scored reports.',
  description:
  'My team and I built Spar to simulate realistic engineering interviews by dropping candidates into broken codebases, streaming their voice through an AI interviewer, tracking editor behavior, and producing a scored hiring-style report from specialized analyzers.',
  stack: [
  'React 19',
  'Vite',
  'Monaco Editor',
  'Deepgram Voice Agent API',
  'Gemini 2.5 Flash',
  'Node.js'],

  features: [
  'Runs live AI coding interview simulations',
  'Tracks voice, editor, and debugging behavior',
  'Generates scored interview report cards'],

  role: 'Developer',
  links: [
  {
    label: 'GitHub',
    href: 'https://github.com/RohanGottipati/Spar/tree/main'
  },
  { label: 'Devpost', href: 'https://devpost.com/software/spar-9getb3' }],

  impact: 'Honourable Mention, DDC x IgnitionHacks',
  tags: ['AI Agents', 'Voice AI', 'Monaco'],
  accent: 'peach',
  image: "/f59e0fce-9ed6-46a6-bc3e-0a219061fa4a.jpg",

  featured: false
},
{
  slug: 'caresync',
  name: 'CareSync',
  year: '2026',
  summary:
  'AI-powered care coordination platform for secure multi-role clinical workflows.',
  description:
  'My team and I built CareSync as a full-stack healthcare coordination platform for PSWs, family members and care coordinators, with secure role-based access, medication risk monitoring and AI-generated clinical shift briefings.',
  stack: ['React', 'Node.js', 'PostgreSQL', 'Auth0'],
  features: [
  'Supports PSWs, families, and coordinators in one workflow',
  'Flags medication risks from patient records',
  'Generates structured clinical shift briefings'],

  role: 'Developer',
  links: [
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/CareSync' },
  { label: 'Devpost', href: 'https://devpost.com/software/caresync-kj2ch4' }],

  impact: 'Sponsor Award Winner, Hack Canada',
  tags: ['AI', 'Healthcare', 'React'],
  accent: 'sky',
  image: "/876bae56-0c94-4227-ae96-8119d5d8bd65.jpg",

  featured: false
},
{
  slug: 'spectra',
  name: 'Spectra',
  year: '2026',
  summary:
  'Security-focused analytics layer for AI agents operating on the Solana blockchain.',
  description:
  'My team and I built Spectra as a real-time behavioral classification and analytics platform for Solana-based AI agents. We monitor behavior, surface suspicious patterns and package those signals into an operator-friendly security experience.',
  stack: ['Next.js', 'React', 'TypeScript', 'Solana Web3.js', 'Supabase'],
  features: [
  'Tracks real-time agent behavior across blockchain activity',
  'Classifies suspicious or risky behavioral patterns',
  'Packages monitoring into a security-oriented analytics experience'],

  role: 'Developer',
  links: [
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/Spectra' },
  { label: 'Devpost', href: 'https://devpost.com/software/s-e-n-t-r-a' }],

  impact: 'Best Use of Solana, uOttaHack',
  tags: ['Solana', 'AI Agents', 'Security', 'Analytics'],
  accent: 'blush',
  image: "/6adc1a7d-110a-48b9-9b0b-eac78f260ac4.jpg",

  featured: false
},
{
  slug: 'movemind',
  name: 'MoveMind',
  year: '2025',
  summary:
  'Wearable-sensor ML system that classifies barbell exercises with 89.5% accuracy.',
  description:
  'I built MoveMind to classify barbell exercises such as bench press, squat and deadlift from wearable sensor data. I combined data processing, model evaluation and user-facing presentation to turn the results into useful fitness insights.',
  stack: ['Python', 'scikit-learn', 'pandas'],
  features: [
  'Classifies multiple barbell movements from wearable inputs',
  'Reached 89.5% accuracy on the modeled exercise set',
  'Packages ML results into an understandable product story'],

  role: 'Developer',
  links: [
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/MoveMind' }],

  tags: ['Machine Learning', 'Wearables', 'Classification'],
  accent: 'peach',
  image: "/15263f44-5227-4a73-80a8-ac4e310b5581.jpg",

  featured: false
},
{
  slug: 'medalyze',
  name: 'Medalyze',
  year: '2025',
  summary:
  'Olympic athlete analysis in R focused on medal outcomes and performance drivers.',
  description:
  'I built Medalyze to explore Olympic athlete data and uncover how age, physical attributes and event-level factors influence performance and medal outcomes. I used statistical modeling, data cleaning and analytical storytelling in R.',
  stack: ['R', 'Tidyverse', 'Tidymodels', 'ggplot2'],
  features: [
  'Analyzes athlete attributes against medal outcomes',
  'Explores event-level variables influencing performance',
  'Uses statistical modeling to turn raw data into findings'],

  role: 'Developer',
  links: [
  {
    label: 'GitHub',
    href: 'https://github.com/RohanGottipati/Olympics_Dataset'
  }],

  tags: ['R', 'Analytics', 'Statistics'],
  accent: 'sky',
  image: "/59b44aa4-6115-4229-bf27-ed9b6bb341ac.jpg",

  featured: false
},
{
  slug: 'letterly',
  name: 'Letterly',
  year: '2025',
  summary:
  'Web typing platform that measures speed, accuracy, and behavior across multiple text modes.',
  description:
  'I built Letterly as a React and TypeScript typing platform that goes beyond raw WPM. I track speed, accuracy and behavioral metrics across different test styles and durations while emphasizing responsive interaction, live feedback and a strong learning loop.',
  stack: ['React', 'TypeScript', 'Tailwind CSS'],
  features: [
  'Measures speed, accuracy, and behavioral typing metrics',
  'Supports multiple text modes and adaptive test durations',
  'Delivers a responsive and feedback-rich practice interface'],

  role: 'Developer',
  links: [
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/Typing' }],

  tags: ['React', 'TypeScript', 'UX'],
  accent: 'lime',
  image: "/ab590a76-e8e4-44c6-9e7e-80fe3da4b938.jpg",

  featured: false
},
{
  slug: 'quote-of-the-day',
  name: 'Quote of the Day',
  year: '2024',
  summary:
  'React and TypeScript app for daily quotes with a dark and light theme toggle.',
  description:
  'I built Quote of the Day as a lighter React and TypeScript project that consumes the ZenQuotes API. I created a simple quote-reading experience with theme switching, clean state handling and straightforward API consumption.',
  stack: ['React', 'TypeScript', 'Tailwind CSS'],
  features: [
  'Fetches fresh quotes from the ZenQuotes API',
  'Supports dark and light theme switching',
  'Keeps the interface minimal and readable'],

  role: 'Developer',
  links: [
  {
    label: 'GitHub',
    href: 'https://github.com/RohanGottipati/Quote_Of_The_Day'
  }],

  tags: ['React', 'TypeScript', 'API'],
  accent: 'tangerine',
  image: "/6a5af70a-a2ea-432c-ac8a-4959064e7ebc.jpg",

  featured: false
},
{
  slug: 'portfolio-3d',
  name: 'Portfolio (3D)',
  year: '2024',
  summary:
  'Previous portfolio built as an interactive 3D experience with modern UI animations.',
  description:
  'I built this earlier portfolio with React, Three.js, Tailwind CSS and Framer Motion to showcase my projects and skills through a more cinematic browsing experience.',
  stack: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
  features: [
  'Combines 3D visuals with a responsive layout',
  'Uses animated project and skill sections',
  'Creates a cinematic browsing experience'],

  role: 'Developer',
  links: [
  { label: 'GitHub', href: 'https://github.com/RohanGottipati/Portfolio' }],

  tags: ['Portfolio', '3D', 'React'],
  accent: 'blush',
  image: "/9ea322c0-4973-4388-9d2a-2517d4eeafea.jpg",

  featured: false
}];


const featuredProjectSlugs = [
  'techto',
  'greenlens-ai',
  'scotiacheck',
  'aura',
  'playground'
];

export const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
  const project = projects.find((entry) => entry.slug === slug);
  return project ? [project] : [];
});
