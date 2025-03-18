import Image from "next/image";
import React from "react";

import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  total: number;
  current: number;
  showBackArrow?: boolean;
  onBackClick?: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, current, showBackArrow, onBackClick }) => {
  const progress = (current / total) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.topSection}>
        {showBackArrow && (
          // <button className={styles.backButton} onClick={onBackClick}>
          //   &#8592;
          // </button>

          <Image
            className={styles.backArrow}
            onClick={onBackClick}
            src="/arrow.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        )}
        <div className={styles.progressText}>
          <span className={styles.current}>{current}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.total}>{total}</span>
        </div>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};
