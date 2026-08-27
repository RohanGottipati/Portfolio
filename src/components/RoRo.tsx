import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUp,
  CornerDownRight,
  Info,
  RotateCcw,
  Sparkle,
  X
} from 'lucide-react';
import { useAskBot } from '../contexts/AskBotContext';
import { askRoRo, suggestedPrompts, type BotLink } from '../utils/askRoRo';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  selection?: string;
  links?: BotLink[];
  suggestions?: string[];
}

interface RoroApiResponse {
  answer?: string;
  error?: string;
}

function answerChunks(text: string): string[] {
  const words = text.match(/\S+\s*/g) ?? [text];
  const wordsPerChunk = Math.max(1, Math.ceil(words.length / 72));
  const chunks: string[] = [];

  for (let index = 0; index < words.length; index += wordsPerChunk) {
    chunks.push(words.slice(index, index + wordsPerChunk).join(''));
  }

  return chunks;
}

function AnimatedAnswerText({ text }: {text: string;}) {
  const prefersReducedMotion = useReducedMotion();
  const chunks = answerChunks(text);
  const revealWindow = Math.min(1.05, Math.max(0.28, chunks.length * 0.022));
  const stagger = chunks.length > 1 ? revealWindow / (chunks.length - 1) : 0;

  return (
    <p className="text-[16px] leading-relaxed text-ink sm:text-[17px]">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="whitespace-pre-wrap">
        {chunks.map((chunk, index) =>
        prefersReducedMotion ?
        <span key={`${index}-${chunk}`}>{chunk}</span> :
        <motion.span
          key={`${index}-${chunk}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.16,
            delay: index * stagger,
            ease: 'easeOut'
          }}>
            {chunk}
          </motion.span>
        )}
      </span>
    </p>
  );
}

function followUps(question: string, hasSelection: boolean): string[] {
  if (hasSelection) {
    return [
      'What is the most relevant project here?',
      'How does this connect to your experience?',
      'What did you use to build it?'
    ];
  }

  const query = question.toLowerCase();
  if (/project|built|build|hackathon|award|win/.test(query)) {
    return [
      'Which project are you most proud of?',
      'What have you won at hackathons?',
      'What tech do you use most?'
    ];
  }
  if (/experience|role|intern|work|job/.test(query)) {
    return [
      'What are you working on at Intact?',
      'What did you build at DOUBL?',
      'What did you learn at OneChart?'
    ];
  }
  if (/skill|stack|tech|language/.test(query)) {
    return [
      'Which stack do you reach for most?',
      'How do you use AI in your projects?',
      'Which cloud platforms have you used?'
    ];
  }

  return [
    'What are you working on now?',
    'Which projects should I explore?',
    'What experience do you have?'
  ];
}

export function RoRo() {
  const {
    open,
    pendingQuestion,
    consumePendingQuestion,
    closeBot
  } = useAskBot();
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState('');
  const [thinking, setThinking] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const latestAnswerRef = useRef<HTMLDivElement>(null);
  const latestAnswerBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const idRef = useRef(1);

  const send = useCallback(
    async (raw: string, selection?: string) => {
      const question = raw.trim();
      const selectedText = selection?.trim();
      if (!question || thinking) return;

      const selectionPreview = selectedText && selectedText.length > 220
        ? `${selectedText.slice(0, 217).trimEnd()}...`
        : selectedText;
      const userMessage: Message = {
        id: idRef.current++,
        from: 'user',
        text: selectionPreview
          ? `Selected from page: "${selectionPreview}"`
          : question,
        selection: selectionPreview || undefined
      };
      const history = messages.slice(-6).map((message) => ({
        role: message.from === 'bot' ? 'assistant' : 'user',
        text: message.text
      }));
      const fallback = askRoRo(`${question} ${selectedText ?? ''}`);

      setMessages((previous) => [...previous, userMessage]);
      setValue('');
      setThinking(true);

      const controller = new AbortController();
      requestRef.current = controller;

      try {
        const response = await fetch('/api/roro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question,
            selection: selectedText,
            history
          }),
          signal: controller.signal
        });
        const data = (await response.json()) as RoroApiResponse;
        if (!response.ok || !data.answer) {
          throw new Error(data.error || 'RoRo could not answer.');
        }
        const answer = data.answer;

        setMessages((previous) => [
          ...previous,
          {
            id: idRef.current++,
            from: 'bot',
            text: answer,
            links: fallback.links,
            suggestions: followUps(question, Boolean(selectedText))
          }
        ]);
      } catch {
        if (controller.signal.aborted) return;

        setMessages((previous) => [
          ...previous,
          {
            id: idRef.current++,
            from: 'bot',
            text: fallback.text,
            links: fallback.links,
            suggestions: followUps(question, Boolean(selectedText))
          }
        ]);
      } finally {
        if (!controller.signal.aborted) setThinking(false);
        if (requestRef.current === controller) requestRef.current = null;
      }
    },
    [messages, thinking]
  );

  const reset = useCallback(() => {
    requestRef.current?.abort();
    requestRef.current = null;
    setMessages([]);
    setThinking(false);
    setValue('');
    setShowInfo(false);
    window.requestAnimationFrame(() =>
      inputRef.current?.focus({ preventScroll: true })
    );
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() =>
      inputRef.current?.focus({ preventScroll: true })
    );

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeBot();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      if (!isDesktop) document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [closeBot, open]);

  useEffect(() => {
    if (!open || !pendingQuestion || thinking) return;

    const pending = pendingQuestion;
    consumePendingQuestion();
    void send(pending.question, pending.selection);
  }, [consumePendingQuestion, open, pendingQuestion, send, thinking]);

  useEffect(() => {
    if (!open) return;

    const frame = window.requestAnimationFrame(() => {
      const scrollRegion = scrollRef.current;
      if (!scrollRegion) return;

      const latestMessage = messages[messages.length - 1];
      const latestAnswer = latestAnswerRef.current;
      const latestAnswerBody = latestAnswerBodyRef.current;
      const shouldAnchorAnswer =
        latestMessage?.from === 'bot' &&
        latestAnswer &&
        latestAnswerBody &&
        latestAnswerBody.scrollHeight > scrollRegion.clientHeight * 0.5;

      if (shouldAnchorAnswer) {
        const scrollRect = scrollRegion.getBoundingClientRect();
        const answerRect = latestAnswer.getBoundingClientRect();
        const answerTop =
          scrollRegion.scrollTop + answerRect.top - scrollRect.top - 24;

        scrollRegion.scrollTo({
          top: Math.max(0, answerTop),
          behavior: 'smooth'
        });
        return;
      }

      scrollRegion.scrollTo({
        top: scrollRegion.scrollHeight,
        behavior: 'smooth'
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, open, thinking]);

  let latestBotId: number | undefined;
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].from === 'bot') {
      latestBotId = messages[index].id;
      break;
    }
  }

  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.button
            type="button"
            aria-label="Close RoRo overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBot}
            className="fixed inset-0 z-[55] bg-ink/15 backdrop-blur-[1px] lg:hidden" />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="RoRo portfolio guide"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            data-roro-panel
            className="fixed inset-y-0 right-0 z-[60] flex w-full border-l border-ink/20 bg-paper shadow-paper-lg sm:w-[390px] lg:w-[clamp(390px,28vw,500px)]">
            <div className="flex min-w-0 flex-1 flex-col">
              <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink/15 bg-paper-2 px-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rotate-6 bg-tangerine"
                    aria-hidden="true" />
                  <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">
                    RoRo
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowInfo((visible) => !visible)}
                    aria-label="About RoRo"
                    aria-expanded={showInfo}
                    className="ml-0.5 inline-flex h-7 w-7 items-center justify-center border border-transparent text-ink-soft transition-colors hover:border-ink/15 hover:bg-paper hover:text-tangerine">
                    <Info size={16} aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Reset RoRo"
                    className="inline-flex h-9 w-9 items-center justify-center border border-transparent text-ink-soft transition-colors hover:border-ink/15 hover:bg-paper hover:text-tangerine">
                    <RotateCcw size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={closeBot}
                    aria-label="Close RoRo"
                    className="inline-flex h-9 w-9 items-center justify-center border border-transparent text-ink-soft transition-colors hover:border-ink/15 hover:bg-paper hover:text-tangerine">
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
              </header>

              <AnimatePresence>
                {showInfo &&
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-b border-ink/15 bg-lime/35">
                    <div className="flex gap-3 px-5 py-3.5 sm:px-8">
                      <span className="mt-1 h-2 w-2 shrink-0 bg-tangerine" aria-hidden="true" />
                      <p className="text-[13px] leading-relaxed text-ink-soft">
                        I answer only from this portfolio&apos;s projects, experience,
                        education, and contact details. Type a question, or
                        highlight page text and ask me about it.
                      </p>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>

              <motion.div
                ref={scrollRef}
                layoutScroll
                data-roro-scroll-region
                className="grid-paper flex-1 overflow-y-auto overscroll-contain px-5 py-7 sm:px-8 sm:py-10"
                aria-live="polite"
                aria-busy={thinking}>
                {messages.length === 0 && !thinking ?
                <div className="flex min-h-full flex-col justify-end pb-4 sm:pb-8">
                    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-tangerine">
                      <span className="h-2 w-2 bg-tangerine" aria-hidden="true" />
                      Portfolio assistant
                    </p>
                    <h2 className="font-display text-4xl leading-none sm:text-5xl">
                      Ask me anything.
                    </h2>
                    <div className="relative mt-5 border border-ink/15 bg-peach/55 px-4 py-4 shadow-paper">
                      <p className="max-w-sm text-[14px] leading-relaxed text-ink-soft sm:text-[15px]">
                        I&apos;m RoRo, Rohan&apos;s portfolio AI. Ask about his work,
                        projects, or highlighted text.
                      </p>
                      <span
                        className="absolute bottom-0 right-0 h-0 w-0 border-b-[14px] border-l-[14px] border-b-tangerine border-l-transparent"
                        aria-hidden="true" />
                    </div>
                    <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                      Start with a question
                    </p>
                    <ul className="mt-2 border-t border-ink/15">
                      {suggestedPrompts.slice(0, 3).map((prompt) =>
                    <li key={prompt} className="border-b border-dashed border-ink/15">
                          <button
                        type="button"
                        onClick={() => void send(prompt)}
                        className="group flex w-full items-start gap-3 py-3.5 text-left text-[15px] leading-snug text-ink-soft transition-colors hover:text-ink sm:text-base">
                            <CornerDownRight
                          size={17}
                          className="mt-0.5 shrink-0 transition-transform group-hover:translate-x-1"
                          aria-hidden="true" />
                            {prompt}
                          </button>
                        </li>
                    )}
                    </ul>
                  </div> :

                <div className="space-y-9">
                  <AnimatePresence initial={false} mode="popLayout">
                    {messages.map((message) =>
                  <motion.div
                    key={message.id}
                    layout="position"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
                        {message.from === 'user' ?
                    <div className="flex justify-end">
                            {message.selection ?
                      <div className="relative max-w-[88%] border border-ink/20 bg-paper-2 px-5 py-4 shadow-paper">
                                <span
                          aria-hidden="true"
                          className="absolute -top-1.5 right-5 h-3 w-12 rotate-2 border border-ink/10 bg-peach/75" />
                                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-tangerine">
                                  Selected from page
                                </p>
                                <p className="mt-2 text-[15px] leading-snug text-ink sm:text-base">
                                  “{message.selection}”
                                </p>
                              </div> :
                      <p className="max-w-[88%] border border-ink/15 bg-peach/45 px-5 py-4 text-[15px] leading-snug shadow-paper sm:text-base">
                                {message.text}
                              </p>
                      }
                          </div> :
                    <div
                      ref={message.id === latestBotId ? latestAnswerRef : undefined}
                      data-roro-answer={message.id === latestBotId ? 'latest' : undefined}
                      className="max-w-[42rem] scroll-mt-6">
                            <p className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-tangerine">
                              <span className="h-2 w-2 bg-tangerine" aria-hidden="true" />
                              RoRo
                            </p>
                            <div
                              ref={message.id === latestBotId ? latestAnswerBodyRef : undefined}
                              data-roro-answer-body={message.id === latestBotId ? 'latest' : undefined}
                              className="border-l-2 border-tangerine pl-4">
                              <AnimatedAnswerText text={message.text} />
                            </div>
                            {message.links && message.links.length > 0 &&
                      <ul className="mt-5 flex flex-wrap gap-2">
                                {message.links.map((link) =>
                        link.to ?
                        <li key={link.label}>
                                    <Link
                            to={link.to}
                            onClick={closeBot}
                            className="inline-block border-b border-ink/35 pb-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft hover:border-tangerine hover:text-tangerine">
                                      {link.label}
                                    </Link>
                                  </li> :
                        <li key={link.label}>
                                    <a
                            href={link.href}
                            target={link.href?.startsWith('http') || link.href?.endsWith('.pdf') ? '_blank' : undefined}
                            rel="noreferrer"
                            className="inline-block border-b border-ink/35 pb-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft hover:border-tangerine hover:text-tangerine">
                                      {link.label} ↗
                                    </a>
                                  </li>
                        )}
                              </ul>
                      }
                            {message.suggestions && message.suggestions.length > 0 &&
                      <ul className="mt-7 border-t border-ink/15">
                                {message.suggestions.map((suggestion) =>
                        <li key={suggestion} className="border-b border-dashed border-ink/15">
                                    <button
                            type="button"
                            onClick={() => void send(suggestion)}
                            className="group flex w-full items-start gap-3 py-3.5 text-left text-[14px] leading-snug text-ink-soft transition-colors hover:text-ink sm:text-[15px]">
                                      <CornerDownRight
                              size={16}
                              className="mt-0.5 shrink-0 transition-transform group-hover:translate-x-1"
                              aria-hidden="true" />
                                      {suggestion}
                                    </button>
                                  </li>
                        )}
                              </ul>
                      }
                          </div>
                    }
                      </motion.div>
                  )}

                    {thinking &&
                  <motion.div
                    key="roro-thinking"
                    layout="position"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 border border-ink/15 bg-paper-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft shadow-paper"
                    role="status">
                        <Sparkle size={14} className="text-tangerine" />
                        <span>RoRo is thinking</span>
                        <span className="inline-flex gap-1" aria-hidden="true">
                          {[0, 1, 2].map((index) =>
                      <motion.span
                        key={index}
                        className="h-1 w-1 bg-ink-soft"
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: index * 0.15
                        }} />
                      )}
                        </span>
                      </motion.div>
                  }
                  </AnimatePresence>
                  </div>
                }
              </motion.div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void send(value);
                }}
                className="border-t border-ink/15 bg-paper-2 p-4 sm:p-7">
                <div className="flex min-h-16 items-center gap-3 border border-ink/20 bg-paper px-3 shadow-paper sm:px-4">
                  <label htmlFor="roro-input" className="sr-only">
                    Ask RoRo a question
                  </label>
                  <input
                    id="roro-input"
                    ref={inputRef}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Ask about Rohan..."
                    autoComplete="off"
                    maxLength={600}
                    className="min-w-0 flex-1 bg-transparent text-[16px] placeholder:text-ink-soft/55 focus:outline-none sm:text-lg" />
                  <button
                    type="submit"
                    disabled={!value.trim() || thinking}
                    aria-label="Send question"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-paper-2 transition-colors hover:bg-tangerine active:translate-y-px disabled:bg-ink-soft disabled:opacity-30">
                    <ArrowUp size={19} />
                  </button>
                </div>
              </form>
            </div>
          </motion.aside>
        </>
      }
    </AnimatePresence>
  );
}
