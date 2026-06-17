import { motion } from "framer-motion";

interface SplashPageProps {
  onOpen: () => void;
}

export function SplashPage({ onOpen }: SplashPageProps) {
  return (
    <motion.main
      className="app-shell splash-shell"
      aria-label="Portfolio splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <motion.button
        type="button"
        className="splash-launch"
        aria-label="Enter"
        onClick={onOpen}
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="splash-icon" aria-hidden="true">
          <span className="splash-prompt">&gt;_</span>
        </span>
        <span className="splash-title">Enter</span>
      </motion.button>
    </motion.main>
  );
}
