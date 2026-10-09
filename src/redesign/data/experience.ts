import type { Role } from '../types/portfolio';

export const experience: Role[] = [
{ slug: 'intact', organization: 'Intact Financial', role: 'software architecture intern, software engineering & integrations', dates: 'Sep 2026 – now', year: 'now' },
{ slug: 'laurier-research', organization: 'Wilfrid Laurier', role: 'research engineer, agentic AI', dates: 'Sep 2026 – now', year: 'now' },
{ slug: 'doubl', organization: 'DOUBL', role: 'junior software engineer intern, full-stack', dates: 'Jan – Aug 2026', year: '2026' },
{ slug: 'onechart', organization: 'OneChart', role: 'software engineer intern, AI integrations & backend', dates: 'Jan – Apr 2026', year: '2026' },
{ slug: 'avertoai', organization: 'AvertoAI', role: 'forward deployed engineer intern', dates: 'May – Dec 2025', year: '2025' },
{ slug: 'stealth', organization: 'Stealth Startup', role: 'co-founder, software engineer', dates: 'Apr – Dec 2025', year: '2025' },
{ slug: 'dmz', organization: 'DMZ', role: 'basecamp sprint + voyage fellow', dates: 'May – Aug 2025', year: '2025' },
{ slug: 'varsity-tutors', organization: 'Varsity Tutors', role: 'computer science instructor', dates: 'Nov 2024 – Dec 2025', year: '2025' }];


export const previously = experience.filter((role) =>
['doubl', 'onechart', 'avertoai'].includes(role.slug)
);

export const leadership: Role[] = [
{ slug: 'gdg-finance-executive', organization: 'Google Developers Group, WLU', role: 'finance executive', dates: 'Oct 2026 – now', year: 'now' },
{ slug: 'las-vp-tech', organization: 'Laurier Analytics Society', role: 'vice president of technology', dates: 'May 2026 – now', year: 'now' },
{ slug: 'lcs-vp-finance', organization: 'Laurier Computing Society', role: 'vice president of finance', dates: 'Jan 2026 – now', year: 'now' }];


export const education: Role[] = [
{ slug: 'laurier-bcs', organization: 'Wilfrid Laurier University', role: 'computer science, big data', dates: 'Sep 2024 – Apr 2028', year: '2028' }];
