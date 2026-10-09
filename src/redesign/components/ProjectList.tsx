import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { allProjects } from '../data/projects';
import { revealEase } from './Reveal';

export function ProjectList() {
  return (
    <section aria-labelledby="projects-heading">
      <motion.h1
        id="projects-heading"
        className="mb-2.5 text-[15.5px] font-normal text-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: revealEase }}>
        <span className="border-b border-dotted border-faint/70 pb-px">projects</span>
      </motion.h1>
      <ul className="space-y-1">
        {allProjects.map((project, index) => (
          <motion.li
            key={project.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 md:grid-cols-[205px_minmax(0,1fr)_auto]"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 + Math.min(index * 0.035, 0.3), ease: revealEase }}>
            <div className="flex min-w-0 items-center gap-2 whitespace-nowrap">
              <span className="text-ink">{project.name}</span>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  aria-label={`${project.name} on GitHub`}
                  title={`${project.name} on GitHub`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink transition-colors hover:text-[#0877f9] focus-visible:text-[#0877f9]">
                  <Github aria-hidden="true" size={17} strokeWidth={1.8} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  aria-label={`Visit ${project.name} live site`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-[17px] leading-none text-ink transition-colors hover:text-[#0877f9] focus-visible:text-[#0877f9]">
                  ↗
                </a>
              )}
            </div>
            <span className="col-span-2 row-start-2 text-faint md:col-span-1 md:col-start-2 md:row-start-1">
              {project.note}
            </span>
            <span className="col-start-2 row-start-1 whitespace-nowrap text-right tabular-nums text-faint md:col-start-3">
              {project.year}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
