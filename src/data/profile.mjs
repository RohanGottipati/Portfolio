import { recognitionLabel } from './recognition.mjs';

export const profile = {
  name: 'Rohan Gottipati',
  shortName: 'Rohan',
  role: 'Software Engineer',
  location: 'Toronto, ON',
  intro:
  "I'm a software engineer in Toronto. I work across full-stack products, AI systems, and data-heavy tools, usually with a team and a deadline.",
  note:
  "I'm at Intact Financial now, recently wrapped a full-stack term at DOUBL, and am probably mid-hackathon...",
  studying:
  "I'm completing a Bachelor of Computer Science.",
  concentration: 'Big Data Concentration',
  learning: [
  'Backend architecture and cloud development',
  'Kubernetes and CI/CD at enterprise scale'],

  exploring: [
  'AI/ML systems',
  'Software integrations',
  'Big data + full-stack development'],

  highlights: [
  'Intact: enterprise architecture and integrations',
  'DOUBL: top contributor to a personalized shopping platform',
  'OneChart: AI scribe tools for 100+ clinicians',
  'AvertoAI: supplier data systems that help reduce food waste',
  'Laurier Analytics Society: VP of Technology, leading the open source program',
  'Laurier Computing Society: VP of Finance'],

  facts: [
  { label: 'Based in', value: 'Toronto, ON' },
  { label: 'Current role', value: 'Intact Financial, Sep 2026 - Present' },
  { label: 'Studying', value: 'CS, Big Data @ Laurier ’28' },
  { label: 'Hackathon record', value: recognitionLabel }],

  contact: {
    email: 'rohan.gottipati@gmail.com',
    phone: '+1 (905) 751-5666',
    phoneHref: 'tel:+19057515666',
    github: 'https://github.com/RohanGottipati',
    linkedin: 'https://www.linkedin.com/in/rohangottipati/',
    resume: '/Rohan_Gottipati_Resume.pdf'
  }
};
