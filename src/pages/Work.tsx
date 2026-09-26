import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { projects } from '../data/projects.mjs';
import { Seo } from "../components/Seo";
import { PAGE_SEO } from "../data/seo.mjs";

const rotations = [-1.3, 1.1, -0.7, 1.5, -1.5, 0.8];

export function Work() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10 md:py-20">
      <Seo {...PAGE_SEO.work} />
      <SectionHeading
        index="01"
        label="Projects"
        title={`${projects.length} projects. Pick one.`}
        note="Some were solo projects. Others came out of hackathons and team work." />
      

      <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) =>
        <ProjectCard
          key={project.slug}
          project={project}
          rotate={rotations[i % rotations.length]} />

        )}
        </div>
    </section>);

}
