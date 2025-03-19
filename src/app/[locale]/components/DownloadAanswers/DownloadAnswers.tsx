import React from "react";
import Image from "next/image";

import styles from "./DownloadAnswers.module.css";

interface DownloadAnswersProps {
  text: string;
}

export const DownloadAnswers: React.FC<DownloadAnswersProps> = ({ text }) => {
  return (
    <div className={styles.downloadAnswers}>
      <Image src="/download.png" alt="download" width={42} height={42} priority />

      {text}
    </div>
  );
};
