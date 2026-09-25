import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
import {
  BrowserRouter,
  useNavigationType,
  Route,
  Routes,
  useLocation,
  type Location,
} from "react-router-dom";
import { SiteNav } from './components/SiteNav';
import { SiteFooter } from './components/SiteFooter';
import { RoRo } from './components/RoRo';
import { SelectionAskRoRo } from './components/SelectionAskRoRo';
import { IntroLoader } from "./components/IntroLoader";
import { PaperCursor } from "./components/PaperCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { AskBotProvider, useAskBot } from './contexts/AskBotContext';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Experience } from './pages/Experience';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from "./pages/NotFound";
import { SmoothScroll, useSmoothScroll } from "./components/SmoothScroll";
import { Brief } from './pages/Brief';
import { Recognition } from './pages/Recognition';

let projectDetailPromise: Promise<typeof import('./pages/ProjectDetail')> | undefined;
function loadProjectDetail() {
  projectDetailPromise ??= import('./pages/ProjectDetail');
  return projectDetailPromise;
}
const ProjectDetail = lazy(() => loadProjectDetail().then(module => ({ default: module.ProjectDetail })));

function PrefetchProjectCases() {
  useEffect(() => {
    const prefetch = (event: Event) => {
      if (!(event.target instanceof Element) || !event.target.closest('a[href^="/work/"]')) return;
      void loadProjectDetail().catch(() => { projectDetailPromise = undefined; });
      document.removeEventListener('pointerover', prefetch);
      document.removeEventListener('focusin', prefetch);
      document.removeEventListener('touchstart', prefetch);
    };
    document.addEventListener('pointerover', prefetch, { passive: true });
    document.addEventListener('focusin', prefetch);
    document.addEventListener('touchstart', prefetch, { passive: true });
    return () => {
      document.removeEventListener('pointerover', prefetch);
      document.removeEventListener('focusin', prefetch);
      document.removeEventListener('touchstart', prefetch);
    };
  }, []);
  return null;
}

function useScrollRestoration(location: Location) {
  const navigationType = useNavigationType();
  const smoothScroll = useSmoothScroll();
  const previousLocation = useRef({ key: location.key, pathname: location.pathname });
  const pending = useRef<{ target: string | number; offset: number } | null>(null);
  const transitionFrame = useRef<number | null>(null);
  const initialized = useRef(false);

  const finishTransition = useCallback(() => {
    const next = pending.current;
    if (!next) return;
    pending.current = null;
    if (transitionFrame.current !== null) cancelAnimationFrame(transitionFrame.current);
    transitionFrame.current = requestAnimationFrame(() => {
      smoothScroll?.scrollTo(next.target, next.offset, true);
      if (typeof next.target === 'number') {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
      transitionFrame.current = null;
    });
  }, [smoothScroll]);

  useLayoutEffect(() => () => {
    if (transitionFrame.current !== null) cancelAnimationFrame(transitionFrame.current);
  }, []);

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const stored = Number(sessionStorage.getItem(`portfolio-scroll:${location.key}`) ?? 0);
    if (stored > 0) {
      const frame = requestAnimationFrame(() => smoothScroll?.scrollTo(stored, 0, true));
      return () => cancelAnimationFrame(frame);
    }
  }, [location.key, smoothScroll]);

  useLayoutEffect(() => {
    if (previousLocation.current.key === location.key) return;
    const routeChanged = previousLocation.current.pathname !== location.pathname;
    previousLocation.current = { key: location.key, pathname: location.pathname };
    const destination = navigationType === 'POP'
      ? Number(sessionStorage.getItem(`portfolio-scroll:${location.key}`) ?? 0)
      : 0;
    pending.current = { target: location.hash || destination, offset: location.hash && location.pathname !== '/brief' ? -64 : 0 };
    if (!routeChanged) {
      finishTransition();
    }
  }, [location.key, location.hash, location.pathname, navigationType, finishTransition]);
  useLayoutEffect(() => {
    const key = location.key;
    return () => sessionStorage.setItem(`portfolio-scroll:${key}`, String(window.scrollY));
  }, [location.key]);
  return finishTransition;
}

interface AppProps {
  /** Paper grain overlay across the whole canvas. */
  paperGrain?: boolean;
}

function PortfolioShell({ paperGrain }: Required<AppProps>) {
  const { open, closeBot } = useAskBot();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const finishTransition = useScrollRestoration(location);
  const transition = { duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    if (location.pathname === '/brief') closeBot();
  }, [location.pathname, closeBot]);

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={finishTransition}>
    {location.pathname === '/brief' ?
      <motion.div key="quick-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition} className={`min-h-screen bg-paper text-ink ${paperGrain ? 'canvas-grain' : ''}`}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <main id="main-content" tabIndex={-1}><Brief /></main>
      </motion.div> :
    <motion.div
      key="full-portfolio"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}
      className={`min-h-screen w-full bg-paper text-ink ${
        paperGrain ? "canvas-grain" : ""
      }`}
    >
      <div
        data-site-shell
        className={`min-h-screen transition-[margin] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'lg:mr-[clamp(390px,28vw,500px)]' : 'lg:mr-0'
        }`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PaperCursor />
        <ScrollProgress />
        <SelectionAskRoRo />
        <SiteNav />
          <AnimatePresence mode="wait" initial={false} onExitComplete={finishTransition}>
          <motion.main
            id="main-content"
            key={location.pathname}
            tabIndex={-1}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={transition}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<Suspense fallback={<p role="status" className="mx-auto max-w-[1100px] px-5 py-12 font-mono text-xs uppercase tracking-wider text-ink-soft">Opening case study…</p>}><ProjectDetail /></Suspense>} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/recognition" element={<Recognition />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
          </AnimatePresence>
        <SiteFooter />
      </div>
      <RoRo />
    </motion.div>}
    </AnimatePresence>
  );
}

export function App({ paperGrain = true }: AppProps) {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <MotionConfig reducedMotion="user">
          <AskBotProvider>
            <PrefetchProjectCases />
            <IntroLoader />
            <PortfolioShell paperGrain={paperGrain} />
          </AskBotProvider>
        </MotionConfig>
      </SmoothScroll>
    </BrowserRouter>
  );
}
