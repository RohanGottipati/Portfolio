import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

interface LandingLink {
  label: string;
  href: string;
  openInNewTab: boolean;
}

interface LandingPageProps {
  name: string;
  introItems: readonly string[];
  links: readonly LandingLink[];
  isLaunching: boolean;
  onLaunch: () => void;
}

export function LandingPage({
  name,
  introItems,
  links,
  isLaunching,
  onLaunch,
}: LandingPageProps) {
  return (
    <motion.div
      className={`app-shell landing-shell${isLaunching ? " is-launching" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      <main className="landing-main" aria-label="Portfolio launch">
        <motion.div
          className="landing-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="landing-name">{name}</h1>
          <ul className="landing-intro" aria-label="Introduction">
            {introItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </main>

      <nav className="landing-links" aria-label="Primary links">
        {links.map(({ label, href, openInNewTab }) => (
          <a
            key={label}
            href={href}
            {...(openInNewTab ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {label}
          </a>
        ))}
        <span className="landing-code-callout">
          <button
            type="button"
            className="landing-code-button"
            aria-label="Open terminal portfolio"
            aria-busy={isLaunching}
            disabled={isLaunching}
            onClick={onLaunch}
          >
            <Code2 size={18} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <span className="landing-code-arrow" aria-hidden="true">
            ↑
          </span>
        </span>
      </nav>
    </motion.div>
  );
}
