import { useMemo, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { projects } from '../data/projects.mjs';
import type { Project } from '../types/portfolio';
import { Seo } from "../components/Seo";
import { PAGE_SEO } from "../data/seo.mjs";

const rotations = [-1.3, 1.1, -0.7, 1.5, -1.5, 0.8];

interface ProjectView {
  label: string;
  matches: (project: Project) => boolean;
}

const aiTags = new Set([
  'AI',
  'AI Agents',
  'Computer Vision',
  'Machine Learning',
  'Voice AI'
]);
const dataTags = new Set([
  'Analytics',
  'Digital Twin',
  'ESG',
  'Machine Learning',
  'Statistics'
]);
const interactiveProjects = new Set([
  'portfolio',
  'aura',
  'playground',
  'spar',
  'letterly',
  'quote-of-the-day',
  'portfolio-3d'
]);

const views: ProjectView[] = [
  { label: 'All projects', matches: () => true },
  { label: 'Award winners', matches: (project) => Boolean(project.impact) },
  {
    label: 'AI + ML',
    matches: (project) => project.tags.some((tag) => aiTags.has(tag))
  },
  {
    label: 'Data + analytics',
    matches: (project) => project.tags.some((tag) => dataTags.has(tag))
  },
  {
    label: 'Interactive',
    matches: (project) => interactiveProjects.has(project.slug)
  }
];

export function Work() {
  const [activeView, setActiveView] = useState('All projects');
  const visible = useMemo(() => {
    const view = views.find(({ label }) => label === activeView) ?? views[0];
    return projects.filter(view.matches);
  }, [activeView]);

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10 md:py-20">
      <Seo {...PAGE_SEO.work} />
      <SectionHeading
        index="01"
        label="Projects"
        title="14 so far, more in progress."
        note="I built them during hackathon sprints, internships and side experiments." />
      

      <div className="mt-8 flex flex-col gap-4 border-y border-ink/15 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-soft">
            Show
          </p>
          <div
            role="group"
            aria-label="Choose a project view"
            className="flex flex-wrap gap-x-5 gap-y-2">
            {views.map(({ label }) => {
          const active = label === activeView;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveView(label)}
              aria-pressed={active}
              className={`group inline-flex items-center gap-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
              active ?
              'text-ink' :
              'text-ink-soft hover:text-ink'}`
              }>
              <span
                aria-hidden="true"
                className={`h-2 w-2 border transition-colors ${
                active ?
                'border-tangerine bg-tangerine' :
                'border-ink/30 group-hover:border-ink'}`
                } />
              {label}
            </button>);

        })}
          </div>
        </div>

        <p
          aria-live="polite"
          className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'} shown
        </p>
      </div>

      {visible.length === 0 ?
      <p className="mt-12 font-hand text-3xl text-ink-soft">
          Nothing filed under that one yet.
        </p> :

      <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) =>
        <ProjectCard
          key={project.slug}
          project={project}
          rotate={rotations[i % rotations.length]} />

        )}
        </div>
      }
    </section>);

}
