import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { PAGE_SEO } from '../data/seo.mjs';
import { profile } from '../data/profile';
import { education, experience } from '../data/experience';
import { quickViewProjects } from '../data/projects.mjs';
import { recognitionLabel } from '../data/recognition.mjs';
import { skills } from '../data/skills';

const ease = [0.22, 1, 0.36, 1] as const;

const contact = [
  { label: 'Résumé', href: profile.contact.resume },
  { label: 'LinkedIn', href: profile.contact.linkedin },
  { label: 'GitHub', href: profile.contact.github },
];

function BriefSection({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0.8, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease }}
      className="border-t border-ink/20 py-12 text-center md:py-16"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-tangerine">{index}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
      {children}
    </motion.section>
  );
}

export function Brief() {
  const reduceMotion = useReducedMotion();
  const current = experience[0];

  return (
    <article data-quick-view className="mx-auto max-w-[760px] px-5 sm:px-8">
      <Seo {...PAGE_SEO.brief} />

      <header className="flex min-h-[70svh] flex-col items-center justify-center py-16 text-center">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0.6, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="font-mono text-[10px] uppercase tracking-[0.24em] text-tangerine"
        >
          Quick View
        </motion.p>
        <div className="mt-5 overflow-hidden pb-1">
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0.65, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="font-display text-[clamp(3rem,9vw,6rem)] leading-none"
          >
            {profile.name}
          </motion.h1>
        </div>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0.7, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.08, ease }}
          className="mt-6 max-w-[660px] font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.2] text-ink-soft"
        >
          {profile.intro}
        </motion.p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">{profile.location}, Canada</p>
        <a href={`mailto:${profile.contact.email}`} className="mt-3 border-b border-ink/30 pb-1 font-mono text-xs text-tangerine hover:border-tangerine">
          {profile.contact.email}
        </a>

        <nav aria-label="Quick contact" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {contact.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-1 border-b border-ink/25 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-tangerine hover:text-tangerine"
            >
              {label}<ArrowUpRight size={12} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <Link to="/" className="mt-9 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-tangerine">
          ← Back to full portfolio
        </Link>
      </header>

      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.18, ease }}
        style={{ transformOrigin: 'center' }}
        className="h-px bg-ink/30"
      />

      <BriefSection index="01 / Now" title="Currently">
        <h3 className="mt-7 font-display text-2xl leading-tight">{current.title}</h3>
        <p className="mt-1 text-base">{current.organization}</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{current.dateRange}</p>
      </BriefSection>

      <BriefSection index="02 / Roles" title="Experience & research">
        <ol className="mt-7 divide-y divide-ink/15 border-y border-ink/15">
          {experience.slice(1).map(role => (
            <li key={role.slug} className="py-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-tangerine">{role.dateRange} · {role.kind}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{role.organization}</h3>
              <p className="mt-1 text-sm text-ink">{role.title}</p>
            </li>
          ))}
        </ol>
      </BriefSection>

      <BriefSection index="03 / Education" title="Education">
        <h3 className="mt-7 font-display text-2xl">{education.school}</h3>
        <p className="mt-2 text-sm">{education.degree} · {education.concentration}</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">{education.dateRange}</p>
      </BriefSection>

      <BriefSection index="04 / Projects" title="Selected work">
        <ul className="mt-7 divide-y divide-ink/15 border-y border-ink/15">
          {quickViewProjects.map(project => (
            <li key={project.slug}>
              <Link to={`/work/${project.slug}`} className="group block px-2 py-6 transition-colors hover:bg-paper-2">
                <h3 className="inline-flex items-center gap-1.5 font-display text-2xl leading-tight group-hover:text-tangerine">
                  {project.name}<ArrowUpRight size={16} aria-hidden="true" className="text-tangerine transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className={`mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-ink-soft ${project.slug === 'greenlens-ai' ? 'md:whitespace-nowrap md:text-[9px] md:tracking-[0.06em]' : ''}`}>
                  {project.impact && <span className="text-tangerine">{project.impact} <span aria-hidden="true">·</span> </span>}
                  {project.stack.slice(0, 3).join(' / ')}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/work" className="mt-6 inline-flex items-center gap-2 border border-ink/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors hover:border-tangerine hover:text-tangerine">
          View all projects <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </BriefSection>

      <BriefSection index="05 / Results" title="Recognition">
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-tangerine">{recognitionLabel}</p>
        <Link to="/recognition" className="mt-5 inline-block border-b border-ink/40 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] hover:border-tangerine hover:text-tangerine">See every result ↗</Link>
      </BriefSection>

      <BriefSection index="06 / Skills" title="Toolkit">
        <ul className="mt-7 space-y-4">
          {skills.map(group => (
            <li key={group.key} className="text-sm leading-relaxed">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-tangerine">{group.label}</h3>
              <p className={`mt-1 text-ink-soft ${group.key === 'devtools' ? 'md:whitespace-nowrap md:text-[13px]' : ''}`}>{group.items.join(' · ')}</p>
            </li>
          ))}
        </ul>
      </BriefSection>

      <footer className="py-14 text-center">
        <p className="font-display text-2xl">That's the short version.</p>
        <a href={`mailto:${profile.contact.email}`} className="mt-5 inline-flex items-center gap-1 border-b border-tangerine pb-1 font-mono text-xs uppercase tracking-[0.16em] text-tangerine hover:text-ink">
          Email me <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </footer>
    </article>
  );
}
