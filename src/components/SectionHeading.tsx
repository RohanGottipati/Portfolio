import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  note?: string;
  headingLevel?: 'h1' | 'h2';
}

export function SectionHeading({
  index,
  label,
  title,
  note,
  headingLevel = 'h2'
}: SectionHeadingProps) {
  const Heading = headingLevel;
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-3 border-b border-ink/15 pb-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft">
          <span className="text-tangerine">{index}</span> - {label}
        </p>
        <div className="overflow-hidden py-1"><motion.div initial={reduceMotion ? false : { y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}><Heading className="mt-2 font-display text-4xl leading-[1.05] md:text-5xl">{title}</Heading></motion.div></div>
      </div>
      {note &&
      <p className="max-w-[36rem] font-hand text-lg leading-tight text-ink-soft [text-wrap:balance] sm:text-xl lg:max-w-[25rem] lg:text-right xl:max-w-none xl:whitespace-nowrap">
          {note}
        </p>
      }
    </div>);

}
