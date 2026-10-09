import React from 'react';
import { motion } from 'framer-motion';
import { isInitialRevealDone } from '../utils/revealState';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  /** Persistent chrome only animates on the very first page load, not on navigation. */
  persistent?: boolean;
  className?: string;
};

export const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 6, persistent = false, className }: RevealProps) {
  const skip = persistent && isInitialRevealDone();

  return (
    <motion.div
      className={className}
      initial={skip ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: revealEase }}>

      {children}
    </motion.div>);

}