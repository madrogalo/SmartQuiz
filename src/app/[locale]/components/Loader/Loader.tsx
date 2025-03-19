import React, { useEffect, useState } from "react";

import styles from "./Loader.module.css";

type LoaderProps = {
  onComplete: () => void;
};

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) {
            onComplete();
          }
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={styles.loaderContainer}>
      <svg className={styles.svg} viewBox="0 0 100 100">
        <circle className={styles.bgCircle} cx="50" cy="50" r="45" />
        <circle
          className={styles.progressCircle}
          cx="50"
          cy="50"
          r="45"
          style={{ strokeDasharray: "282.74", strokeDashoffset: 282.74 - (progress / 100) * 282.74 }}
        />
        <text x="50" y="-50" className={styles.text}>
          {progress}%
        </text>
      </svg>
    </div>
  );
};
