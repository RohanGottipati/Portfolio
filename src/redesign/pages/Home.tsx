import { useRef } from 'react';
import { PaperPage } from '../components/PaperPage';
import { Banner } from '../components/Banner';
import { ProfileHeader } from '../components/ProfileHeader';
import { TextLink } from '../components/TextLink';
import { Reveal } from '../components/Reveal';
import { SketchArrows, type ArrowSpec } from '../components/SketchArrows';
import { education, previously } from '../data/experience';
import { featuredProjects } from '../data/projects';

const arrows: ArrowSpec[] = [
{ id: 'currently-role', from: 'currently', fromSide: 'bottom', to: 'tagline', toSide: 'right', approach: { x: 0.45, y: 1 } },
{ id: 'currently-education', from: 'currently', fromSide: 'right', to: 'education', toSide: 'left', delay: 0.25 },
{ id: 'hackathons-projects', from: 'hackathons', fromSide: 'bottom', to: 'projects', toSide: 'top', delay: 0.5 }];


export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <PaperPage>
      <Banner />

      <div ref={containerRef} className="relative mt-9 text-[15.5px] leading-[1.5]">
        <div className="grid gap-x-[27px] gap-y-10 md:grid-cols-[242px_minmax(0,1fr)]">
          <ProfileHeader />

          <Reveal delay={0.1} className="md:pt-0.5">
            <p className="text-ink">
              I'm a Toronto-based software engineer building full-stack products, AI systems, and data-heavy
              tools. I love <span data-anchor="hackathons">hackathons</span>, and projects I've built have earned
              nine wins so far. <span data-anchor="currently">Currently</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-[140px] md:grid-cols-[150px_minmax(0,1fr)_170px]">
          <Reveal delay={0.16}>
            <section aria-labelledby="previously-heading">
              <h2 id="previously-heading" className="mb-1.5 text-faint">
                previously
              </h2>
              <ul>
                {previously.map((role) =>
                <li key={role.slug} className="flex justify-between gap-4">
                    <span className="text-ink">{role.organization}</span>
                    <span className="tabular-nums text-faint">{role.year}</span>
                  </li>
                )}
              </ul>
              <TextLink href="/work" muted className="mt-px inline-block">
                view all work{' '}
                <span aria-hidden="true" className="link-arrow">
                  →
                </span>
              </TextLink>
            </section>
          </Reveal>

          <Reveal delay={0.2}>
            <section aria-labelledby="projects-heading">
              <h2 id="projects-heading" className="mb-1.5 text-faint">
                <span data-anchor="projects">projects</span>
              </h2>
              <ul>
                {featuredProjects.map((project) =>
                <li
                  key={project.name}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 md:grid-cols-[130px_minmax(0,1fr)]">

                    {project.href ?
                  <TextLink href={project.href} className="justify-self-start">
                        {project.name}
                      </TextLink> :

                  <span className="text-ink">{project.name}</span>
                  }
                    <span className="truncate text-right text-faint md:text-left">{project.note}</span>
                  </li>
                )}
              </ul>
              <TextLink href="/projects" muted className="mt-px inline-block">
                view all projects{' '}
                <span aria-hidden="true" className="link-arrow">
                  →
                </span>
              </TextLink>
            </section>
          </Reveal>

          <Reveal delay={0.24}>
            <section aria-labelledby="education-heading">
              <h2 id="education-heading" className="mb-1.5 text-faint">
                <span data-anchor="education">education</span>
              </h2>
              {education.map((school) =>
              <div key={school.slug}>
                  <div className="flex justify-between gap-4">
                    <span className="text-ink">{school.organization}</span>
                    <span className="tabular-nums text-faint">{school.year}</span>
                  </div>
                  <p className="whitespace-nowrap text-[14px] tracking-[-0.02em] text-faint">{school.role}</p>
                </div>
              )}
            </section>
          </Reveal>
        </div>

        <SketchArrows containerRef={containerRef} arrows={arrows} />
      </div>
    </PaperPage>);

}
