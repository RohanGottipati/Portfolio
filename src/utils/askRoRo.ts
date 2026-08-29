import { profile } from '../data/profile';
import { projects } from '../data/projects.mjs';
import { clubs, education, experience } from '../data/experience';
import { skills } from '../data/skills';
import type { Role } from '../types/portfolio';

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
  { slug: 'intact-it-technical-advisor-intern', terms: ['intact'] },
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

const localPortfolioNames = /\b(rohan(?: gottipati)?|laurier|intact|doubl|onechart|averto|stealth startup|teachtrack|dmz|varsity tutors|greenlens|techto|scotiacheck|scotiabank|tangerine|a\.u\.r\.a|aura|scout|playground|spar|caresync|spectra|movemind|medalyze|letterly)\b/i;
const localPortfolioIntent = /\b(your|portfolio|projects?|working on|you built|you build|you shipped|your work|your experience|experience do you have|your roles?|your internships?|your career|your skills?|skills do you have|your stack|stack do you use|your tech|tech do you use|languages do you use|your resume|your résumé|your education|your degree|your coursework|your awards?|your hackathons?|what have you won|your contact|your email|your github|your linkedin|reach you|get in touch|hire you|where are you based|who are you|about yourself)\b/i;
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
'What have you won?',
'How do I get in touch?'];


export function askRoRo(input: string): BotAnswer {
  const q = input.toLowerCase().trim();

  if (!q) {
    return {
      text: 'Ask me anything about my work, stack, or how to reach me.'
    };
  }

  // Direct project lookups
  const matched = projects.find(
    (p) =>
    q.includes(p.name.toLowerCase().replace(/\./g, '')) ||
    q.includes(p.slug.replace(/-/g, ' ')) ||
    q.includes(p.slug)
  );
  if (matched) return projectAnswer(matched.slug);

  if (has(q, ['hi ', 'hey', 'hello', 'yo ']) || q === 'hi') {
    return {
      text: `Hey - I'm RoRo, the guide inside my portfolio. Ask about my projects, experience, stack, or how to reach me.`
    };
  }

  if (
    localUnrelatedIntent.test(q) ||
    (!localPortfolioNames.test(q) && !localPortfolioIntent.test(q))
  ) {
    return { text: offTopicReply };
  }

  const role = matchedRole(q);
  if (role) return roleAnswer(role);

  if (has(q, ['who', 'about', 'yourself', 'bio', 'story'])) {
    return {
      text: `${profile.intro} I'm based in ${profile.location}, working at Intact Financial Corporation as an IT Technical Advisor Intern, and completing a ${education.degree} with a ${education.concentration} at ${education.school}.`,
      links: [aboutLink]
    };
  }

  if (has(q, ['best', 'favourite', 'favorite', 'proudest', 'strongest'])) {
    return {
      text: `My featured five are TechTO, GreenLens AI, ScotiaCheck, A.U.R.A. and Playground. Together they cover a Census-grounded Toronto digital twin, multi-agent ESG auditing, personalized financial-advice context, floor-plan-to-3D generation and a photo-to-platformer game engine.`,
      links: [
      { label: 'Open TechTO', to: '/work/techto' },
      { label: 'Open GreenLens AI', to: '/work/greenlens-ai' },
      { label: 'Open ScotiaCheck', to: '/work/scotiacheck' },
      { label: 'Open A.U.R.A.', to: '/work/aura' },
      { label: 'Open Playground', to: '/work/playground' }]

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
      text: `I'm currently an IT Technical Advisor Intern in Software Engineering & Integrations at Intact Financial Corporation (Sep 2026–Present), where I focus on multi-system integrations, architecture and cloud tooling across Java, Python, AWS, Kubernetes and CI/CD.`,
      links: [experienceLink]
    };
  }

  if (has(q, ['project', 'work', 'built', 'build', 'portfolio', 'shipped'])) {
    return {
      text: `I've filed ${projects.length} builds in my portfolio. My featured projects are ${projects.
      filter((p) => p.featured).
      map((p) => p.name).
      join(', ')} - spanning civic digital twins, ESG auditing, personalized financial context, 3D generation and a photo-to-platformer game engine.`,
      links: [workLink]
    };
  }

  if (has(q, ['resume', 'résumé', 'cv'])) {
    return {
      text: `My résumé PDF covers Intact, DOUBL, OneChart, and AvertoAI, plus GreenLens AI, TechTO, A.U.R.A., and Scout. The experience page has the full history, including AI/ML research at Laurier, TeachTrack, DMZ, and Varsity Tutors.`,
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
      links: [workLink]
    };
  }

  if (has(q, ['hackathon', 'win', 'won', 'award', 'prize', 'devpost'])) {
    return {
      text: `My teams and I have earned 10 hackathon placements and awards. Highlights include 2nd Place at the Scotiabank x Tangerine Student Hackathon, S:\\HA<KS 2026, with ScotiaCheck, 1st Overall at Data Minds Challenge 2.0 with GreenLens AI, Best Use of MongoDB Atlas at Hack the 6ix with TechTO, two sponsor awards at BearHacks with A.U.R.A., a sponsor award at HuskyHacks with Scout, 3rd Place Overall at SumerHacks with Playground, Best Use of Solana at uOttaHack with Spectra, a sponsor award at Hack Canada with CareSync, and an Honourable Mention at DDC x IgnitionHacks with Spar.`,
      links: [workLink]
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
      text: `AI systems are the main thread in my work: I built multi-agent pipelines in GreenLens AI, A.U.R.A. and Scout, contextualized outside financial advice with real customer circumstances in ScotiaCheck, fine-tuned a Qwen model to predict citizen reactions in TechTO, integrated real-time Deepgram + Gemini transcription at OneChart, researched affective computing at Laurier, and built TeachTrack, an AI EdTech platform for identifying learning gaps.`,
      links: [
      { label: 'Open TechTO', to: '/work/techto' },
      workLink]

    };
  }

  if (has(q, ['game', 'fun', 'hobby', 'interest', 'outside', 'play'])) {
    return {
      text: `Playground is my fun one - I can turn a photo of your desk into a playable 2D platformer you can publish. Outside of shipping, I spend most weekends at hackathons, lead clubs at Laurier, and teach computer science through Varsity Tutors.`,
      links: [{ label: 'Open Playground', to: '/work/playground' }]
    };
  }

  return {
    text: `I don't have a note filed on that one. Try asking about my projects, experience, stack, hackathon wins, or how to get in touch with me.`,
    links: [workLink, aboutLink, contactLink]
  };
}
