import { motion } from "framer-motion";
import type { KeyboardEvent, MutableRefObject } from "react";

import { TerminalInput } from "@/components/terminal/TerminalInput";

interface StartupPageProps {
  input: string;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  startupError: string | null;
  onInputChange: (value: string) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export function StartupPage({
  input,
  inputRef,
  startupError,
  onInputChange,
  onInputKeyDown,
}: StartupPageProps) {
  return (
    <motion.div
      className="app-shell startup-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="startup-shell-inner">
        <TerminalInput
          value={input}
          inputRef={inputRef}
          mode="startup"
          placeholder="Type rohan, then press Enter"
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />

        {startupError ? <p className="startup-error">{startupError}</p> : null}
      </div>
    </motion.div>
  );
}
