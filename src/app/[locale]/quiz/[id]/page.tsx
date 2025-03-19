"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useCallback } from "react";

import { Button } from "../../components/Button";
import { InfoTitle } from "../../components/InfoTitle";
import { Loading } from "../../components/Loading";
import { ProgressBar } from "../../components/ProgressBar";
import { QuestionTitle } from "../../components/QuestionTitle";
import { SelectableList } from "../../components/SelectableList";
import styles from "../../page.module.css";
import { useQuiz } from "@/app/context/QuizContext";
import { QuestionData, Locale, QuizAnswer } from "@/types/types";

export default function Quiz() {
  const { messages } = useQuiz();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const questionidFromUrl = Number(pathname.split("/")[3]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const t = useTranslations("Texts");

  const message: QuestionData | undefined = messages[questionidFromUrl - 1]?.[locale];

  const handleBackClick = () => {
    router.push(`/${locale}/quiz/${questionidFromUrl - 1}`);
  };

  const nextQuestion = useCallback(
    (selected: string[]) => {
      const storedData = localStorage.getItem("smartQuiz");
      const quizData = storedData ? JSON.parse(storedData) : { questions: [] };

      const newAnswer =
        message?.type === "multiple-select" || message?.type === "bubble"
          ? message.answers.filter((a) => selected.includes(a.id)).map((a) => a.label)
          : message?.answers.find((a) => selected.includes(a.id))?.label || "";

      const existingIndex = quizData.questions.findIndex((q: QuizAnswer) => q.order === questionidFromUrl);

      if (existingIndex !== -1) {
        quizData.questions[existingIndex].answer = newAnswer;
      } else {
        quizData.questions.push({
          order: questionidFromUrl,
          title: message?.question || "",
          type: message?.type || "single-select",
          answer: newAnswer,
        });
      }

      localStorage.setItem("smartQuiz", JSON.stringify(quizData));

      const newLocale = questionidFromUrl === 1 ? selected[0] : locale;

      if (questionidFromUrl === messages.length) {
        router.push(`/${locale}/analyzing-preferences`);
      } else {
        router.push(`/${newLocale}/quiz/${questionidFromUrl + 1}`);
      }
    },
    [message, questionidFromUrl, locale, router, messages.length]
  );

  const onSelectableList = (selected: string[]) => {
    setSelectedAnswers(selected);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("smartQuiz");
    const quizData = storedData ? JSON.parse(storedData) : { questions: [] };

    const previousQuestion = quizData.questions.find((q: QuizAnswer) => q.order === questionidFromUrl - 1);
    if (questionidFromUrl > 1 && !previousQuestion) {
      router.push(`/${locale}/quiz/${questionidFromUrl - 1}`);
    }
  }, [questionidFromUrl, router, locale]);

  useEffect(() => {
    if (!message) return;

    if (selectedAnswers.length > 0 && (message.type === "single-select" || message.type === "single-select-image")) {
      setTimeout(() => {
        nextQuestion(selectedAnswers);
      }, 500);
    }
  }, [selectedAnswers, message, nextQuestion]);

  if (!message) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.quizContainer}>
        <ProgressBar
          total={messages.length}
          current={questionidFromUrl}
          showBackArrow={questionidFromUrl > 2}
          onBackClick={handleBackClick}
        />
        <div className={styles.titleSection}>
          <QuestionTitle text={message.question} />
        </div>
        {message.subtitle && (
          <div className={styles.subtitleSection}>
            <InfoTitle text={message.subtitle} />
          </div>
        )}
        <div className={styles.quizSection}>
          <SelectableList
            type={message.type}
            options={message.answers}
            quantity={message.quantity}
            onChange={onSelectableList}
          />
        </div>
        {(message.type === "multiple-select" || message.type === "bubble") && (
          <div className={styles.buttonSection}>
            <Button disabled={selectedAnswers.length === 0} onClick={() => nextQuestion(selectedAnswers)}>
              {t("next")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
