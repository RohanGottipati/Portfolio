import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useAskBot } from '../contexts/AskBotContext';

interface SelectionPrompt {
  text: string;
  left: number;
  top: number;
}

const IGNORED_TARGETS =
  'input, textarea, [contenteditable="true"], [data-selection-ask], [role="dialog"]';
const MAX_SELECTION_LENGTH = 600;

function isIgnoredNode(node: Node | null): boolean {
  const element = node instanceof Element ? node : node?.parentElement;
  return Boolean(element?.closest(IGNORED_TARGETS));
}

/** Offers a contextual RoRo question without interfering with native selection. */
export function SelectionAskRoRo() {
  const { askBot } = useAskBot();
  const [prompt, setPrompt] = useState<SelectionPrompt | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hide = () => setPrompt(null);
    let pendingFrame = 0;

    const showForSelection = (clientX?: number, clientY?: number) => {
      window.cancelAnimationFrame(pendingFrame);
      pendingFrame = window.requestAnimationFrame(() => {
        const selection = window.getSelection();
        const text = selection?.toString().replace(/\s+/g, ' ').trim();
        if (
          !selection ||
          selection.isCollapsed ||
          !text ||
          !selection.rangeCount ||
          isIgnoredNode(selection.anchorNode) ||
          isIgnoredNode(selection.focusNode)
        ) {
          hide();
          return;
        }

        const hasPointerPosition =
          typeof clientX === 'number' && typeof clientY === 'number';
        const rect = hasPointerPosition
          ? null
          : selection
            .getRangeAt(selection.rangeCount - 1)
            .getBoundingClientRect();
        const anchorX = hasPointerPosition
          ? clientX
          : rect && rect.width > 0
            ? rect.left + rect.width / 2
            : window.innerWidth / 2;
        const anchorY = hasPointerPosition
          ? clientY
          : rect && rect.height > 0
            ? rect.top
            : 60;
        const left = Math.min(
          Math.max(76, anchorX),
          Math.max(76, window.innerWidth - 76)
        );
        const top = Math.min(
          Math.max(12, anchorY - 48),
          Math.max(12, window.innerHeight - 52)
        );

        setPrompt({
          text: text.slice(0, MAX_SELECTION_LENGTH),
          left,
          top
        });
      });
    };

    const onDoubleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(IGNORED_TARGETS)) return;

      showForSelection(event.clientX, event.clientY);
    };

    const onPointerUp = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(IGNORED_TARGETS)) return;

      showForSelection(event.clientX, event.clientY);
    };

    const onKeyUp = () => {
      showForSelection();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (popupRef.current?.contains(event.target as Node)) return;
      hide();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hide();
    };

    document.addEventListener('dblclick', onDoubleClick);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('scroll', hide, { passive: true });
    window.addEventListener('resize', hide);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(pendingFrame);
      document.removeEventListener('dblclick', onDoubleClick);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('scroll', hide);
      window.removeEventListener('resize', hide);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const askAboutSelection = () => {
    if (!prompt) return;

    askBot('Tell me about this selection.', prompt.text);
    setPrompt(null);
  };

  return (
    <AnimatePresence>
      {prompt &&
        <motion.div
          ref={popupRef}
          data-selection-ask
          initial={{ opacity: 0, y: 6, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.94 }}
          transition={{ duration: 0.16 }}
          style={{ left: prompt.left, top: prompt.top }}
          className="fixed z-[70] -translate-x-1/2">
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={askAboutSelection}
            aria-label={`Ask RoRo about ${prompt.text}`}
            className="relative inline-flex items-center gap-2 whitespace-nowrap border border-ink/20 bg-paper-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink shadow-paper-lg transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-tangerine hover:bg-lime/35">
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-1/2 h-3 w-12 -translate-x-1/2 -rotate-2 border border-ink/10 bg-peach/75" />
            <Sparkle size={12} className="text-tangerine" aria-hidden="true" />
            Ask RoRo
          </button>
        </motion.div>
      }
    </AnimatePresence>
  );
}
