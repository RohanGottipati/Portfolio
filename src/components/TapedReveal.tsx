import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Paper } from './Paper';

export function TapedReveal({children, rotate = 0, className = ''}: {children: ReactNode; rotate?: number; className?: string}) {
  const reduceMotion = useReducedMotion();
  return <div className="relative">
    <motion.div initial={reduceMotion ? false : {opacity: .75, y: 7}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: .5, delay: .12, ease: [0.22, 1, 0.36, 1]}}><Paper rotate={rotate} className={className}>{children}</Paper></motion.div>
    <motion.span aria-hidden="true" className="tape -top-3 left-6 z-10" initial={reduceMotion ? false : {opacity: 0, scaleX: .6, rotate: -7}} whileInView={{opacity: 1, scaleX: 1, rotate: -7}} viewport={{once: true}} transition={{duration: .3, ease: [0.22, 1, 0.36, 1]}}/>
  </div>;
}
