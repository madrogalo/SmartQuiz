export type Locale = "en" | "fr" | "de" | "es";

type Answer = {
  id: string;
  label: string;
  emoji?: string;
};

export type QuestionData = {
  question: string;
  subtitle?: string;
  quantity?: number;
  answers: Answer[];
  type: "single-select" | "single-select-image" | "multiple-select" | "bubble";
};

export type Message = Record<Locale, QuestionData>;

export type Messages = Message[];

export interface QuizAnswer {
  title: any;
  order: number;
  question: string;
  type: "single-select" | "multiple-select" | "single-select-image" | "bubble";
  selected: string[];
  answers: { id: number; answer: string | string[] }[];
}

export interface SmartQuizData {
  map(arg0: (item: any) => any[]): unknown;
  length: number;
  questions: QuizAnswer[];
}
