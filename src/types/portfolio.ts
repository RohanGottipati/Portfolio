export type AccentColor = 'tangerine' | 'lime' | 'sky' | 'peach' | 'blush';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  date?: string;
  summary: string;
  description: string;
  stack: string[];
  features: string[];
  role: string;
  links: ProjectLink[];
  impact?: string;
  event?: string;
  challenge?: string;
  tagline?: string;
  tags: string[];
  accent: AccentColor;
  image?: string;
  featured: boolean;
}

export interface Role {
  slug: string;
  title: string;
  organization: string;
  dateRange: string;
  location?: string;
  summary: string;
  highlights: string[];
  techUsed: string[];
  kind: 'work' | 'research' | 'founder' | 'teaching' | 'leadership';
}

export interface SkillGroup {
  key: string;
  label: string;
  summary: string;
  items: string[];
}
