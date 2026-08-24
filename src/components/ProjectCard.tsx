import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { accent } from '../utils/accents';

interface ProjectCardProps {
  project: Project;
  rotate?: number;
  compact?: boolean;
}

export function ProjectCard({
  project,
  rotate = 0,
  compact = false
}: ProjectCardProps) {
  const tone = accent(project.accent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate }}
      whileHover={{ rotate: 0, y: -6 }}
      className="h-full">
      
      <Link
        to={`/work/${project.slug}`}
        className="group flex h-full flex-col border border-ink/20 bg-paper-2 shadow-paper transition-shadow hover:shadow-paper-lg">
        
        {!compact &&
        <div className="relative overflow-hidden border-b border-ink/15 bg-paper">
            {project.image ?
          <img
            src={project.image}
            alt={`Preview of my ${project.name} project`}
            width="1200"
            height="896"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /> :


          <div
            className={`flex aspect-[4/3] w-full items-center justify-center ${tone.bg}`}>
            
                <span className="font-display text-5xl italic text-ink/70">
                  {project.name.slice(0, 2)}
                </span>
              </div>
          }
            {project.impact &&
          <span className="absolute left-0 top-4 inline-flex max-w-[calc(100%_-_1rem)] items-start gap-1.5 bg-ink px-2.5 py-1 font-mono text-[9px] uppercase leading-[1.4] tracking-[0.14em] text-paper-2">
                <Award size={11} className="mt-px shrink-0" />
                <span>{project.impact}</span>
              </span>
          }
          </div>
        }

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl leading-tight">
              {project.name}
            </h3>
            <span className="mt-1 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              {project.year}
            </span>
          </div>
          <p className="mt-2 text-[15px] leading-snug text-ink-soft">
            {project.summary}
          </p>

          <span className="mt-auto inline-flex items-center gap-1 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-tangerine">
            View project
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            
          </span>
          <span
            aria-hidden="true"
            className={`mt-4 block h-1.5 w-full ${tone.bg}`} />
          
        </div>
      </Link>
    </motion.div>);

}
