export type Role = {
  slug: string;
  organization: string;
  role: string;
  dates: string;
  year: string;
  href?: string;
};

export type Project = {
  name: string;
  year: string;
  note: string;
  href?: string;
  githubUrl?: string;
  liveUrl?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Entry = {
  key: string;
  primary: string;
  secondary: string;
  meta: string;
  href?: string;
};
