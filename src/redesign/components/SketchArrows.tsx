import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Side = 'left' | 'right' | 'top' | 'bottom';

export type ArrowSpec = {
  id: string;
  from: string;
  fromSide: Side;
  to: string;
  toSide: Side;
  /** Where along a top/bottom edge the arrow lands: centered or near the end of the text. */
  toAlign?: 'center' | 'end';
  /** Override the direction the line comes in from (pointing away from the target). */
  approach?: {x: number;y: number;};
  targetOffset?: {x?: number;y?: number;};
  delay?: number;
};

type SketchArrowsProps = {
  containerRef: React.RefObject<HTMLElement>;
  arrows: ArrowSpec[];
};

type DrawnArrow = {
  id: string;
  line: string;
  head: string;
  delay: number;
};

type Point = {x: number;y: number;};

const START_DELAY_MS = 650;
const GAP = 8;
const HEAD_LENGTH = 11;
const HEAD_ANGLE = Math.PI / 6;
const OUTWARD: Record<Side, Point> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  top: { x: 0, y: -1 },
  bottom: { x: 0, y: 1 }
};

export function SketchArrows({ containerRef, arrows }: SketchArrowsProps) {
  const [drawn, setDrawn] = useState<DrawnArrow[]>([]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!window.matchMedia('(min-width: 768px)').matches) {
      setDrawn([]);
      return;
    }
    const origin = container.getBoundingClientRect();
    const next: DrawnArrow[] = [];

    arrows.forEach((arrow) => {
      const fromEl = container.querySelector(`[data-anchor="${arrow.from}"]`);
      const toEl = container.querySelector(`[data-anchor="${arrow.to}"]`);
      if (!fromEl || !toEl) return;

      const start = anchorPoint(fromEl, arrow.fromSide, origin, 'center');
      const target = anchorPoint(toEl, arrow.toSide, origin, arrow.toAlign ?? 'center');
      const end = {
        x: target.x + (arrow.targetOffset?.x ?? 0),
        y: target.y + (arrow.targetOffset?.y ?? 0)
      };
      const dist = Math.hypot(end.x - start.x, end.y - start.y);
      const k = Math.min(Math.max(dist * 0.45, 30), 220);
      const out = OUTWARD[arrow.fromSide];
      const into = arrow.approach ? normalize(arrow.approach) : OUTWARD[arrow.toSide];
      const c1 = { x: start.x + out.x * k, y: start.y + out.y * k };
      const c2 = { x: end.x + into.x * k, y: end.y + into.y * k };

      next.push({
        id: arrow.id,
        line: `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
        head: arrowHead(end, into),
        delay: arrow.delay ?? 0
      });
    });

    setDrawn(next);
  }, [arrows, containerRef]);

  useEffect(() => {
    // Wait for the page's reveal animation to settle so anchors are measured at rest.
    let ready = false;
    const run = () => {
      if (ready) measure();
    };
    const timer = window.setTimeout(() => {
      ready = true;
      measure();
    }, START_DELAY_MS);
    const container = containerRef.current;
    const observer = new ResizeObserver(run);
    if (container) observer.observe(container);
    window.addEventListener('resize', run);
    document.fonts?.ready.then(run);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('resize', run);
    };
  }, [measure, containerRef]);

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block">

      {drawn.map((arrow) =>
      <g key={arrow.id} fill="none" stroke="#8a867e" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
          <motion.path
          d={arrow.line}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: arrow.delay, ease: [0.65, 0, 0.35, 1] }} />

          <motion.path
          d={arrow.head}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.85 + arrow.delay }} />

        </g>
      )}
    </svg>);

}

function normalize(p: Point): Point {
  const len = Math.hypot(p.x, p.y) || 1;
  return { x: p.x / len, y: p.y / len };
}

function anchorPoint(el: Element, side: Side, origin: DOMRect, align: 'center' | 'end'): Point {
  // Use the actual line box for wrapped inline text: first line for top/left, last line for bottom/right.
  const lines = el.getClientRects();
  const rect =
  lines.length === 0 ?
  el.getBoundingClientRect() :
  side === 'bottom' || side === 'right' ?
  lines[lines.length - 1] :
  lines[0];
  const left = rect.left - origin.left;
  const top = rect.top - origin.top;
  const cx = align === 'end' ? left + rect.width - Math.min(28, rect.width / 3) : left + rect.width / 2;
  const cy = top + rect.height / 2;
  switch (side) {
    case 'left':
      return { x: left - GAP, y: cy };
    case 'right':
      return { x: left + rect.width + GAP, y: cy };
    case 'top':
      return { x: cx, y: top - GAP };
    case 'bottom':
      return { x: cx, y: top + rect.height + GAP / 2 };
  }
}

function arrowHead(tip: Point, backward: Point): string {
  const wing = (angle: number): Point => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: tip.x + (backward.x * cos - backward.y * sin) * HEAD_LENGTH,
      y: tip.y + (backward.x * sin + backward.y * cos) * HEAD_LENGTH
    };
  };
  const a = wing(HEAD_ANGLE);
  const b = wing(-HEAD_ANGLE);
  return `M ${a.x} ${a.y} L ${tip.x} ${tip.y} L ${b.x} ${b.y}`;
}
