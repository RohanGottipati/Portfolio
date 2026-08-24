import React, { createContext, useCallback, useContext, useState } from 'react';

export interface PendingQuestion {
  question: string;
  selection?: string;
}

interface AskBotValue {
  open: boolean;
  pendingQuestion: PendingQuestion | null;
  openBot: () => void;
  askBot: (question: string, selection?: string) => void;
  consumePendingQuestion: () => void;
  closeBot: () => void;
  toggleBot: () => void;
}

const AskBotContext = createContext<AskBotValue | null>(null);

export function AskBotProvider({ children }: {children: React.ReactNode;}) {
  const [open, setOpen] = useState(false);
  const [pendingQuestion, setPendingQuestion] =
    useState<PendingQuestion | null>(null);

  const openBot = useCallback(() => setOpen(true), []);
  const askBot = useCallback((question: string, selection?: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setPendingQuestion({
      question: trimmed,
      selection: selection?.trim() || undefined
    });
    setOpen(true);
  }, []);
  const consumePendingQuestion = useCallback(
    () => setPendingQuestion(null),
    []
  );
  const closeBot = useCallback(() => setOpen(false), []);
  const toggleBot = useCallback(() => setOpen((v) => !v), []);

  return (
    <AskBotContext.Provider
      value={{
        open,
        pendingQuestion,
        openBot,
        askBot,
        consumePendingQuestion,
        closeBot,
        toggleBot
      }}>
      {children}
    </AskBotContext.Provider>);

}

export function useAskBot(): AskBotValue {
  const ctx = useContext(AskBotContext);
  if (!ctx) {
    throw new Error('useAskBot must be used within an AskBotProvider');
  }
  return ctx;
}
