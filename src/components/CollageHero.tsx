import { memo, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { experience } from '../data/experience';
import { useAskBot } from '../contexts/AskBotContext';
import { Tape } from './Paper';

const ease = [0.22, 1, 0.36, 1] as const;

/** The word at the end of the statement keeps changing its mind. */
const verbs = ['ships', 'integrates', 'automates', 'prototypes', 'debugs'];

function startYear(range: string): string {
  const match = range.match(/\d{4}/);
  return match ? match[0] : '';
}

const indexRoles = experience.slice(0, 5);

function RotatingHeroHeadline() {
  const [verb, setVerb] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(
      () => setVerb((v) => (v + 1) % verbs.length),
      2200
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <motion.h1
      aria-label={`I'm Rohan, a software engineer who ${verbs[verb]}.`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      className="mt-5 font-display text-[clamp(1.65rem,8.2vw,3.25rem)] leading-[1.0] tracking-[-0.01em] md:text-[clamp(2rem,4.2vw,4rem)]">
      <span className="block whitespace-nowrap">
        I&apos;m Rohan, a software
      </span>
      <span className="block whitespace-nowrap">
        engineer who{' '}
        <span
          data-rotating-verb-slot
          className="relative inline-grid w-[4.9em] align-baseline">
          <AnimatePresence mode="wait">
            <motion.span
              key={verbs[verb]}
              initial={{ y: 18, opacity: 0, rotate: -2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -18, opacity: 0, rotate: 2 }}
              transition={{ duration: 0.34, ease }}
              className="col-start-1 row-start-1 inline-block italic text-tangerine">
              {verbs[verb]}.
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </motion.h1>
  );
}

const ExperienceIndex = memo(function ExperienceIndex() {
  const { open: isRoRoOpen } = useAskBot();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0.9 }}
      transition={{ duration: 0.7, delay: 0.12, ease }}
      data-experience-index
      className="relative min-w-0 border border-ink/15 bg-paper-2 shadow-paper-lg md:mt-6">
      <Tape className="-top-3 left-8" rotate={-6} />
      <Tape className="-top-3 right-10" rotate={5} />

      <div className="flex items-baseline justify-between border-b border-ink/20 px-5 py-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-soft">
          Where I&apos;ve been
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-tangerine">
          2024 - now
        </p>
      </div>

      <ul>
        {indexRoles.map((role) =>
        <li
          key={role.slug}
          className={`grid grid-cols-[52px_1fr] items-baseline gap-x-4 border-b border-dashed border-ink/20 px-5 py-3 last:border-0 sm:grid-cols-[52px_minmax(0,1fr)_minmax(0,1fr)] ${
            isRoRoOpen
              ? 'lg:min-h-[68px] lg:grid-cols-[44px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-3 lg:px-4'
              : ''
          }`}>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-soft">
              {startYear(role.dateRange)}
            </span>
            <span
              className={`min-w-0 font-medium ${
                isRoRoOpen
                  ? 'lg:line-clamp-2 lg:text-[13px] lg:leading-snug'
                  : 'text-[15px]'
              }`}>
              {role.organization}
            </span>
            <span
              className={`col-start-2 min-w-0 leading-snug text-ink-soft sm:col-start-3 ${
                isRoRoOpen
                  ? 'lg:line-clamp-2 lg:text-[12px]'
                  : 'text-[14px]'
              }`}>
              {role.title.split(',')[0]}
            </span>
          </li>
        )}
      </ul>

      <Link
        to="/experience"
        className="block border-t border-ink/20 px-5 py-3 font-hand text-xl leading-none text-ink-soft hover:text-tangerine">
        full history on the experience page ↗
      </Link>
    </motion.div>
  );
});

export function CollageHero() {
  return (
    <section
      aria-label="Introduction"
      className="grid-paper relative border-b border-ink/15">
      
      <div className="mx-auto max-w-[1240px] px-5 py-14 md:px-10 md:py-20">
        <div
          data-hero-grid
          className="grid gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-start md:gap-14">
          {/* Statement */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.26em] text-ink-soft">
              
              <span className="flex items-center gap-2 text-ink">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 bg-tangerine" />
                
                {profile.role}
              </span>
              <span aria-hidden="true">/</span>
              {profile.location}
            </motion.p>

            <RotatingHeroHeadline />

            {/* Status note, folded corner */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: -1.4 }}
              transition={{ duration: 0.7, delay: 0.18, ease }}
              className="relative mt-9 max-w-[560px] bg-peach px-6 py-5 shadow-paper">
              
              <p className="font-mono text-[13px] leading-6 text-tangerine">
                {profile.note}
              </p>
              <span
                aria-hidden="true"
                className="absolute -bottom-[1px] right-0 h-0 w-0 border-b-[20px] border-l-[20px] border-b-tangerine border-l-transparent" />
              
            </motion.div>

          </div>

          {/* This memoized card does not rerender when the hero verb changes. */}
          <ExperienceIndex />
        </div>
      </div>
    </section>);

}
