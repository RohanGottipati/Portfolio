import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';

const ease = [0.22, 1, 0.36, 1] as const;

const NAME = 'rohan gottipati';
const TYPE_SPEED = 62;
const TYPE_START = 220;

const phrases = [
'production systems',
'agent pipelines',
'13 shipped projects',
'9 hackathon wins',
'and a lot of coffee'];


/** Paper scraps that fly in and settle around the name. */
const scraps = [
{ color: 'bg-tangerine', w: 118, h: 92, x: -280, y: -104, rotate: -9, from: { x: -520, y: -260 } },
{ color: 'bg-lime', w: 84, h: 84, x: 268, y: -132, rotate: 11, from: { x: 560, y: -300 } },
{ color: 'bg-sky', w: 96, h: 74, x: -318, y: 118, rotate: 7, from: { x: -560, y: 320 } },
{ color: 'bg-peach', w: 132, h: 66, x: 296, y: 132, rotate: -6, from: { x: 580, y: 300 } },
{ color: 'bg-blush', w: 62, h: 62, x: 128, y: -196, rotate: 16, from: { x: 260, y: -420 } }];


const PHRASE_START = 2200;
const PHRASE_HOLD = 900;
const LEAVE_AT = PHRASE_START + phrases.length * PHRASE_HOLD + 300;
const COUNT_MS = LEAVE_AT - 400;

export function IntroLoader() {
  const reduceMotion = useReducedMotion();

  const location = useLocation();

  // Plays on every fresh load of the homepage, never on in-app navigation.
  const [visible, setVisible] = useState(() => location.pathname === '/');
  const [leaving, setLeaving] = useState(false);
  const [typed, setTyped] = useState('');
  const [phrase, setPhrase] = useState(0);
  const [count, setCount] = useState(0);
  const timers = useRef<number[]>([]);
  const skipRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    setLeaving((current) => {
      if (current) return current;

      timers.current.push(
        window.setTimeout(() => {
          setVisible(false);
          window.requestAnimationFrame(() =>
            document.getElementById('main-content')?.focus({
              preventScroll: true
            })
          );
        }, reduceMotion ? 320 : 900)
      );
      return true;
    });
  }, [reduceMotion]);

  // Typing, phrase cycling, counter and the scheduled exit.
  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() =>
      skipRef.current?.focus({ preventScroll: true })
    );

    if (reduceMotion) {
      setTyped(NAME);
      setCount(100);
      timers.current.push(window.setTimeout(dismiss, 700));
    } else {
      // Type the name out
      NAME.split('').forEach((_, i) => {
        timers.current.push(
          window.setTimeout(
            () => setTyped(NAME.slice(0, i + 1)),
            TYPE_START + i * TYPE_SPEED
          )
        );
      });

      // Cycle the phrase line
      phrases.forEach((_, i) => {
        timers.current.push(
          window.setTimeout(
            () => setPhrase(i),
            PHRASE_START + i * PHRASE_HOLD
          )
        );
      });

      // Count up to 100
      const started = Date.now();
      const tick = window.setInterval(() => {
        const p = Math.min(1, (Date.now() - started) / COUNT_MS);
        setCount(Math.round(p * 100));
        if (p >= 1) window.clearInterval(tick);
      }, 40);
      timers.current.push(tick);

      timers.current.push(window.setTimeout(dismiss, LEAVE_AT));
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      timers.current.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
      timers.current = [];
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible, reduceMotion, dismiss]);

  if (!visible) return null;

  const shutter = 'absolute inset-x-0 h-1/2 bg-paper';

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        onClick={dismiss}
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio introduction"
        className="fixed inset-0 z-[80] overflow-hidden">
        
        {/* Two paper shutters that split apart on exit */}
        <motion.div
          className={`${shutter} top-0 border-b border-ink/10`}
          animate={leaving && !reduceMotion ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.85, ease }}>
          
          <div className="grid-paper absolute inset-0 opacity-70" />
        </motion.div>
        <motion.div
          className={`${shutter} bottom-0`}
          animate={leaving && !reduceMotion ? { y: '100%' } : { y: 0 }}
          transition={{ duration: 0.85, ease }}>
          
          <div className="grid-paper absolute inset-0 opacity-70" />
        </motion.div>

        {/* Everything on top of the shutters */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          animate={leaving ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: leaving ? 0.28 : 0.2 }}>
          
          {/* Scraps flying in */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-0 w-0 md:block">
            
            {scraps.map((s, i) =>
            <motion.span
              key={s.color}
              initial={{
                x: s.from.x,
                y: s.from.y,
                rotate: 0,
                opacity: 0
              }}
              animate={
              leaving ?
              {
                x: s.from.x * 0.9,
                y: s.from.y * 0.9,
                rotate: s.rotate * 3,
                opacity: 0
              } :
              { x: s.x, y: s.y, rotate: s.rotate, opacity: 1 }
              }
              transition={{
                duration: leaving ? 0.5 : 0.75,
                delay: leaving ? 0 : 1.35 + i * 0.14,
                ease
              }}
              style={{
                width: s.w,
                height: s.h,
                marginLeft: -s.w / 2,
                marginTop: -s.h / 2
              }}
              className={`absolute border border-ink/15 shadow-paper ${s.color}`} />

            )}
          </div>

          {/* Typed name with marker stroke */}
          <p className="relative text-center font-display text-[40px] leading-none sm:text-6xl md:text-[76px]">
            <span className="relative z-10 lowercase">
              {typed}
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                className="ml-1 inline-block h-[0.62em] w-[0.44em] translate-y-[0.02em] bg-tangerine align-baseline" />
              
            </span>
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: typed.length === NAME.length ? 1 : 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              style={{ transformOrigin: 'left' }}
              className="absolute inset-x-[-2%] bottom-[0.16em] z-0 h-[0.15em] bg-lime" />
            
          </p>

          {/* Cycling phrase line */}
          <div className="mt-6 h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={phrase}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.42, ease }}
                className="font-mono text-[11px] uppercase tracking-[0.26em] text-ink-soft">
                
                {phrases[phrase]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress rule */}
          <div
            role="progressbar"
            aria-label="Loading portfolio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={count}
            className="mt-8 w-[min(74vw,320px)]">
            <div className="h-[3px] w-full bg-ink/12">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduceMotion ? 0.4 : COUNT_MS / 1000,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ transformOrigin: 'left' }}
                className="h-full bg-tangerine" />
              
            </div>
            <div className="mt-2.5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
              <span>{profile.role}</span>
              <span className="tabular-nums text-ink">
                {String(count).padStart(3, '0')}%
              </span>
            </div>
          </div>

          <motion.button
            ref={skipRef}
            type="button"
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="absolute bottom-7 font-hand text-xl text-ink-soft hover:text-tangerine">
            
            click anywhere to skip →
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute left-5 top-6 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft md:left-10">
            
            {profile.location}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}
