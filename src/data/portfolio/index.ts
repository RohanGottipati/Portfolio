import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  identity: {
    name: "Rohan Gottipati",
    shortName: "Rohan",
    role: "Software Engineer",
    subtitle: "Interactive portfolio",
    handle: "rohangottipati",
    avatar: "/rohan.jpg",
    tagline: "Terminal-style portfolio for recruiters, founders, and engineering teams.",
    statusLabel: "Currently building",
    statusDetail: "Full-stack software, data, and AI workflow delivery",
    location: "Waterloo, ON",
  },
  about: {
    intro: "",
    studying: "Bachelor of Computer Science, Big Data Concentration at Wilfrid Laurier University.",
    building: "",
    seeking: "",
    currentFocus: "",
    roles: [],
    highlights: [
      "Junior Software Engineer at DOUBL",
      "Software Engineer Intern experience at OneChart and AvertoAI",
      "AI/ML Research Assistant experience at Wilfrid Laurier University",
      "Club leadership across Laurier Analytics Society and Laurier Computing Society",
      "Interested in software engineering, AI systems, data platforms, and product infrastructure",
    ],
  },
  current: {
    building:
      "Production web systems, wallet integrations, content workflows, and AI-heavy product prototypes.",
    learning:
      "Backend architecture, cloud development, and reliable full-stack system design.",
    exploring:
      "Affective computing, real-time AI workflows, and developer-tool style interfaces.",
    workingOn: [
      "Role-gated CMS, wallet, and messaging infrastructure at DOUBL",
      "Hackathon products that turn agent pipelines into usable software",
    ],
  },
  experience: [
    {
      slug: "doubl-junior-software-engineer",
      title: "Junior Software Engineer",
      organization: "DOUBL",
      dateRange: "Jan 2026 – Present",
      location: "Toronto, ON, Canada",
      summary:
        "Builds production web, CMS, wallet, and messaging infrastructure across DOUBL's live product surface.",
      highlights: [
        "Developed a role-gated GCP/Firebase CMS with content validation checks and admin-only login, enabling live website content changes without redeployment and cutting update time from 2 hours to under 1 minute.",
        "Engineered Apple and Google Wallet integration with server-side device detection and pre-fetching in Next.js, boosting pass lookup speed by 40% and cold-start times by 35% across iOS and Android for 1,000+ active users.",
        "Reduced spam emails by 91% by implementing a tiered rate-limiting layer, IP-based throttling rules, and token validation middleware via Resend API, cutting unauthorized submissions by 94% and total server load by 28%.",
      ],
      techUsed: ["Next.js", "TypeScript", "GCP", "Firebase", "Resend API"],
      category: "work",
    },
    {
      slug: "onechart-software-engineer-intern",
      title: "Software Engineer Intern",
      organization: "OneChart",
      dateRange: "Jan 2026 – Apr 2026",
      location: "Waterloo, ON, Canada",
      summary:
        "Built clinician-facing Scribe, Chrome extension, transcription, and EMR autofill workflows.",
      highlights: [
        "Built a production-ready Scribe platform and Chrome extension for 50+ clinicians, with role-based permissions, session isolation, and HIPAA compliance, cutting administrative overhead by 63% across all clinical workflows.",
        "Reduced documentation time by 78% by integrating Deepgram and Gemini APIs into a real-time WebSocket transcription pipeline, achieving sub-400ms latency and enabling clinicians to review structured notes post-session.",
        "Engineered a PDF EMR autofill system using semantic matching to cross-reference patient notes and accurately fill in all form fields, with a live edit UI that instantly syncs all changes back to the PDF, cutting data entry by 82%.",
      ],
      techUsed: ["TypeScript", "React", "Deepgram", "Gemini", "WebSocket"],
      category: "work",
    },
    {
      slug: "laurier-ai-ml-research-assistant",
      title: "AI/ML Research Assistant",
      organization: "Wilfrid Laurier University",
      dateRange: "Jan 2026 – Apr 2026",
      summary:
        "Built research infrastructure for affective computing models applied to emotion-driven trading strategies.",
      highlights: [
        "Built scalable data pipelines to evaluate affective computing models applied to emotion-driven trading strategies.",
        "Processed 10K+ labeled sentiment data points by building emotion detection pipelines using Python and NLP.",
        "Engineered simulation environments testing 10+ agent strategies against emotion-weighted performance metrics.",
        "Developed reproducible experiment scripts and visualizations supporting an active research paper for publication.",
      ],
      techUsed: ["Python", "NLP", "Data Pipelines", "Experimentation"],
      category: "research",
    },
    {
      slug: "avertoai-software-engineer-intern",
      title: "Software Engineer Intern",
      organization: "AvertoAI",
      dateRange: "May 2025 – Dec 2025",
      location: "Toronto, ON, Canada",
      summary:
        "Built a full-stack food waste reduction platform and supplier-data backend for purchasing operations.",
      highlights: [
        "Built a full-stack food waste reduction platform with Python and FastAPI, connecting 3 supplier data sources to track and normalize purchasing data, reducing excess inventory orders by 25% and cutting total prep time by 55%.",
        "Designed and optimized a PostgreSQL database schema eliminating 1,200+ duplicate supplier records, reducing redundancy by 35%, and exposing clean consistent data access across the entire platform via RESTful APIs.",
        "Improved API response speed by 43% through targeted database indexing and query optimization, and built a Python validation layer enforcing business logic and rules across all supplier inputs, boosting data accuracy by 60%.",
      ],
      techUsed: ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
      category: "work",
    },
    {
      slug: "teachtrack-ai-cofounder",
      title: "Co-Founder, Software Engineer",
      organization: "TeachTrack AI",
      dateRange: "Apr 2025 – Dec 2025",
      summary:
        "Co-founded and engineered an AI EdTech platform focused on identifying student learning gaps.",
      highlights: [
        "Developed an AI EdTech startup platform using Python, Flask, and React to identify student learning gaps.",
        "Built data pipelines with Pandas + SQL to automate assessments and generate reports, cutting effort by 40%.",
        "Created interactive dashboards using Chart.js + React to track performance, increasing weekly teacher use.",
        "Integrated Git version control, unit testing, and code reviews to ensure maintainable and scalable development.",
      ],
      techUsed: ["Python", "Flask", "React", "Pandas", "SQL"],
      category: "founder",
    },
    {
      slug: "varsity-tutors-instructor",
      title: "Computer Science Instructor",
      organization: "Varsity Tutors",
      dateRange: "Nov 2024 – Dec 2025",
      summary:
        "Taught core computer science topics through individual and group instruction focused on practical problem solving.",
      highlights: [
        "Taught Python, Java, OOP, data structures and algorithms to individual and group classes of 10+ students.",
        "Developed custom coding exercises and implementations for arrays, linked lists, stacks, queues, and trees.",
        "Walked through debugging, recursion traces, and time complexity concepts to strengthen problem solving.",
      ],
      techUsed: ["Python", "Java", "Data Structures", "Teaching"],
      category: "teaching",
    },
    {
      slug: "dmz-voyage-fellow",
      title: "Basecamp Sprint + Voyage Fellow",
      organization: "DMZ",
      dateRange: "May 2025 – Aug 2025",
      summary:
        "Refined the TeachTrack AI prototype through high-speed iteration, technical demos, and mentor feedback.",
      highlights: [
        "Developed and refined the TeachTrack AI prototype, enhancing scalability and validation speed by 60%.",
        "Built interactive web demos using React and streamlined REST APIs, accelerating iteration cycles.",
        "Presented polished technical demos to mentors and investors, refining MVP architecture through live feedback.",
      ],
      techUsed: ["React", "REST APIs", "MVP Iteration", "Pitching"],
      category: "founder",
    },
  ],
  clubs: [
    {
      slug: "laurier-analytics-society-vp-technology",
      title: "VP of Technology",
      organization: "Laurier Analytics Society",
      dateRange: "May 2026 – Present",
      summary:
        "Leads technical planning and tooling for Laurier Analytics Society initiatives.",
      highlights: [],
      techUsed: ["Leadership", "Technology", "Analytics"],
      category: "leadership",
    },
    {
      slug: "laurier-computing-society-vp-finance",
      title: "VP of Finance",
      organization: "Laurier Computing Society",
      dateRange: "Jan 2026 – Present",
      summary:
        "Lead annual financial planning and reporting for Laurier Computing Society events and operations.",
      highlights: [
        "Manage annual budget and oversee financial allocations, ensuring fiscal responsibility.",
        "Track sponsorships, reimbursements, and event expenses through organized financial reporting systems.",
      ],
      techUsed: ["Financial Reporting", "Operations", "Leadership"],
      category: "leadership",
      promotedFrom: "Finance Coordinator",
    },
    {
      slug: "laurier-computing-society-finance-coordinator",
      title: "Finance Coordinator",
      organization: "Laurier Computing Society",
      dateRange: "Sep 2025 – Jan 2026",
      summary:
        "Supported financial operations and reimbursement workflows before transitioning into the VP of Finance role.",
      highlights: [
        "Assisted in managing the club's financial operations and tracking expenses for various events.",
        "Supported the VP of Finance in preparing budget reports and processing reimbursement requests.",
      ],
      techUsed: ["Operations", "Budgeting", "Leadership"],
      category: "leadership",
    },
  ],
  projects: [
    {
      slug: "aura",
      name: "A.U.R.A.",
      summary:
        "AI floor-plan conversion system that turns 2D layouts into interactive 3D environments.",
      description:
        "A.U.R.A. converts floor plans into full 3D environments through a multi-agent AI pipeline and presents the result in a performant Three.js viewer with walk mode, object controls, and editing tools.",
      stack: ["Next.js", "Three.js", "TypeScript", "Vultr", "PostgreSQL"],
      features: [
        "Turns floor plans into 3D environments",
        "Supports walk mode and object editing",
        "Runs concurrent conversion jobs on Vultr",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/A.U.R.A",
          kind: "github",
          external: true,
        },
        {
          label: "Devpost",
          href: "https://devpost.com/software/a-u-r-a-architectural-understanding-rendering-agent",
          kind: "devpost",
          external: true,
        },
      ],
      impact: "Best Use of Vultr & Backboard, BearHacks 2026",
      tags: ["AI Agents", "Three.js", "Vultr", "Hackathon"],
    },
    {
      slug: "scout",
      name: "Scout",
      summary:
        "Backboard-powered research tool that reveals the history, gaps, and build path behind hackathon ideas.",
      description:
        "Scout turns a rough hackathon idea into a three-act narrative research experience, using seven Backboard and Gemini agents to find prior attempts, competitors, repeated failure patterns, and a practical MVP plan.",
      stack: [
        "React 18",
        "Vite",
        "React Router",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "Backboard.io",
      ],
      features: [
        "Researches past attempts for new ideas",
        "Finds competitors, gaps, and failure patterns",
        "Reveals results through a story format",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/Scout",
          kind: "github",
          external: true,
        },
        {
          label: "Devpost",
          href: "https://devpost.com/software/1-hlgbas",
          kind: "devpost",
          external: true,
        },
      ],
      impact: "Best Use of Backboard, HuskyHacks 2026",
      tags: ["Backboard", "AI Agents", "Research"],
    },
    {
      slug: "spar",
      name: "Spar",
      summary:
        "AI mock coding interview platform for debugging broken codebases with live voice feedback and scored reports.",
      description:
        "Spar simulates realistic engineering interviews by dropping candidates into broken codebases, streaming their voice through an AI interviewer, tracking editor behavior, and producing a scored hiring-style report from specialized analyzers.",
      stack: [
        "React 19",
        "Vite",
        "Monaco Editor",
        "Deepgram Voice Agent API",
        "Gemini 2.5 Flash",
        "Node.js",
      ],
      features: [
        "Runs live AI coding interview simulations",
        "Tracks voice, editor, and debugging behavior",
        "Generates scored interview report cards",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/Spar/tree/main",
          kind: "github",
          external: true,
        },
        {
          label: "Devpost",
          href: "https://devpost.com/software/spar-9getb3",
          kind: "devpost",
          external: true,
        },
      ],
      impact: "Honourable Mention, DDC x IgnitionHacks 2026",
      tags: ["AI Agents", "Voice AI", "Monaco"],
    },
    {
      slug: "greenlens-ai",
      name: "GreenLens AI",
      summary:
        "ESG audit platform that evaluates AI carbon, water, license waste, and ROI through a 6-agent pipeline.",
      description:
        "GreenLens AI automates ESG analysis for AI usage by connecting workplace APIs, detecting anomalous waste patterns, and generating PDF reports that turn raw usage data into audit-ready recommendations.",
      stack: ["Next.js", "TypeScript", "Supabase", "Recharts", "OpenAI API"],
      features: [
        "Audits AI usage for ESG impact",
        "Connects workplace data from productivity APIs",
        "Generates anomaly-backed ESG PDF reports",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/Greenlens",
          kind: "github",
          external: true,
        },
      ],
      impact: "1st Overall, Data Minds Challenge 2.0",
      tags: ["ESG", "AI Agents", "Analytics", "Next.js"],
    },
    {
      slug: "caresync",
      name: "CareSync",
      summary:
        "AI-powered care coordination platform for secure multi-role clinical workflows.",
      description:
        "CareSync is a full-stack healthcare coordination platform for PSWs, family members, and care coordinators, with secure role-based access, medication risk monitoring, and AI-generated clinical shift briefings.",
      stack: ["React", "Node.js", "PostgreSQL", "Auth0", "Vultr"],
      features: [
        "Supports PSWs, families, and coordinators",
        "Flags medication risks from patient records",
        "Generates structured clinical shift briefings",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/CareSync",
          kind: "github",
          external: true,
        },
        {
          label: "Devpost",
          href: "https://devpost.com/software/caresync-kj2ch4",
          kind: "devpost",
          external: true,
        },
      ],
      impact: "Best Use of Vultr, Hack Canada 2026",
      tags: ["AI", "Healthcare", "React", "Vultr"],
    },
    {
      slug: "spectra",
      name: "Spectra",
      summary:
        "Security-focused analytics layer for AI agents operating on the Solana blockchain.",
      description:
        "Spectra is a real-time behavioral classification and analytics platform built to act as a security layer for Solana-based AI agents. The project focuses on monitoring behavior, surfacing suspicious patterns, and packaging those signals into an operator-friendly analytics experience.",
      stack: ["Next.js", "React", "TypeScript", "Solana Web3.js", "Supabase"],
      features: [
        "Tracks real-time agent behavior across blockchain activity",
        "Classifies suspicious or risky behavioral patterns",
        "Packages monitoring into a security-oriented analytics experience",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/Spectra",
          kind: "github",
          external: true,
        },
        {
          label: "Devpost",
          href: "https://devpost.com/software/s-e-n-t-r-a",
          kind: "devpost",
          external: true,
        },
      ],
      impact: "Best Use of Solana, uOttaHack 2026",
      tags: ["Solana", "AI Agents", "Security", "Analytics"],
    },
    {
      slug: "medalyze",
      name: "Medalyze",
      summary:
        "Olympic athlete analysis in R focused on medal outcomes and performance drivers.",
      description:
        "Medalyze explores Olympic athlete data to uncover how age, physical attributes, and event-level factors influence performance and medal outcomes. The project emphasizes statistical modeling, data cleaning, and analytical storytelling in R.",
      stack: ["R", "Tidyverse", "Tidymodels", "ggplot2"],
      features: [
        "Analyzes athlete attributes against medal outcomes",
        "Explores event-level variables influencing performance",
        "Uses statistical modeling to turn raw data into findings",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/Olympics_Dataset",
          kind: "github",
          external: true,
        },
      ],
      tags: ["R", "Analytics", "Statistics"],
    },
    {
      slug: "letterly",
      name: "Letterly",
      summary:
        "Web typing platform that measures speed, accuracy, and behavior across multiple text modes.",
      description:
        "Letterly is a React and TypeScript typing platform that goes beyond raw WPM by tracking speed, accuracy, and behavioral metrics across different test styles and durations. The project focuses on responsive interaction, live feedback, and a strong learning loop.",
      stack: ["React", "TypeScript", "Tailwind CSS"],
      features: [
        "Measures speed, accuracy, and behavioral typing metrics",
        "Supports multiple text modes and adaptive test durations",
        "Delivers a responsive and feedback-rich practice interface",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/Typing",
          kind: "github",
          external: true,
        },
      ],
      tags: ["React", "TypeScript", "UX"],
    },
    {
      slug: "movemind",
      name: "MoveMind",
      summary:
        "Wearable-sensor ML system for classifying barbell exercises with 89.5% accuracy.",
      description:
        "MoveMind is a machine learning system that classifies barbell exercises such as bench press, squat, and deadlift using wearable sensor data. The project combines data processing, model evaluation, and user-facing presentation for fitness-focused insights.",
      stack: ["Python", "scikit-learn", "Pandas"],
      features: [
        "Classifies multiple barbell movements from wearable inputs",
        "Reached 89.5% accuracy on the modeled exercise set",
        "Packages ML results into an understandable product story",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/MoveMind",
          kind: "github",
          external: true,
        },
      ],
      impact: "89.5% classification accuracy",
      tags: ["Machine Learning", "Wearables", "Classification"],
    },
    {
      slug: "portfolio",
      name: "Portfolio",
      summary:
        "Previous portfolio built as an interactive 3D experience with modern UI animations.",
      description:
        "The previous portfolio combined React, Three.js, Tailwind CSS, and Framer Motion to showcase projects and skills through a more cinematic browsing experience. It serves as the design foundation for this new terminal-style rebuild.",
      stack: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
      features: [
        "Combines 3D visuals with responsive layout",
        "Uses animated project and skill sections",
        "Carries forward dark portfolio branding",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/Portfolio",
          kind: "github",
          external: true,
        },
      ],
      tags: ["Portfolio", "3D", "React"],
    },
    {
      slug: "quote-of-the-day",
      name: "Quote of the Day",
      summary:
        "React + TypeScript app for daily quotes with a dark/light theme toggle.",
      description:
        "Quote of the Day is a lighter React and TypeScript project that consumes the ZenQuotes API and presents a simple quote-reading experience with theme switching. It demonstrates clean state handling and straightforward API consumption.",
      stack: ["React", "TypeScript", "Tailwind CSS"],
      features: [
        "Fetches fresh quotes from the ZenQuotes API",
        "Supports dark and light theme switching",
        "Keeps the interface minimal and readable",
      ],
      role: "Developer",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/RohanGottipati/Quote_Of_The_Day",
          kind: "github",
          external: true,
        },
      ],
      tags: ["React", "TypeScript", "API"],
    },
  ],
  skills: [
    {
      key: "languages",
      label: "Languages",
      summary: "Programming and markup languages.",
      items: [
        "TypeScript",
        "JavaScript",
        "Python",
        "SQL",
        "Java",
        "R",
        "C",
        "C++",
        "HTML",
        "CSS",
      ],
    },
    {
      key: "frontend",
      label: "Frameworks & Libraries",
      summary: "Core frameworks, libraries, and data tooling.",
      items: [
        "React",
        "Next.js",
        "Three.js",
        "FastAPI",
        "Tailwind CSS",
        "pandas",
        "NumPy",
        "scikit-learn",
        "ggplot2",
      ],
    },
    {
      key: "tools-platforms",
      label: "Tools and Technologies",
      summary: "Infrastructure, APIs, and deployment tools.",
      items: [
        "REST APIs",
        "Node.js",
        "PostgreSQL",
        "Google Cloud Platform",
        "Supabase",
        "Docker",
        "Git",
        "Vercel",
        "Railway",
      ],
    },
  ],
  contact: {
    email: "rohan.gottipati@gmail.com",
    github: "https://github.com/RohanGottipati",
    linkedin: "https://www.linkedin.com/in/rohangottipati/",
    resume: "/resume.pdf",
  },
  quickLinks: [
    {
      label: "GitHub",
      href: "https://github.com/RohanGottipati",
      kind: "github",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rohangottipati/",
      kind: "linkedin",
      external: true,
    },
  ],
  pinnedCommands: [
    "/about",
    "/experience",
    "/clubs",
    "/projects",
    "/project aura",
    "/skills frontend",
    "/contact",
  ],
};
