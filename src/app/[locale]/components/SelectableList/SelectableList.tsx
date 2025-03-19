import React, { useEffect, useState } from "react";
import styles from "./SelectableList.module.css";

interface SelectableListProps {
  options: { id: string; label: string; emoji?: string }[];
  type: "single-select" | "multiple-select" | "single-select-image" | "bubble";
  storageKey: string;
  quantity?: number;
  onChange?: (selected: string[]) => void;
  onAutoNext?: (selected: string[]) => void;
}

export const SelectableList: React.FC<SelectableListProps> = ({
  options,
  type,
  storageKey,
  quantity,
  onChange,
  onAutoNext,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("smartQuiz");
    if (savedData) {
      const quizData = JSON.parse(savedData);
      const savedAnswer = quizData.questions.find((q: any) => q.order === Number(storageKey));
      if (savedAnswer) {
        setSelected(Array.isArray(savedAnswer.answer) ? savedAnswer.answer : [savedAnswer.answer]);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (selected.length > 0) {
      const storedData = localStorage.getItem("smartQuiz");
      let quizData = storedData ? JSON.parse(storedData) : { locale: "fr", questions: [] };

      const existingIndex = quizData.questions.findIndex((q: any) => q.order === Number(storageKey));

      if (existingIndex !== -1) {
        quizData.questions[existingIndex].answer = selected.length === 1 ? selected[0] : selected;
      } else {
        quizData.questions.push({
          order: Number(storageKey),
          title: options[0].label,
          type,
          answer: selected.length === 1 ? selected[0] : selected,
        });
      }

      localStorage.setItem("smartQuiz", JSON.stringify(quizData));
    }
  }, [selected, storageKey, type, options]);

  const handleSelect = (id: string) => {
    let newSelected: string[] = [];

    if (type === "single-select" || type === "single-select-image") {
      newSelected = [id];
    } else if (type === "multiple-select" || type === "bubble") {
      if (selected.includes(id)) {
        newSelected = selected.filter((item) => item !== id);
      } else if (quantity && selected.length >= quantity) {
        newSelected = [...selected.slice(1), id];
      } else {
        newSelected = [...selected, id];
      }
    }

    setSelected(newSelected);
    onChange?.(newSelected);

    if (type !== "multiple-select" && type !== "bubble") {
      setTimeout(() => {
        onAutoNext?.(newSelected);
      }, 500);
    }
  };

  return (
    <div className={`${styles.container} ${styles[type]}`}>
      {options.map((option) => (
        <div
          key={option.id}
          className={`${styles.item} ${selected.includes(option.id) ? styles.selected : ""} ${type === "single-select-image" ? styles.singleImage : ""}`}
          onClick={() => handleSelect(option.id)}
        >
          {type === "multiple-select" && (
            <div className={styles.checkboxContainer}>
              <input type="checkbox" checked={selected.includes(option.id)} readOnly className={styles.checkbox} />
              {selected.includes(option.id) && <span className={styles.checkmark}>✓</span>}
            </div>
          )}
          {option.emoji && type === "single-select-image" && <div className={styles.emoji}>{option.emoji}</div>}
          {option.emoji && type === "bubble" && <div className={styles.bubbleEmoji}>{option.emoji}</div>}
          {type === "single-select-image" && <span>{option.label}</span>}
          {type === "bubble" && <span className={styles.bubbleSpan}>{option.label}</span>}
          {type !== "single-select-image" && type !== "bubble" && <span className={styles.label}>{option.label}</span>}
        </div>
      ))}
    </div>
  );
};
