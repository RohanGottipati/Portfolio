import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { subscribeToSmoothScroll } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export function useCaseStudyMotion(root: RefObject<HTMLElement>, active: boolean) {
  useEffect(() => {
    if (!active || !root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-case-step]').forEach((element, index) => {
        gsap.fromTo(element, { opacity: .72, y: 12 }, {
          opacity: 1, y: 0, duration: .55, delay: index * .08, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-case-media]').forEach(element => {
        gsap.fromTo(element, {scale: 1.035}, {scale: 1, duration: .8, ease: 'power3.out', scrollTrigger: {trigger: element, start: 'top 90%', once: true}});
      });
    }, root);
    const unsubscribe = subscribeToSmoothScroll(ScrollTrigger.update);
    return () => { unsubscribe(); context.revert(); };
  }, [root, active]);
}
