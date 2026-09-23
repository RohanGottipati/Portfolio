import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

type SmoothScrollContextValue = {
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -getHeaderOffset() });
      window.history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = {
    scrollTo: (target: string | HTMLElement | number, offset = -getHeaderOffset()) => {
      if (lenisRef.current) lenisRef.current.scrollTo(target, { offset });
      else if (typeof target === "number") window.scrollTo({ top: target, behavior: "auto" });
      else document.querySelector<HTMLElement>(typeof target === "string" ? target : "")?.scrollIntoView({ block: "start" });
    },
  };

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

function getHeaderOffset() {
  return document.querySelector<HTMLElement>("header")?.getBoundingClientRect().height ?? 64;
}
