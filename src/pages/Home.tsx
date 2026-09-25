import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CollageHero } from '../components/CollageHero';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { Paper } from '../components/Paper';
import { TapedReveal } from '../components/TapedReveal';
import { MarkerDraw } from '../components/MarkerDraw';
import { featuredProjects, projects } from '../data/projects.mjs';
import { experience } from '../data/experience';
import { profile } from '../data/profile';
import { skills } from '../data/skills';
import { Seo } from "../components/Seo";
import { PAGE_SEO } from "../data/seo.mjs";
import { recognition, recognitionLabel } from '../data/recognition.mjs';

const rotations = [-1.4, 1.2, -0.8, 1.6, -1.2];
const toolkitPlacement = [
  'lg:col-start-1',
  'lg:col-start-3',
  'lg:col-start-5',
  'lg:col-start-2',
  'lg:col-start-4'
];
const projectCount = projects.length;
const currentRole = experience[0];
const currentFocus = [
  'Building multi-system integrations across enterprise systems.',
  'Working on solution architecture with Java and Python.',
  'Using AWS, Azure, Kubernetes, and CI/CD across cloud environments.'
];

export function Home() {
  return (
    <>
      <Seo {...PAGE_SEO.home} />
      <CollageHero />

      {/* Currently */}
      <section className="border-y border-ink/15 bg-paper-2">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-24">
          <div>
            <SectionHeading
              index="01"
              label="Currently"
              title="I&apos;m at Intact Financial." />
            <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ink-soft">
              <span className="text-tangerine">Role</span>
              <span aria-hidden="true"> · </span>
              {currentRole.title}
            </p>
            <ul className="mt-6 space-y-3">
              {currentFocus.map((item) =>
              <li key={item} className="flex gap-3 text-[15px] leading-snug">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 bg-tangerine" />
                  {item}
                </li>
              )}
            </ul>
            <Link
              to="/experience"
              className="mt-8 inline-flex items-center gap-2 bg-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-2 transition-colors hover:bg-tangerine">
              View experience
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <TapedReveal rotate={-1.6} className="bg-lime p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                Studying
              </p>
              <p className="mt-2 font-display text-2xl leading-tight">
                {profile.studying}
                <span className="block">{profile.concentration}</span>
              </p>
            </TapedReveal>
            <Paper rotate={1.4} className="p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                Exploring
              </p>
              <ul className="mt-3 space-y-1.5">
                {profile.exploring.map((item) =>
                <li key={item} className="font-hand text-2xl leading-tight">
                    {item}
                  </li>
                )}
              </ul>
            </Paper>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10 md:py-24">
        <SectionHeading
          index="02"
          label="Selected work"
          title="Projects I'd show you first."
          note="From city planning tools to a game built from desk photos." />
        
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) =>
          <ProjectCard
            key={project.slug}
            project={project}
            rotate={rotations[i % rotations.length]} />

          )}
          <Paper
            rotate={1}
            className="flex min-h-[220px] flex-col justify-between bg-paper p-6">
            
            <p className="font-display text-3xl leading-tight">
              {`+ ${projectCount - featuredProjects.length} more projects`}
            </p>
            <Link
              to="/work"
              className="mt-6 inline-flex items-center gap-2 self-start border-b border-ink pb-0.5 font-mono text-[11px] uppercase tracking-[0.2em] hover:border-tangerine hover:text-tangerine">
              
              See all projects
              <ArrowRight size={13} />
            </Link>
          </Paper>
        </div>
      </section>

      <section className="border-y border-ink/15 bg-paper-2">
        <div className="mx-auto grid max-w-[1240px] gap-7 px-5 py-12 md:grid-cols-[1fr_1.2fr] md:items-center md:px-10">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tangerine">Hackathon results / 03</p><h2 className="mt-2 font-display text-4xl"><MarkerDraw>Recognition</MarkerDraw></h2><p className="mt-2 font-hand text-2xl text-ink-soft">{recognitionLabel}</p><Link to="/recognition" className="mt-4 inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-[11px] uppercase tracking-widest hover:text-tangerine">See every result <ArrowRight size={13}/></Link></div>
          <div className="grid gap-3 sm:grid-cols-3">{recognition.filter(entry => ['greenlens-ai','techto','scotiacheck'].includes(entry.project.slug)).map(entry => <Link key={entry.project.slug} to={`/work/${entry.project.slug}`} className="border border-ink/15 bg-paper p-4 shadow-paper transition-transform hover:-translate-y-1"><span className="font-mono text-[9px] uppercase tracking-wider text-tangerine">{entry.project.name}</span><strong className="mt-2 block font-display text-xl font-normal leading-tight">{entry.result}</strong><span className="mt-2 block font-mono text-[9px] uppercase tracking-wider text-ink-soft">{entry.event}</span></Link>)}</div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10 md:py-24">
        <SectionHeading
          index="04"
          label="Toolkit"
          title="The tools behind the work."
          note="React interfaces, Python pipelines, databases, and cloud infrastructure." />
        
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-6">
          {skills.map((group, i) =>
          <Paper
            key={group.key}
            rotate={rotations[i % rotations.length]}
            className={`p-6 lg:col-span-2 ${toolkitPlacement[i]}`}>
            
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-tangerine">
                {group.label}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{group.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) =>
              <li
                key={item}
                className="border border-ink/15 bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                
                    {item}
                  </li>
              )}
              </ul>
            </Paper>
          )}
        </div>
      </section>
    </>);

}
