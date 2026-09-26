import { profile } from '../data/profile';
import { featuredProjects, projects, quickViewProjects } from '../data/projects.mjs';
import { clubs, education, experience } from '../data/experience';
import { skills } from '../data/skills';
import type { Role } from '../types/portfolio';
import { recognitionLabel } from '../data/recognition.mjs';

export interface BotLink {
  label: string;
  to?: string;
  href?: string;
}

export interface BotAnswer {
  text: string;
  links?: BotLink[];
}

const has = (q: string, words: string[]) => words.some((w) => q.includes(w));

const roleSearchTerms: Array<{ slug: string; terms: string[] }> = [
  { slug: 'intact-software-architecture-intern', terms: ['intact'] },
  { slug: 'doubl-junior-software-engineer-intern', terms: ['doubl'] },
  { slug: 'onechart-software-engineer-intern', terms: ['onechart'] },
  { slug: 'avertoai-forward-deployed-engineer-intern', terms: ['averto'] },
  {
    slug: 'laurier-ai-ml-research-assistant',
    terms: ['research assistant', 'your research', 'research', 'affective', 'sentiment']
  },
  {
    slug: 'stealth-startup-cofounder',
    terms: ['teachtrack', 'stealth startup', 'edtech']
  },
  { slug: 'dmz-voyage-fellow', terms: ['dmz'] },
  { slug: 'varsity-tutors-instructor', terms: ['varsity'] }
];

function matchedRole(q: string): Role | undefined {
  const match = roleSearchTerms.find(({ terms }) =>
    terms.some((term) => q.includes(term))
  );
  return match
    ? experience.find((role) => role.slug === match.slug)
    : undefined;
}

const workLink: BotLink = { label: 'See all my projects', to: '/work' };
const aboutLink: BotLink = { label: 'Read my about page', to: '/about' };
const experienceLink: BotLink = { label: 'View my experience', to: '/experience' };
const contactLink: BotLink = { label: 'Contact', to: '/contact' };
const recognitionLink: BotLink = { label: 'View recognition', to: '/recognition' };
const briefLink: BotLink = { label: 'Open Quick View', to: '/brief' };
const offTopicReply =
  "I can only help with questions about my portfolio, projects, experience, skills, education, or how to reach me.";

function roleAnswer(role: Role): BotAnswer {
  const alias =
    role.slug === 'stealth-startup-cofounder' ? ' (TeachTrack)' : '';
  const tense = /present/i.test(role.dateRange) ? 'I am' : 'I was';
  return {
    text: `${tense} ${role.title} at ${role.organization}${alias}, ${role.dateRange}. ${role.highlights.join(' ')}`,
    links: [experienceLink]
  };
}

const localPortfolioNames = /\b(rohan(?: gottipati)?|laurier|intact|doubl|onechart|averto|stealth startup|teachtrack|dmz|varsity tutors|molecule|greenlens|techto|scotiacheck|scotiabank|tangerine|a\.u\.r\.a|aura|scout|playground|spar|caresync|spectra|movemind|medalyze|letterly)\b/i;
const localPortfolioIntent = /\b(your|his|rohan|portfolio|projects?|working on|you built|you build|you shipped|experience|skills?|resume|résumé|education|awards?|hackathons?|recognition|quick view|contact|email|github|linkedin|reach you|get in touch|hire you|who are you|about yourself)\b/i;
const localUnrelatedIntent = /\b(capital of|recipe|weather|sports score|stock price|latest news|write (?:me )?code|solve this|translate this|medical advice|legal advice)\b/i;

function projectAnswer(slug: string): BotAnswer {
  const p = projects.find((x) => x.slug === slug)!;
  const award = p.impact ? ` It earned ${p.impact}.` : '';
  return {
    text: `${p.description}${award} Built with ${p.stack.join(', ')}.`,
    links: [
    { label: `Open the ${p.name} case`, to: `/work/${p.slug}` },
    ...p.links.map((l) => ({ label: l.label, href: l.href }))]

  };
}

export const suggestedPrompts = [
'What are you working on?',
'Show me your best project',
'What tech do you use?',
'What do you lead at Laurier?',
'What hackathon results have you earned?',
'How do I get in touch?'];


