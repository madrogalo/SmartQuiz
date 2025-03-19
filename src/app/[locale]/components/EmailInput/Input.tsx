import React, { useState, useEffect } from "react";
import styles from "./Input.module.css";

interface InputProps {
  type?: "email" | "text" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange: (isValid: boolean) => void;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "email",
  value,
  onChange,
  onValidationChange,
  placeholder = "Your email",
}) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = emailRegex.test(value);
      setIsValid(valid);
      onValidationChange(valid);
    } else {
      setIsValid(true);
      onValidationChange(true);
    }
  }, [value, type, onValidationChange]);

  return (
    <input
      type={type}
      className={`${styles.input} ${!isValid ? styles.invalid : ""}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
