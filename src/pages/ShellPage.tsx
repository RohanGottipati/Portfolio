import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type KeyboardEvent, type MutableRefObject, type RefObject } from "react";
import type { LucideIcon } from "lucide-react";

import { CommandMenu } from "@/components/terminal/CommandMenu";
import { TerminalDashboard } from "@/components/terminal/TerminalDashboard";
import { TerminalHistory } from "@/components/terminal/TerminalHistory";
import { TerminalInput } from "@/components/terminal/TerminalInput";
import { TerminalModal } from "@/components/terminal/TerminalModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ModalContent, SessionLogEntry, SuggestionItem } from "@/types/terminal";

interface WindowAction {
  label: string;
  tooltip: string;
  href: string;
  Icon: LucideIcon;
  openInNewTab: boolean;
}

interface ShellPageProps {
  activeModal: ModalContent | null;
  commandMenuRef: RefObject<HTMLDivElement>;
  currentLocation: string;
  hasBlockingModal: boolean;
  historyRef: RefObject<HTMLDivElement>;
  input: string;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  isIdleShell: boolean;
  isMenuOpen: boolean;
  phase: "ready" | "exiting";
  panelRef: RefObject<HTMLElement>;
  selectedSuggestionIndex: number;
  sessionLog: SessionLogEntry[];
  suggestions: SuggestionItem[];
  windowActions: readonly WindowAction[];
  onCloseModal: () => void;
  onHome: () => void;
  onInputChange: (value: string) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onModalExitComplete: () => void;
  onPanelArrowNavigation: (direction: "up" | "down") => void;
  onRunCommand: (rawInput: string, options?: { urlMode?: "push" | "replace" | "none" }) => void;
  onSuggestionSelect: (item: SuggestionItem, shouldSubmit: boolean) => void;
}

export function ShellPage({
  activeModal,
  commandMenuRef,
  currentLocation,
  hasBlockingModal,
  historyRef,
  input,
  inputRef,
  isIdleShell,
  isMenuOpen,
  phase,
  panelRef,
  selectedSuggestionIndex,
  sessionLog,
  suggestions,
  windowActions,
  onCloseModal,
  onHome,
  onInputChange,
  onInputKeyDown,
  onModalExitComplete,
  onPanelArrowNavigation,
  onRunCommand,
  onSuggestionSelect,
}: ShellPageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 640);
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="app-shell">
      <motion.div
        className="app-frame"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <section
          ref={panelRef}
          className={cn("terminal-panel", isIdleShell && "is-idle")}
          onKeyDownCapture={(event) => {
            if (
              phase !== "ready" ||
              hasBlockingModal ||
              isMenuOpen ||
              event.altKey ||
              event.ctrlKey ||
              event.metaKey ||
              (event.key !== "ArrowUp" && event.key !== "ArrowDown")
            ) {
              return;
            }

            const target = event.target as HTMLElement | null;
            if (!target || target.classList.contains("terminal-input")) {
              return;
            }

            if (!panelRef.current?.contains(target)) {
              return;
            }

            event.preventDefault();
            onPanelArrowNavigation(event.key === "ArrowDown" ? "down" : "up");
          }}
        >
          <div className="terminal-window-chrome" role="group" aria-label="Terminal window">
            <div className="terminal-window-dots" aria-label="Window controls">
              <button
                type="button"
                className="terminal-window-dot-button terminal-window-dot terminal-window-dot-close"
                aria-label="Return home"
                onClick={onHome}
              />
              <span
                className="terminal-window-dot terminal-window-dot-minimize"
                aria-hidden="true"
              />
              <span className="terminal-window-dot terminal-window-dot-zoom" aria-hidden="true" />
            </div>
            <span className="terminal-window-title">
              rohangottipati — -zsh — 80x24
            </span>
            <div className="terminal-window-actions" aria-label="Contact shortcuts">
              {windowActions.map(({ label, tooltip, href, Icon, openInNewTab }) => (
                <Button
                  key={label}
                  variant="terminalIcon"
                  size="icon"
                  asChild
                  className="terminal-window-action"
                >
                  <a
                    href={href}
                    aria-label={label}
                    tabIndex={0}
                    {...(openInNewTab ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <Icon size={16} aria-hidden="true" />
                <span className="terminal-window-action-label" aria-hidden="true">
                  {tooltip}
                </span>
              </a>
            </Button>
          ))}
        </div>
          </div>

          <div ref={historyRef} className={cn("terminal-history", isIdleShell && "is-idle")}>
            <TerminalDashboard onRunCommand={onRunCommand} currentLocation={currentLocation} />
            <TerminalHistory history={sessionLog} />
          </div>

          <div className="terminal-input-area">
            <TerminalInput
              value={input}
              inputRef={inputRef}
              disabled={phase === "exiting"}
              placeholder={isMobile ? 'Type "/"' : "Type / to explore commands"}
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
            />
          </div>
        </section>

        <AnimatePresence>
          {isMenuOpen ? (
            <CommandMenu
              menuRef={commandMenuRef}
              suggestions={suggestions}
              selectedIndex={selectedSuggestionIndex}
              onSelect={(item) => onSuggestionSelect(item, item.submitOnSelect ?? false)}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence onExitComplete={onModalExitComplete}>
        {activeModal ? (
          <TerminalModal
            content={activeModal}
            dismissible={phase !== "exiting"}
            onClose={onCloseModal}
            onRunCommand={onRunCommand}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