export function askRoRo(input: string): BotAnswer {
  const q = input.toLowerCase().trim();
  const normalizedProjectQuery = q.replace(/\./g, '');

  if (!q) {
    return {
      text: 'Ask me anything about my work, stack, or how to reach me.'
    };
  }

  // Direct project lookups
  const matched = projects.find(
    (p) => {
      if (p.slug === 'portfolio') return /\b(this portfolio|this website|this site)\b/.test(q) && !/quick view|brief/.test(q);
      return normalizedProjectQuery.includes(p.name.toLowerCase().replace(/\./g, '')) ||
        q.includes(p.slug.replace(/-/g, ' ')) || q.includes(p.slug);
    }
  );
  if (matched && !localUnrelatedIntent.test(q)) return projectAnswer(matched.slug);

  if (has(q, ['hi ', 'hey', 'hello', 'yo ']) || q === 'hi') {
    return {
      text: `Hey - I'm RoRo, the guide inside my portfolio. Ask about my projects, experience, stack, or how to reach me.`
    };
  }

  if (
    localUnrelatedIntent.test(q) ||
    (!localPortfolioNames.test(q) && !localPortfolioIntent.test(q) && !/\b(las|lcs|toolkit|campus|clubs?|leadership|open source)\b/.test(q))
  ) {
    return { text: offTopicReply };
  }

  if (/\b(las|analytics society|open source|vp of tech(?:nology)?)\b/.test(q)) {
    return roleAnswer(clubs[0]);
  }
  if (/\b(lcs|computing society|vp of finance)\b/.test(q)) {
    return roleAnswer(clubs[1]);
  }
  if (/\b(campus|clubs?|leadership|lead at laurier)\b/.test(q)) {
    return {
      text: clubs.filter((club) => /present/i.test(club.dateRange)).map((club) => `${club.title} at ${club.organization}: ${club.summary}`).join(' '),
      links: [experienceLink]
    };
  }

  const role = matchedRole(q);
  if (role) return roleAnswer(role);

  if (has(q, ['quick view', 'quick version', 'short version', 'summary of experience', 'brief'])) {
    return { text: `Quick View is the concise version of my portfolio: role titles, organizations and dates, education, ${quickViewProjects.length} selected projects starting with ${quickViewProjects[0].name}, ${recognitionLabel}, the full toolkit and contact links. It also links to all projects.`, links: [briefLink] };
  }

  if (has(q, ['who', 'about', 'yourself', 'bio', 'story'])) {
    return {
      text: `${profile.intro} I'm based in ${profile.location}, working at Intact Financial Corporation as a ${experience[0].title.split(',')[0]}, and completing a ${education.degree} with a ${education.concentration} at ${education.school}.`,
      links: [aboutLink]
    };
  }

  if (has(q, ['best', 'favourite', 'favorite', 'proudest', 'strongest'])) {
    return {
      text: `My featured ${featuredProjects.length} are ${featuredProjects.map(project => project.name).join(', ')}. Together they cover civic technology, ESG auditing, financial-advice context, floor-plan-to-3D generation and a photo-to-platformer game engine.`,
      links: featuredProjects.map(project => ({ label: `Open ${project.name}`, to: `/work/${project.slug}` }))

    };
  }

  if (
  has(q, [
  'now',
  'currently',
  'working on',
  'next',
  'today',
  'fall']
  ))
  {
    return {
      text: `I'm currently a ${experience[0].title} at ${experience[0].organization} (${experience[0].dateRange}). ${experience[0].briefSummary}`,
      links: [experienceLink]
    };
  }

  if (has(q, ['resume', 'résumé', 'cv'])) {
    return {
      text: `My résumé PDF covers Intact, DOUBL, OneChart, and AvertoAI, plus Molecule, GreenLens AI, and TechTO. The experience page has the full history, including AI/ML research at Laurier, TeachTrack, DMZ, and Varsity Tutors.`,
      links: [
      experienceLink,
      { label: 'Résumé PDF', href: profile.contact.resume }]

    };
  }

  if (
  has(q, [
  'experience',
  'intern',
  'job',
  'career']
  ))
  {
    return {
      text: `I've held ${experience.length} roles so far: ${experience.
      map((r) => `${r.organization} (${r.title.split(',')[0]})`).
      join(', ')}. The through-line in my work is production software - integrations and cloud tooling, personalized commerce, clinical transcription pipelines, and forward-deployed supplier data platforms.`,
      links: [experienceLink, { label: 'Résumé PDF', href: profile.contact.resume }]
    };
  }

  if (
  has(q, ['skill', 'tech', 'stack', 'language', 'tool', 'framework', 'code in']))
  {
    return {
      text: `Here's what I use. ${skills.map((g) => `${g.label}: ${g.items.join(', ')}.`).join(' ')}`,
      links: [briefLink]
    };
  }

  if (has(q, ['hackathon', 'win', 'won', 'award', 'prize', 'devpost', 'recognition'])) {
    return {
      text: `I have ${recognitionLabel}. The recognition page shows the result and the project behind it, including placements, sponsor awards, and an Honourable Mention.`,
      links: [recognitionLink]
    };
  }

  if (
  has(q, [
  'school',
  'study',
  'studies',
  'university',
  'laurier',
  'degree',
  'education',
  'major',
  'course',
  'club']
  ))
  {
    return {
      text: `I'm completing a ${education.degree} with a ${education.concentration} at ${education.school}, ${education.dateRange}. My coursework includes ${education.coursework.join(', ')}. My club leadership includes ${clubs.
      slice(0, 2).
      map((c) => `${c.title}, ${c.organization}`).
      join('; ')}.`,
      links: [experienceLink]
    };
  }

  if (
  has(q, [
  'contact',
  'email',
  'reach',
  'hire',
  'touch',
  'linkedin',
  'github',
  'connect',
  'phone',
  'call',
  'number']
  ))
  {
    return {
      text: `Email me at ${profile.contact.email} or call me at ${profile.contact.phone}. I'm open to software engineering internships and new-grad roles, plus hackathon teams.`,
      links: [
      contactLink,
      { label: 'GitHub', href: profile.contact.github },
      { label: 'LinkedIn', href: profile.contact.linkedin }]

    };
  }

  if (has(q, ['where', 'location', 'based', 'city', 'remote'])) {
    return {
      text: `I'm based in ${profile.location}. I currently work with Intact and previously worked with Toronto teams at DOUBL and AvertoAI, both on-site and remote.`
    };
  }

  if (has(q, ['ai', 'ml', 'agent', 'llm', 'machine learning', 'model'])) {
    return {
      text: `AI systems are the main thread in my work: I built multi-agent pipelines in GreenLens AI, A.U.R.A. and Scout; my team and I built ScotiaCheck to check outside financial advice against personal context; I fine-tuned a Qwen model for TechTO, integrated real-time Deepgram + Gemini transcription at OneChart, researched affective computing at Laurier, and built TeachTrack, an AI EdTech platform for identifying learning gaps.`,
      links: [
      { label: 'Open TechTO', to: '/work/techto' },
      workLink]

    };
  }

  if (has(q, ['game', 'fun', 'hobby', 'interest', 'outside', 'play'])) {
    return {
      text: `Playground is my fun one - I can turn a photo of your desk into a playable 2D platformer you can publish. Outside of shipping, I spend most weekends at hackathons, lead clubs at Laurier, and previously taught computer science through Varsity Tutors.`,
      links: [{ label: 'Open Playground', to: '/work/playground' }]
    };
  }

  if (has(q, ['project', 'work', 'built', 'build', 'portfolio', 'shipped'])) {
    return {
      text: `There are ${projects.length} projects on this site. The ${featuredProjects.length} featured ones are ${featuredProjects.map((p) => p.name).join(', ')} - spanning city planning, ESG auditing, financial advice, 3D generation, and a photo-to-platformer game.`,
      links: [workLink]
    };
  }

  return {
    text: `I don't have an answer for that one. Try asking about my projects, experience, skills, hackathon results, or how to reach me.`,
    links: [workLink, aboutLink, contactLink]
  };
}
