import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring } from
'framer-motion';

type CursorMode = 'default' | 'link' | 'text';

const INTERACTIVE = 'a, button, [role="button"], summary';
const TEXTUAL = 'input, textarea, [contenteditable="true"]';

const ARROW_PATH =
'M3 2.2 L3 21.4 L8.4 16.3 L11.9 24.4 L15.8 22.6 L12.3 14.7 L20 14.7 Z';

/** A cut-paper pointer with simple link and text-field states. */
export function PaperCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 1500, damping: 70, mass: 0.28 });
  const smoothY = useSpring(y, { stiffness: 1500, damping: 70, mass: 0.28 });

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)');
    const apply = () => setEnabled(query.matches && !reduceMotion);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add('paper-cursor');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as Element | null;
      if (!target || typeof target.closest !== 'function') return;

      if (target.closest(TEXTUAL)) setMode('text');else
      if (target.closest(INTERACTIVE)) setMode('link');else
      setMode('default');
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onCancel = () => setPressed(false);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
    window.addEventListener('blur', onLeave);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('paper-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isLink = mode === 'link';
  const isText = mode === 'text';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="absolute left-0 top-0">
        
        {/* Cut-paper arrow */}
        <motion.div
          animate={{
            rotate: isLink ? -12 : 0,
            scale: pressed ? 0.86 : isLink ? 1.12 : 1,
            opacity: isText ? 0 : 1
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.1, originY: 0.08 }}>
          
          <svg
            width="26"
            height="28"
            viewBox="0 0 26 28"
            fill="none"
            className="block overflow-visible">
            
            <path
              d={ARROW_PATH}
              transform="translate(2.1 2.6)"
              fill="rgba(23,20,15,0.22)" />
            
            <path
              d={ARROW_PATH}
              fill={isLink ? '#C7DD52' : '#FBF8F1'}
              stroke="#17140F"
              strokeWidth="1.6"
              strokeLinejoin="round" />
            
            <path
              d="M3 2.2 L3 9.6 L7.4 7.6 Z"
              fill="#E8471A"
              opacity={isLink ? 1 : 0.85} />
            
          </svg>
        </motion.div>

        {/* Caret bar over text fields */}
        <motion.span
          animate={{ opacity: isText ? 1 : 0, scaleY: isText ? 1 : 0.6 }}
          transition={{ duration: 0.15 }}
          className="absolute left-0 top-0 block h-[26px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-ink" />
        
      </motion.div>
    </div>);

}
