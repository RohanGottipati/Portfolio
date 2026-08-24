import { useEffect, useRef } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
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
import { ProjectDetail } from './pages/ProjectDetail';
import { Experience } from './pages/Experience';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

interface AppProps {
  /** Paper grain overlay across the whole canvas. */
  paperGrain?: boolean;
}

function PortfolioShell({ paperGrain }: Required<AppProps>) {
  const { open } = useAskBot();
  const location = useLocation();

  return (
    <div
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
        <IntroLoader />
        <PaperCursor />
        <ScrollProgress />
        <SelectionAskRoRo />
        <ScrollToTop />
        <SiteNav />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            id="main-content"
            key={location.pathname}
            tabIndex={-1}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
        <SiteFooter />
      </div>
      <RoRo />
    </div>
  );
}

export function App({ paperGrain = true }: AppProps) {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <AskBotProvider>
          <PortfolioShell paperGrain={paperGrain} />
        </AskBotProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}
