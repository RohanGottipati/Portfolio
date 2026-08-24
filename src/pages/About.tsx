import { Paper } from '../components/Paper';
import { profile } from '../data/profile';
import { Seo } from "../components/Seo";
import { PAGE_SEO } from "../data/seo.mjs";

export function About() {
  return (
    <>
      <Seo {...PAGE_SEO.about} />
      <section className="grid-paper border-b border-ink/15">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-tangerine">
              About
            </p>
            <h1
              aria-label="I like turning half-formed ideas into working software."
              className="mt-3 font-display text-[clamp(2.5rem,4.2vw,3.125rem)] leading-[1.02]">
              <span className="block md:whitespace-nowrap">
                I like turning half-formed{' '}
              </span>
              <span className="block md:whitespace-nowrap">
                ideas into working software.
              </span>
            </h1>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {profile.facts.map((fact) =>
              <li key={fact.label} className="border-t border-ink/20 pt-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {fact.label}
                  </p>
                  <p className="mt-1 font-display text-2xl leading-tight">
                    {fact.value}
                  </p>
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-7">
            <Paper rotate={-2} tape="single" className="bg-sky p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                Highlights
              </p>
              <ul className="mt-3 space-y-2.5">
                {profile.highlights.map((h) =>
                <li key={h} className="text-[15px] leading-snug">
                    {h}
                  </li>
                )}
              </ul>
            </Paper>
            <Paper rotate={1.8} className="p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                Learning
              </p>
              <ul className="mt-2 space-y-1">
                {profile.learning.map((l) =>
                <li key={l} className="font-hand text-2xl leading-tight">
                    {l}
                  </li>
                )}
              </ul>
            </Paper>
          </div>
        </div>
      </section>
    </>);

}
