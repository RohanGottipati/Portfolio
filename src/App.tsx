import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Home } from './redesign/pages/Home';
import { Work } from './redesign/pages/Work';
import { Projects } from './redesign/pages/Projects';
import { DEFAULT_SOCIAL_IMAGE, PAGE_SEO, SITE_URL } from './data/seo.mjs';

const activePages = [PAGE_SEO.home, PAGE_SEO.work, PAGE_SEO.projects];

function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = activePages.find((page) => page.path === pathname) ?? PAGE_SEO.home;
    const url = `${SITE_URL}${meta.path}`;
    const image = `${SITE_URL}${'image' in meta ? meta.image : DEFAULT_SOCIAL_IMAGE}`;
    document.title = meta.title;
    document.querySelector<HTMLMetaElement>('#meta-description')?.setAttribute('content', meta.description);
    document.querySelector<HTMLMetaElement>('#og-title')?.setAttribute('content', meta.title);
    document.querySelector<HTMLMetaElement>('#og-description')?.setAttribute('content', meta.description);
    document.querySelector<HTMLMetaElement>('#og-url')?.setAttribute('content', url);
    document.querySelector<HTMLMetaElement>('#og-image')?.setAttribute('content', image);
    document.querySelector<HTMLMetaElement>('#og-image-alt')?.setAttribute('content', meta.imageAlt);
    document.querySelector<HTMLMetaElement>('#twitter-title')?.setAttribute('content', meta.title);
    document.querySelector<HTMLMetaElement>('#twitter-description')?.setAttribute('content', meta.description);
    document.querySelector<HTMLMetaElement>('#twitter-image')?.setAttribute('content', image);
    document.querySelector<HTMLLinkElement>('#canonical-link')?.setAttribute('href', url);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <RouteMeta />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </MotionConfig>
  );
}
