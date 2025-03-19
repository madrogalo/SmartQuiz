"use client";
import { useRouter } from "next/navigation";

import { Button } from "./components/Button";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const handleStartQuiz = () => {
    router.push("/en/quiz/1");
  };
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Button onClick={handleStartQuiz}>Start Quiz</Button>
      </div>
    </div>
  );
}
