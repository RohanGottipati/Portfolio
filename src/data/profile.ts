export const profile = {
  name: 'Rohan Gottipati',
  shortName: 'Rohan',
  role: 'Software Engineer',
  location: 'Toronto, ON',
  intro:
  "I'm a software engineer who likes building fast, useful products and turning half-formed ideas into working MVPs.",
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
  'IT Technical Advisor Intern at Intact Financial Corporation',
  'Top contributor on DOUBL’s Next.js platform - 465 commits',
  'Built AI integrations and backend systems at OneChart; worked in forward-deployed engineering at AvertoAI',
  'Leadership across Laurier Analytics Society and Laurier Computing Society'],

  facts: [
  { label: 'Based in', value: 'Toronto, ON' },
  { label: 'Current role', value: 'Intact Financial, Sep 2026 - Present' },
  { label: 'Studying', value: 'CS, Big Data @ Laurier ’28' },
  { label: 'Hackathon wins', value: '9 and counting' }],

  contact: {
    email: 'rohan.gottipati@gmail.com',
    phone: '+1 (905) 751-5666',
    phoneHref: 'tel:+19057515666',
    github: 'https://github.com/RohanGottipati',
    linkedin: 'https://www.linkedin.com/in/rohangottipati/',
    resume: '/Rohan_Gottipati_Resume.pdf'
  }
} as const;
