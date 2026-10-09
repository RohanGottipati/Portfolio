import React, { useEffect } from 'react';
import { markInitialRevealDone } from '../utils/revealState';

type PaperPageProps = {
  children: React.ReactNode;
};

export function PaperPage({ children }: PaperPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    markInitialRevealDone();
  }, []);

  return (
    <div className="paper min-h-screen w-full font-serif text-ink antialiased">
      <main className="mx-auto w-full max-w-[828px] px-6 pb-24 pt-8 md:pt-[7vh]">{children}</main>
    </div>);

}
