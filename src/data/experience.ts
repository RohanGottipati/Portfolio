import type { Role } from '../types/portfolio';

export const experience: Role[] = [
{
  slug: 'intact-it-technical-advisor-intern',
  title: 'IT Technical Advisor Intern, Software Engineering & Integrations',
  organization: 'Intact Financial Corporation',
  dateRange: 'Sep 2026 - Present',
  location: 'Toronto, ON',
  summary:
  'Focus on multi-system integrations, architecture, and cloud tooling.',
  highlights: [
  'Focus on multi-system integrations, architecture, and cloud tooling across Java, Python, AWS, Kubernetes, and CI/CD.'],

  techUsed: ['Java', 'Python', 'AWS', 'Kubernetes', 'CI/CD'],
  kind: 'work'
},
{
  slug: 'laurier-ai-ml-research-assistant',
  title: 'AI/ML Research Assistant',
  organization: 'Wilfrid Laurier University',
  dateRange: 'Jan 2026 - Present',
  location: 'Waterloo, ON',
  summary:
  'Build research infrastructure for affective-computing models across personality-driven trading strategies and experimental scenarios.',
  highlights: [
  'Built scalable data pipelines to evaluate affective-computing models across personality-driven trading strategies and experimental scenarios.',
  'Processed 10K+ labeled sentiment data points by developing Python/NLP pipelines for personality detection and classification.',
  'Engineered simulation environments evaluating 10+ agent strategies against personality-weighted performance metrics across repeated experiments.',
  'Developed reproducible experiment scripts and visualizations supporting analysis for an active research paper targeting publication.'],

  techUsed: ['Python', 'NLP', 'Data Pipelines', 'Experimentation'],
  kind: 'research'
},
{
  slug: 'doubl-junior-software-engineer-intern',
  title: 'Junior Software Engineer Intern, Full-Stack',
  organization: 'DOUBL',
  dateRange: 'Jan 2026 - Aug 2026',
  location: 'Toronto, ON',
  summary:
  "Top contributor on DOUBL's Next.js platform, spanning recommendations, Shopify, Firebase/GCP and analytics.",
  highlights: [
  'Led full-stack development of the Next.js platform as its top contributor, authoring 465 commits across recommendation, Shopify, Firebase/GCP, and analytics systems to deliver a personalized shopping engine powered by live Shopify data.',
  'Strengthened production security and reliability by remediating 2 critical and 32 high-severity vulnerabilities, enforcing TLS 1.3, and root-causing and resolving a purchase-attribution failure affecting 3 Shopify partner stores.',
  'Reduced content-update turnaround from 2+ hours to under 1 minute by developing a role-gated GCP/Firebase CMS with schema validation and server-side admin authentication, enabling non-technical staff to publish without redeployment.'],

  techUsed: ['Next.js', 'TypeScript', 'Shopify', 'Firebase', 'GCP'],
  kind: 'work'
},
{
  slug: 'onechart-software-engineer-intern',
  title: 'Software Engineer Intern, AI Integrations & Backend',
  organization: 'OneChart',
  dateRange: 'Jan 2026 - Apr 2026',
  location: 'Waterloo, ON',
  summary:
  'Built the clinician-facing Scribe platform, real-time transcription pipeline and PDF EMR autofill.',
  highlights: [
  'Built a production Scribe web platform and Chrome extension used by 50+ clinicians, with role-based permissions, session isolation, and HIPAA-aligned handling of protected health data, reducing daily administrative work across clinical workflows.',
  'Integrated Deepgram and Gemini APIs into a real-time WebSocket transcription pipeline achieving sub-400ms latency, automatically drafting structured clinical notes that clinicians could review and edit instead of typing them from scratch.',
  'Cut manual clinician data entry by 85% by engineering a PDF EMR autofill system using semantic matching to map patient-note content onto form fields, paired with a live edit UI that syncs clinician changes back to the PDF in real time.'],

  techUsed: ['TypeScript', 'React', 'Deepgram', 'Gemini API', 'WebSockets'],
  kind: 'work'
},
{
  slug: 'avertoai-forward-deployed-engineer-intern',
  title: 'Forward Deployed Engineer Intern',
  organization: 'AvertoAI',
  dateRange: 'May 2025 - Dec 2025',
  location: 'Toronto, ON',
  summary:
  'Deployed a full-stack food-waste platform and supplier-data backend across client sites.',
  highlights: [
  'Cut excess inventory by nearly 25% across client sites by building a full-stack food-waste platform using Python/FastAPI that unified 3 disparate supplier data sources, helping teams right-size supplier orders and reduce waste across operations.',
  'Improved data consistency across client rollouts by designing a PostgreSQL schema that removed 1,200+ duplicate supplier records, enforced referential integrity, and exposed reliable data to downstream production services through RESTful APIs.',
  'Improved database speed and ingestion reliability as client sites scaled by optimizing indexes and queries, then built a Python validation layer enforcing supplier rules and automatically rejecting malformed records before they ever reached the database.'],

  techUsed: ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs'],
  kind: 'work'
},
{
  slug: 'stealth-startup-cofounder',
  title: 'Co-Founder, Software Engineer',
  organization: 'Stealth Startup',
  dateRange: 'Apr 2025 - Dec 2025',
  summary:
  'Co-founded and engineered an AI EdTech platform focused on identifying student learning gaps.',
  highlights: [
  'Built an AI EdTech platform using Python, Flask, and React to identify student learning gaps and personalize assessment workflows.',
  'Cut assessment and reporting effort by 40% by engineering pandas/SQL data pipelines that automated scoring, analysis, and report generation.',
  'Increased weekly teacher usage by building interactive React and Chart.js dashboards that surfaced student performance trends and learning gaps.',
  'Accelerated product validation by iterating on assessment logic, dashboard workflows, and reporting features based on teacher feedback.'],

  techUsed: ['Python', 'Flask', 'React', 'pandas', 'SQL'],
  kind: 'founder'
},
{
  slug: 'dmz-voyage-fellow',
  title: 'Basecamp Sprint + Voyage Fellow',
  organization: 'DMZ',
  dateRange: 'May 2025 - Aug 2025',
  summary:
  'Refined an AI prototype through iterative architecture, product improvements, technical demos, and mentor feedback.',
  highlights: [
  'Developed and refined an AI prototype, improving scalability and validation speed by 60% through iterative architecture and product improvements.',
  'Built interactive React web demos that transformed core AI functionality into testable product experiences for rapid user and stakeholder validation.',
  'Engineered and streamlined REST APIs connecting frontend experiences with backend AI workflows, accelerating iteration across the MVP.',
  'Presented technical demos to mentors and investors, incorporating live feedback to refine MVP architecture, product direction, and technical priorities.'],

  techUsed: ['React', 'REST APIs', 'MVP Iteration', 'Pitching'],
  kind: 'founder'
},
{
  slug: 'varsity-tutors-instructor',
  title: 'Computer Science Instructor',
  organization: 'Varsity Tutors',
  dateRange: 'Nov 2024 - Dec 2025',
  summary:
  'Taught core computer science topics through individual and group instruction.',
  highlights: [
  'Taught Python, Java, OOP, data structures, and algorithms to individual students and group classes of 10+, translating complex concepts into practical coding exercises.',
  'Developed custom implementations and exercises for arrays, linked lists, stacks, queues, and trees to reinforce core data-structure fundamentals.',
  'Guided students through debugging and recursion traces, helping them identify logic errors and reason systematically through program execution.',
  'Taught time-complexity analysis and algorithmic problem solving, strengthening students’ ability to compare approaches and write more efficient solutions.'],

  techUsed: ['Python', 'Java', 'Data Structures', 'Teaching'],
  kind: 'teaching'
}];


