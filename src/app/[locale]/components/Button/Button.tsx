import React from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <button className={`${styles.button} ${disabled ? styles.disabled : ""}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
