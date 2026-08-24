import { motion } from 'framer-motion';
import type { Role } from '../types/portfolio';

const kindLabel: Record<Role['kind'], string> = {
  work: 'Industry',
  research: 'Research',
  founder: 'Founder',
  teaching: 'Teaching',
  leadership: 'Leadership'
};

interface RoleListProps {
  roles: Role[];
}

export function RoleList({ roles }: RoleListProps) {
  return (
    <ol className="mt-8 border-t border-ink/15">
      {roles.map((role, i) =>
      <motion.li
        key={role.slug}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: i % 4 * 0.05 }}
        className="group grid gap-4 border-b border-ink/15 py-7 md:grid-cols-[190px_1fr]">
        
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              {role.dateRange}
            </p>
            <p className="mt-2 inline-block bg-paper px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-tangerine">
              {kindLabel[role.kind]}
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl leading-tight md:text-3xl">
              {role.title}
              <span className="text-ink-soft"> · {role.organization}</span>
            </h3>
            {role.location &&
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                {role.location}
              </p>
          }
            {role.highlights.length > 0 &&
          <ul className="mt-4 space-y-2.5">
                {role.highlights.map((h) =>
            <li
              key={h}
              className="flex max-w-3xl gap-3 text-[14px] leading-relaxed">
              
                    <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 bg-lime" />
              
                    {h}
                  </li>
            )}
              </ul>
          }
          </div>
        </motion.li>
      )}
    </ol>);

}
