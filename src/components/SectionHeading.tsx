import { motion } from 'framer-motion';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3 border-b border-ink/15 pb-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft">
          <span className="text-tangerine">{index}</span> - {label}
        </p>
        <Heading className="mt-2 font-display text-4xl leading-[1.05] md:text-5xl">
          {title}
        </Heading>
      </div>
      {note &&
      <p className="max-w-[36rem] font-hand text-lg leading-tight text-ink-soft [text-wrap:balance] sm:text-xl lg:max-w-[25rem] lg:text-right xl:max-w-none xl:whitespace-nowrap">
          {note}
        </p>
      }
    </motion.div>);

}
