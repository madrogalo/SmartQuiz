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

export type Message = {
  [key in Locale]: QuestionData;
};

export type Messages = Message[];
