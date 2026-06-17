import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface LandingLink {
  label: string;
  href: string;
  openInNewTab: boolean;
}

interface LandingPageProps {
  introItems: readonly string[];
  links: readonly LandingLink[];
  isLaunching: boolean;
  onHome: () => void;
  onLaunch: () => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

function formatTerminalDate(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${DAYS[date.getDay()]} ${MONTHS[date.getMonth()]} ${date.getDate()} ${hours}:${minutes}:${seconds}`;
}

export function LandingPage({
  introItems,
  links,
  isLaunching,
  onHome,
  onLaunch,
}: LandingPageProps) {
  const [openedAt] = useState(() => new Date());
  const [landingCommand, setLandingCommand] = useState("");
  const commandInputRef = useRef<HTMLInputElement | null>(null);

  function submitLandingCommand() {
    if (landingCommand.trim().toLowerCase() === "rohan") {
      onLaunch();
    }
  }

  function handleLandingCommandKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    submitLandingCommand();
  }

  useEffect(() => {
    if (isLaunching) {
      return;
    }

    commandInputRef.current?.focus();
  }, [isLaunching]);

  return (
    <motion.div
      className={`app-shell landing-shell${isLaunching ? " is-launching" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      <main className="landing-main" aria-label="Portfolio launch">
        <motion.div
          className="landing-terminal-window"
          initial={{ opacity: 0, y: 10 }}
          animate={isLaunching ? { opacity: 1, y: -6, scale: 0.995 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: isLaunching ? 0.64 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="landing-terminal-chrome" role="group" aria-label="Landing terminal window">
            <span className="landing-window-dots">
              <button
                type="button"
                className="landing-window-dot-button landing-window-dot landing-window-dot-close"
                aria-label="Return to splash"
                onClick={onHome}
              />
              <span className="landing-window-dot landing-window-dot-minimize" />
              <span className="landing-window-dot landing-window-dot-zoom" />
            </span>
            <span className="landing-window-title" aria-hidden="true">
              rohangottipati — -zsh — 80x24
            </span>
            <span aria-hidden="true" />
          </div>

          <div className="landing-terminal-body">
            <p className="landing-terminal-line">
              Last login: {formatTerminalDate(openedAt)} on console
            </p>
            <p className="landing-terminal-line">
              <span className="landing-terminal-prompt">
                rohangottipati@rohan.dev ~ %
              </span>{" "}
              rohan's portfolio
            </p>

            <div className="landing-content">
              <ul className="landing-intro" aria-label="Introduction">
                {introItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <nav
              className="landing-links is-complete"
              aria-label="Primary links"
            >
              <span className="landing-links-prefix">links:</span>
              {links.map(({ label, href, openInNewTab }) => (
                <a
                  key={label}
                  href={href}
                  {...(openInNewTab ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="landing-launch-row is-ready">
              <span className="landing-terminal-prompt" aria-hidden="true">
                rohangottipati@rohan.dev ~ %
              </span>
              <div className="landing-command-field">
                <span className="landing-command-display" aria-hidden="true">
                  {landingCommand ? (
                    <>
                      {landingCommand}
                      {!isLaunching && <span className="landing-command-cursor" />}
                    </>
                  ) : (
                    <>
                      {!isLaunching && <span className="landing-command-cursor" />}
                      <span className="landing-command-hint">Hint: Type "rohan"</span>
                    </>
                  )}
                </span>
                <input
                  ref={commandInputRef}
                  value={landingCommand}
                  className="landing-command-input"
                  aria-label="Landing terminal command input"
                  placeholder='Hint: Type "rohan"'
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  disabled={isLaunching}
                  onChange={(event) => setLandingCommand(event.target.value)}
                  onKeyDown={handleLandingCommandKeyDown}
                />
              </div>
            </div>

            {isLaunching ? (
              <div className="landing-launch-sequence" aria-live="polite">
                <p>command accepted: rohan</p>
                <p>loading portfolio shell</p>
                <p>mounting interactive workspace</p>
                <div className="landing-launch-progress" aria-hidden="true">
                  <span />
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
