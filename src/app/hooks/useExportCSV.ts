"use client";

import { useState, useEffect } from "react";

const SMART_QUIZ_KEY = "smartQuiz";

export function useExportCSV() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quizData, setQuizData] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(SMART_QUIZ_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setQuizData(parsedData.questions || []);
    }
  }, []);

  const generateCSV = () => {
    if (quizData.length === 0) return;

    const headers = ["Order", "Question", "Type", "Selected Answers"];

    const rows = quizData.map((item) => [
      item.order,
      `"${item.title}"`,
      item.type,
      Array.isArray(item.answer) ? `"${item.answer.join(", ")}"` : `"${item.answer}"`,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "quiz_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { generateCSV, quizData };
}
