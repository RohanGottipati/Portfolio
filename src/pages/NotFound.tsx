import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Seo } from "../components/Seo";

export function NotFound() {
  return (
    <section className="mx-auto max-w-[900px] px-5 py-24 text-center md:px-10">
      <Seo
        title="Page Not Found | Rohan Gottipati"
        description="I couldn't find the requested page."
        path={window.location.pathname}
        noIndex
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-tangerine">
        404 - misfiled
      </p>
      <h1 className="mt-3 font-display text-5xl">
        I couldn&apos;t find that page.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">
        I may have moved it, or the link may be out of date.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-2 hover:bg-tangerine"
      >
        <ArrowLeft size={13} aria-hidden="true" />
        Back home
      </Link>
    </section>
  );
}
