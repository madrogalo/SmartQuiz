"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { Messages } from "@/types/types";

type QuizContextType = {
  messages: Messages;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/questions.json");
      const data = await response.json();
      setMessages(data);
    };
    fetchQuestions();
  }, []);

  return <QuizContext.Provider value={{ messages }}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
