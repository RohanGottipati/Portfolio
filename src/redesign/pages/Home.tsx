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
{ id: 'currently-role', from: 'currently', fromSide: 'bottom', to: 'tagline', toSide: 'right', approach: { x: 0.45, y: 1 }, targetOffset: { x: -4, y: 7 } },
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
              nine wins so far. <span data-anchor="currently" className="hidden md:inline">Currently</span>
              <span className="md:hidden">Currently at Wilfrid Laurier University.</span>
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 grid w-full gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-[140px] md:max-w-[720px] md:grid-cols-[190px_210px_240px] md:justify-between">
          <Reveal delay={0.16}>
            <section aria-labelledby="experience-heading">
              <h2 id="experience-heading" className="mb-1.5 text-[15.5px] font-normal text-ink">
                <TextLink href="/work" plain className="inline-flex items-baseline gap-1">
                  <span className="border-b border-dotted border-faint/70 pb-px">experience</span>
                  <span aria-hidden="true" className="link-arrow text-[13px]">→</span>
                </TextLink>
              </h2>
              <ul>
                {previously.map((role) =>
                <li key={role.slug} className="flex justify-between gap-4">
                    <span className="text-ink">{role.organization}</span>
                    <span className="tabular-nums text-faint">{role.year}</span>
                  </li>
                )}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={0.2}>
            <section aria-labelledby="projects-heading" className="md:relative md:left-6">
              <h2 id="projects-heading" className="mb-1.5 text-[15.5px] font-normal text-ink">
                <TextLink href="/projects" plain className="inline-flex items-baseline gap-1">
                  <span data-anchor="projects" className="border-b border-dotted border-faint/70 pb-px">projects</span>
                  <span aria-hidden="true" className="link-arrow text-[13px]">→</span>
                </TextLink>
              </h2>
              <ul>
                {featuredProjects.map((project) =>
                <li key={project.name}>
                    {project.href ?
                  <TextLink href={project.href} className="justify-self-start">
                        {project.name}
                      </TextLink> :

                  <span className="text-ink">{project.name}</span>
                  }
                  </li>
                )}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={0.24}>
            <section aria-labelledby="education-heading">
              <h2 id="education-heading" className="mb-1.5 text-[15.5px] font-normal text-ink">
                <span data-anchor="education" className="border-b border-dotted border-faint/70 pb-px">education</span>
              </h2>
              {education.map((school) =>
              <div key={school.slug}>
                  <div className="flex justify-between gap-4">
                    <span className="text-ink">{school.organization}</span>
                    <span className="tabular-nums text-faint">{school.year}</span>
                  </div>
                  <p className="whitespace-nowrap text-ink">{school.role}</p>
                </div>
              )}
            </section>
          </Reveal>
        </div>

        <SketchArrows containerRef={containerRef} arrows={arrows} />
      </div>
    </PaperPage>);

}
