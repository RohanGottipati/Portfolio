import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    mass: 0.22
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      data-scroll-progress
      className="pointer-events-none fixed inset-x-0 top-0 z-[54] h-0.5 origin-left bg-tangerine"
      style={{ scaleX }} />
  );
}
