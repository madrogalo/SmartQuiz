import Image from "next/image";
import React, { useEffect, useState } from "react";

import styles from "./SelectableList.module.css";

interface SelectableListProps {
  options: { id: string; label: string; emoji?: string }[];
  type: "single-select" | "multiple-select" | "single-select-image" | "bubble";
  storageKey: string;
  onChange?: (selected: string[]) => void;
}

export const SelectableList: React.FC<SelectableListProps> = ({ options, type, storageKey, onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const savedSelection = localStorage.getItem(storageKey);
    if (savedSelection) {
      setSelected(JSON.parse(savedSelection));
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selected));
  }, [selected, storageKey]);

  const handleSelect = (id: string) => {
    let newSelected: string[] = [];

    if (type === "single-select" || type === "single-select-image" || type === "bubble") {
      newSelected = selected.includes(id) ? [] : [id];
    } else if (type === "multiple-select") {
      newSelected = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];
    }

    setSelected(newSelected);
    onChange?.(newSelected);
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
