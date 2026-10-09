import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { allProjects } from '../data/projects';
import { revealEase } from './Reveal';

export function ProjectList() {
  return (
    <section aria-labelledby="projects-heading">
      <motion.h1
        id="projects-heading"
        className="mb-2.5 text-faint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: revealEase }}>
        projects
      </motion.h1>
      <ul className="space-y-1">
        {allProjects.map((project, index) => (
          <motion.li
            key={project.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 md:grid-cols-[150px_minmax(0,1fr)_auto]"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 + Math.min(index * 0.035, 0.3), ease: revealEase }}>
            <span className="text-ink">{project.name}</span>
            <span className="col-span-2 row-start-2 text-faint md:col-span-1 md:col-start-2 md:row-start-1">
              {project.note}
            </span>
            <div className="col-start-2 row-start-1 flex items-center justify-end gap-3 whitespace-nowrap md:col-start-3">
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
                  className="rounded-sm border border-current px-1.5 text-[13px] leading-[1.3] text-ink transition-colors hover:text-[#0877f9] focus-visible:text-[#0877f9]">
                  live ↗
                </a>
              )}
              <span className="tabular-nums text-faint">{project.year}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
