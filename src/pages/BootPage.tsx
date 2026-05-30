import { motion } from "framer-motion";

interface BootPageProps {
  bootLines: string[];
}

export function BootPage({ bootLines }: BootPageProps) {
  return (
    <motion.div
      className="app-shell startup-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="boot-sequence" aria-live="polite">
        {bootLines.map((line, index) => (
          <motion.p
            key={`${line}-${index}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="boot-line"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
