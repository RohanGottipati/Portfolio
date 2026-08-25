import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Award } from 'lucide-react';
import { Paper } from '../components/Paper';
import { projects } from '../data/projects.mjs';
import { accent } from '../utils/accents';
import { Seo } from "../components/Seo";
import {
  createProjectSeo,
  createProjectStructuredData,
} from "../data/seo.mjs";
import { NotFound } from "./NotFound";

export function ProjectDetail() {
  const { slug } = useParams<{slug: string;}>();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : undefined;

  if (!project) {
    return <NotFound />;
  }

  const tone = accent(project.accent);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-[1100px] px-5 py-12 md:px-10 md:py-16">
      <Seo
        {...createProjectSeo(project)}
        structuredData={createProjectStructuredData(project)}
      />
      <Link
        to="/work"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft hover:text-ink">
        
        <ArrowLeft size={13} />
        All projects
      </Link>

      <header className="mt-6 border-b border-ink/15 pb-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="font-display text-5xl leading-none md:text-7xl">
            {project.name}
          </h1>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            {project.date ?? project.year} · {project.role}
          </span>
        </div>
        <p className="mt-4 max-w-2xl font-display text-2xl italic leading-snug text-ink-soft md:text-3xl">
          {project.summary}
        </p>
        {project.tagline &&
        <p className="mt-4 font-hand text-3xl leading-tight text-tangerine">
            {project.tagline}
          </p>
        }
        {project.impact &&
        <p className="mt-5 inline-flex items-center gap-2 bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-2">
            <Award size={12} />
            {project.impact}
          </p>
        }
      </header>

      {project.image &&
      <div className="mt-10 border border-ink/20 bg-paper-2 p-3 shadow-paper">
          <img
          src={project.image}
          alt={`Preview of my ${project.name} project`}
          width="1200"
          height="896"
          loading="lazy"
          decoding="async"
          className="w-full object-cover" />
        
        </div>
      }

      <div className="mt-12 grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-tangerine">
            How I built it
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {project.description}
          </p>

          <h2 className="mt-10 font-mono text-[10px] uppercase tracking-[0.24em] text-tangerine">
            What I made it do
          </h2>
          <ul className="mt-4 space-y-3">
            {project.features.map((f) =>
            <li
              key={f}
              className="flex gap-3 border-b border-dashed border-ink/15 pb-3 text-[15px] leading-snug">
              
                <span
                aria-hidden="true"
                className={`mt-1.5 h-2 w-2 shrink-0 ${tone.bg}`} />
              
                {f}
              </li>
            )}
          </ul>

        </div>

        <aside className="flex flex-col gap-6">
          {project.event &&
          <Paper rotate={-1.1} tape="single" className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                Event
              </p>
              <p className="mt-3 text-[15px] leading-snug">{project.event}</p>
              {project.challenge &&
              <>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                    Challenge
                  </p>
                  <p className="mt-2 text-[15px] leading-snug">
                    {project.challenge}
                  </p>
                </>
              }
            </Paper>
          }

          <Paper rotate={-1.4} className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
              Stack
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) =>
              <li
                key={tech}
                className="border border-ink/15 bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                
                  {tech}
                </li>
              )}
            </ul>
          </Paper>

          {project.links.length > 0 &&
          <Paper rotate={1.2} className={`p-5 ${tone.bg}`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
              Links
            </p>
            <ul className="mt-3 space-y-2">
              {project.links.map((link) =>
              <li key={link.href}>
                  <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border-b border-ink/40 pb-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:border-ink">
                  
                    {link.label}
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              )}
            </ul>
          </Paper>
          }

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
              I filed this under
            </p>
            <p className="mt-2 font-hand text-2xl leading-tight">
              {project.tags.join(' · ')}
            </p>
          </div>
        </aside>
      </div>

      <Link
        to={`/work/${next.slug}`}
        className="mt-16 flex items-center justify-between border-t border-ink/20 pt-6 hover:text-tangerine">
        
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
          Next project
        </span>
        <span className="inline-flex items-center gap-2 font-display text-3xl md:text-4xl">
          {next.name}
          <ArrowRight size={20} />
        </span>
      </Link>
    </article>);

}
