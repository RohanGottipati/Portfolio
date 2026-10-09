import type { Role } from '../types/portfolio';

export const experience: Role[] = [
{ slug: 'intact', organization: 'Intact Financial', role: 'Software Architecture Intern, Software Engineering & Integrations', dates: 'Sep 2026 – now', year: 'now' },
{ slug: 'laurier-research', organization: 'Wilfrid Laurier', role: 'Research Engineer, Agentic AI', dates: 'Sep 2026 – now', year: 'now' },
{ slug: 'doubl', organization: 'DOUBL', role: 'Junior Software Engineer Intern, Full-Stack', dates: 'Jan – Aug 2026', year: '2026' },
{ slug: 'onechart', organization: 'OneChart', role: 'Software Engineer Intern, AI Integrations & Backend', dates: 'Jan – Apr 2026', year: '2026' },
{ slug: 'avertoai', organization: 'AvertoAI', role: 'Forward Deployed Engineer Intern', dates: 'May – Dec 2025', year: '2025' },
{ slug: 'stealth', organization: 'Stealth Startup', role: 'Co-Founder, Software Engineer', dates: 'Apr – Dec 2025', year: '2025' },
{ slug: 'dmz', organization: 'DMZ', role: 'Basecamp Sprint + Voyage Fellow', dates: 'May – Aug 2025', year: '2025' },
{ slug: 'varsity-tutors', organization: 'Varsity Tutors', role: 'Computer Science Instructor', dates: 'Nov 2024 – Dec 2025', year: '2025' }];


export const previously = experience.filter((role) =>
['doubl', 'onechart', 'avertoai'].includes(role.slug)
);

export const leadership: Role[] = [
{ slug: 'gdg-finance-executive', organization: 'Google Developers Group, WLU', role: 'Finance Executive', dates: 'Oct 2026 – Now', year: 'now' },
{ slug: 'las-vp-tech', organization: 'Laurier Analytics Society', role: 'Vice President of Technology', dates: 'May 2026 – now', year: 'now' },
{ slug: 'lcs-vp-finance', organization: 'Laurier Computing Society', role: 'Vice President of Finance', dates: 'Jan 2026 – now', year: 'now' }];


export const education: Role[] = [
{ slug: 'laurier-bcs', organization: 'Wilfrid Laurier', role: 'computer science, big data', dates: 'Sep 2024 – Apr 2028', year: '2028' }];