export const education = {
  school: 'Wilfrid Laurier University',
  degree: 'Bachelor of Computer Science',
  concentration: 'Big Data Concentration',
  dateRange: 'Sep 2024 - Apr 2028 (Expected)',
  location: 'Waterloo, ON',
  coursework: [
  'Data Structures I & II',
  'OOP',
  'Data Visualization',
  'Discrete Structures',
  'Linear Algebra']

};

export const clubs: Role[] = [
{
  slug: 'laurier-analytics-society-vp-technology',
  title: 'VP of Technology',
  organization: 'Laurier Analytics Society',
  dateRange: 'May 2026 - Present',
  summary:
  'Lead technical planning and tooling for Laurier Analytics Society initiatives.',
  highlights: [],
  techUsed: ['Leadership', 'Technology', 'Analytics'],
  kind: 'leadership'
},
{
  slug: 'laurier-computing-society-vp-finance',
  title: 'VP of Finance',
  organization: 'Laurier Computing Society',
  dateRange: 'Jan 2026 - Present',
  summary:
  'Lead annual financial planning and reporting for club events and operations after being promoted from Finance Coordinator.',
  highlights: [
  'Manage the annual budget and oversee financial allocations, ensuring fiscal responsibility.',
  'Track sponsorships, reimbursements, and event expenses through organized financial reporting systems.'],

  techUsed: ['Financial Reporting', 'Operations', 'Leadership'],
  kind: 'leadership'
},
{
  slug: 'laurier-computing-society-finance-coordinator',
  title: 'Finance Coordinator',
  organization: 'Laurier Computing Society',
  dateRange: 'Sep 2025 - Jan 2026',
  summary:
  'Supported financial operations and reimbursement workflows before stepping into the VP of Finance role.',
  highlights: [
  "Assisted in managing the club's financial operations and tracking expenses for various events.",
  'Supported the VP of Finance in preparing budget reports and processing reimbursement requests.'],

  techUsed: ['Operations', 'Budgeting', 'Leadership'],
  kind: 'leadership'
}];
