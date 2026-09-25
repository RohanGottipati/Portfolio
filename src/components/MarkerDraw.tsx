import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function MarkerDraw({children}: {children: ReactNode}) {
  const reduceMotion = useReducedMotion();
  return <span className="relative inline-block"><span className="relative z-10">{children}</span><motion.span aria-hidden="true" className="absolute bottom-[.1em] left-0 right-0 h-[.22em] origin-left bg-lime" initial={reduceMotion ? false : {scaleX: 0}} whileInView={{scaleX: 1}} viewport={{once: true}} transition={{duration: .55, ease: [0.22, 1, 0.36, 1]}}/></span>;
}
