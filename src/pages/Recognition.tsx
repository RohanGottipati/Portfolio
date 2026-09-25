import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SectionHeading } from '../components/SectionHeading';
import { PAGE_SEO } from '../data/seo.mjs';
import { recognition, recognitionLabel } from '../data/recognition.mjs';
import { accent } from '../utils/accents';

const rotations = [-1, 0.8, -0.5, 1.1, -0.7];

export function Recognition() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10 md:py-20">
      <Seo {...PAGE_SEO.recognition} />
      <SectionHeading
        index="01"
        label="Hackathon results"
        title="Recognition"
        note={recognitionLabel}
        headingLevel="h1"
      />
      <ol className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {recognition.map((entry, i) => (
          <li key={entry.project.slug}>
            <Link
              to={`/work/${entry.project.slug}`}
              style={{ '--card-rotation': `${rotations[i % rotations.length]}deg` } as React.CSSProperties}
              className="ticket-card group relative flex h-full min-h-[230px] flex-col border border-ink/20 bg-paper-2 p-5 shadow-paper transition-[transform,box-shadow] duration-300 hover:shadow-paper-lg"
            >
              {i % 4 === 0 && <span aria-hidden="true" className="tape -top-3 left-8 -rotate-6" />}
              <span className="flex items-start justify-between gap-3 border-b border-dashed border-ink/25 pb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                <span>{entry.event || 'Hackathon'}</span>
                <span className="shrink-0">{entry.project.date ?? entry.project.year}</span>
              </span>
              <strong className="mt-5 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-normal leading-tight">
                {entry.result}
              </strong>
              {entry.project.challenge && <span className="mt-3 text-xs leading-snug text-ink-soft">{entry.project.challenge}</span>}
              <span className="mt-auto flex items-end justify-between gap-3 pt-6">
                <span className="font-display text-2xl leading-tight">{entry.project.name}</span>
                <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-tangerine transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <span aria-hidden="true" className={`mt-4 h-1.5 w-full ${accent(entry.project.accent).bg}`} />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
