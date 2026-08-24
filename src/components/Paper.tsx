import React from 'react';

interface TapeProps {
  className?: string;
  rotate?: number;
}

export function Tape({ className = '', rotate = -8 }: TapeProps) {
  return (
    <span
      aria-hidden="true"
      className={`tape ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }} />);


}

interface PaperProps {
  children: React.ReactNode;
  rotate?: number;
  className?: string;
  tape?: 'none' | 'single' | 'double';
  as?: 'div' | 'article' | 'section' | 'li';
}

/**
 * A sheet of paper: subtle border, hard offset shadow, optional tape strips.
 */
export function Paper({
  children,
  rotate = 0,
  className = '',
  tape = 'none',
  as: Tag = 'div'
}: PaperProps) {
  return (
    <Tag
      className={`relative border border-ink/15 bg-paper-2 shadow-paper ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}>
      
      {tape !== 'none' && <Tape className="-top-3 left-6" rotate={-7} />}
      {tape === 'double' && <Tape className="-bottom-3 right-8" rotate={5} />}
      {children}
    </Tag>);

}

interface PunchHolesProps {
  count?: number;
}

export function PunchHoles({ count = 4 }: PunchHolesProps) {
  return (
    <div aria-hidden="true" className="flex gap-10">
      {Array.from({ length: count }).map((_, i) =>
      <span
        key={i}
        className="h-2.5 w-2.5 bg-paper/90 shadow-[inset_0_1px_2px_rgba(23,20,15,0.35)]" />

      )}
    </div>);

}
