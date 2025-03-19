import Image from "next/image";
import React from "react";

import styles from "./DownloadAnswers.module.css";

interface DownloadAnswersProps {
  text: string;
  onClick: () => void;
}

export const DownloadAnswers: React.FC<DownloadAnswersProps> = ({ text, onClick }) => {
  return (
    <div className={styles.downloadAnswers} onClick={onClick}>
      <Image src="/download.png" alt="download" width={42} height={42} priority />

      {text}
    </div>
  );
};
