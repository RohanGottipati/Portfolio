import { Link, useParams } from 'react-router-dom';
import { useRef } from 'react';
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
import { useCaseStudyMotion } from '../components/CaseStudyMotion';

export function ProjectDetail() {
  const articleRef = useRef<HTMLElement>(null);
  const { slug } = useParams<{slug: string;}>();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : undefined;
  useCaseStudyMotion(articleRef, Boolean(project?.caseStudy));

  if (!project) {
    return <NotFound />;
  }

  const tone = accent(project.accent);
  const next = projects[(index + 1) % projects.length];

  return (
    <article ref={articleRef} className="mx-auto max-w-[960px] px-5 py-12 md:px-10 md:py-16">
      <Seo
        {...createProjectSeo(project)}
        structuredData={createProjectStructuredData(project)}
      />
      <Link
        to="/work"
        className="mx-auto flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft hover:text-ink">
        
        <ArrowLeft size={13} />
        All projects
      </Link>

      <header className="mx-auto mt-10 max-w-[780px] border-b border-ink/15 pb-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tangerine">
          {project.date ?? project.year} · {project.role}
        </p>
        <h1 className="mt-4 font-display text-[clamp(3rem,8vw,5.5rem)] leading-none">
          {project.name}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-display text-2xl leading-snug text-ink-soft md:text-3xl">
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
        <ul className="mt-6 flex flex-wrap justify-center gap-2">{project.tags.slice(0, 4).map(tag => <li key={tag} className="border border-ink/20 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">{tag}</li>)}</ul>
      </header>

      {project.caseStudy && <>
        <section className="mx-auto mt-14 max-w-[760px] text-center">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-tangerine">01 / Why this exists</h2>
          <p className="mt-5 font-display text-2xl leading-snug md:text-3xl">{project.caseStudy.context}</p>
        </section>
        <section className="mt-14 border-y border-ink/20 bg-paper-2 px-4 py-8 text-center sm:px-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-tangerine">02 / The system</h2>
          <ol className={`mt-7 grid gap-3 sm:grid-cols-2 ${project.caseStudy.flow.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>{project.caseStudy.flow.map((step, i) => <li data-case-step key={step} className="relative min-h-[120px] border border-ink/20 bg-paper p-4 shadow-paper"><span className="font-mono text-[10px] tracking-wider text-tangerine">{String(i + 1).padStart(2, '0')}</span><p className="mt-4 font-display text-xl leading-tight">{step}</p></li>)}</ol>
        </section>
        {project.caseStudy.media && <div className="mt-14 grid gap-6 sm:grid-cols-2">{project.caseStudy.media.map(media => <figure key={media.src} className={`overflow-hidden border border-ink/20 bg-paper-2 p-3 shadow-paper ${media.layout === 'full' ? 'sm:col-span-2' : ''}`}><div className="overflow-hidden"><img data-case-media src={media.src} alt={media.alt} loading="lazy" decoding="async" className={`w-full object-cover ${media.layout === 'portrait' ? 'max-h-[700px] object-contain' : 'aspect-[4/3]'}`}/></div>{media.caption && <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-soft">{media.caption}</figcaption>}</figure>)}</div>}
        <section className="mx-auto mt-14 max-w-[760px] text-center"><h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-tangerine">03 / The hard part</h2><span aria-hidden="true" className="mx-auto mt-5 block h-1 w-12 bg-lime"/><p className="mt-5 text-lg leading-relaxed">{project.caseStudy.hardPart}</p></section>
        {project.caseStudy.metrics && <section className="mt-14 grid gap-4 border-y border-ink/20 py-7 text-center sm:grid-cols-2">{project.caseStudy.metrics.map(metric => <div key={metric.label}><strong className="font-display text-5xl font-normal text-tangerine">{metric.value}</strong><p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft">{metric.label}</p></div>)}</section>}
      </>}

      <div className="mx-auto mt-14 max-w-[760px]">
        <div className="text-center">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-tangerine">
            {project.caseStudy ? 'Implementation' : 'How it works'}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {project.description}
          </p>

          <h2 className="mt-10 font-mono text-[10px] uppercase tracking-[0.24em] text-tangerine">
            {project.caseStudy ? 'Capabilities' : 'Key features'}
          </h2>
          <ul className="mx-auto mt-5 max-w-[680px] space-y-3 text-left">
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

        <aside className="mt-12 flex flex-wrap justify-center gap-6 text-center">
          {project.event &&
          <Paper rotate={-1.1} tape="single" className="w-full p-5 sm:w-[calc(50%-0.75rem)]">
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

          <Paper rotate={-1.4} className="w-full p-5 sm:w-[calc(50%-0.75rem)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
              Stack
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
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
          <Paper rotate={1.2} className={`w-full p-5 sm:w-[calc(50%-0.75rem)] ${tone.bg}`}>
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

          <div className="w-full">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
              Topics
            </p>
            <p className="mt-2 font-hand text-2xl leading-tight">
              {project.tags.join(' · ')}
            </p>
          </div>
        </aside>
      </div>

      <Link
        to={`/work/${next.slug}`}
        className="mt-16 block border-t border-ink/20 pt-7 text-center hover:text-tangerine">
        
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
          Next project
        </span>
        <span className="mt-3 inline-flex items-center gap-2 font-display text-3xl md:text-4xl">
          {next.name}
          <ArrowRight size={20} />
        </span>
      </Link>
    </article>);

}
