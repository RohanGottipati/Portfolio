import { motion } from 'framer-motion';
import { TextLink } from './TextLink';
import { revealEase } from './Reveal';
import type { Entry } from '../types/portfolio';

type EntryListProps = {
  title: string;
  entries: Entry[];
  headingLevel?: 'h1' | 'h2';
  singleLine?: boolean;
  /** Seconds before this list starts revealing. */
  delay?: number;
};

const STAGGER = 0.035;
const MAX_STAGGER = 0.3;

export function EntryList({ title, entries, headingLevel = 'h2', singleLine = false, delay = 0.1 }: EntryListProps) {
  const headingId = `${title.replace(/\s+/g, '-')}-heading`;
  const Heading = headingLevel === 'h1' ? motion.h1 : motion.h2;

  return (
    <section aria-labelledby={headingId}>
      <Heading
        id={headingId}
        className="mb-2.5 text-faint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay, ease: revealEase }}>

        {title}
      </Heading>
      <ul className="space-y-1">
        {entries.map((entry, i) =>
        <motion.li
          key={entry.key}
          className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 ${singleLine ? 'md:grid-cols-[235px_minmax(0,1fr)_auto]' : 'md:grid-cols-[190px_minmax(0,1fr)_auto]'}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.04 + Math.min(i * STAGGER, MAX_STAGGER), ease: revealEase }}>

            {entry.href ?
          <TextLink href={entry.href} className="justify-self-start">
                {entry.primary}
              </TextLink> :

          <span className={`text-ink ${singleLine ? 'md:whitespace-nowrap' : ''}`}>{entry.primary}</span>
          }
            <span className={`col-span-2 row-start-2 min-w-0 text-faint md:col-span-1 md:col-start-2 md:row-start-1 ${singleLine ? 'md:whitespace-nowrap' : ''}`}>{entry.secondary}</span>
            <span className="col-start-2 row-start-1 whitespace-nowrap text-right tabular-nums text-faint md:col-start-3">{entry.meta}</span>
          </motion.li>
        )}
      </ul>
    </section>);

}
