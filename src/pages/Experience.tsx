import { Paper } from '../components/Paper';
import { RoleList } from '../components/RoleList';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { clubs, education, experience } from '../data/experience';
import { PAGE_SEO } from '../data/seo.mjs';

export function Experience() {
  return (
    <>
      <Seo {...PAGE_SEO.experience} />

      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10 md:py-20">
        <SectionHeading
          index="01"
          label="Roles"
          title="What I&apos;ve built across roles."
          note="I list the newest first - internships, research and founding."
          headingLevel="h1" />
        <RoleList roles={experience} />
      </section>

      <section className="border-t border-ink/15 bg-paper-2">
        <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-10 md:py-20">
          <SectionHeading
            index="02"
            label="Education"
            title={education.school}
            note={education.dateRange} />

          <div className="mt-8 grid gap-7 md:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="font-display text-3xl leading-tight">
                I&apos;m completing a {education.degree}.
                <span className="block">{education.concentration}</span>
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                {education.location}
              </p>
            </div>
            <Paper rotate={-1.2} className="bg-lime p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                Relevant coursework
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {education.coursework.map((course) =>
                <li
                  key={course}
                  className="border border-ink/20 bg-paper-2/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                    {course}
                  </li>
                )}
              </ul>
            </Paper>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15">
        <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-10 md:py-20">
          <SectionHeading
            index="03"
            label="Campus"
            title="How I lead on campus."
            note="Laurier Analytics Society + Laurier Computing Society." />
          <RoleList roles={clubs} />
        </div>
      </section>
    </>
  );
}
