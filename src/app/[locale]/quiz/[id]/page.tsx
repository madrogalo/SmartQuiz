"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useQuiz } from "@/app/context/QuizContext";
import { Button } from "../../components/Button";
import { ProgressBar } from "../../components/ProgressBar";
import { QuestionTitle } from "../../components/QuestionTitle";
import { InfoTitle } from "../../components/InfoTitle";
import { SelectableList } from "../../components/SelectableList";
import { QuestionData, Locale } from "@/types/types";
import { Loading } from "../../components/Loading";
import styles from "../../page.module.css";

export default function Quiz() {
  const { messages } = useQuiz();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const questionidFromUrl = Number(pathname.split("/")[3]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const t = useTranslations("Texts");

  useEffect(() => {
    const storedData = localStorage.getItem("smartQuiz");
    const quizData = storedData ? JSON.parse(storedData) : { locale: "fr", questions: [] };

    if (questionidFromUrl > 1) {
      const previousQuestion = quizData.questions.find((q: any) => q.order === questionidFromUrl - 1);
      if (!previousQuestion) {
        router.push(`/${locale}/quiz/${questionidFromUrl - 1}`);
      }
    }
  }, [questionidFromUrl, router, locale]);

  const handleBackClick = () => {
    router.push(`/${locale}/quiz/${questionidFromUrl - 1}`);
  };

  const handleNextClick = (selected: string[]) => {
    console.log("selected", selected);
    const storedData = localStorage.getItem("smartQuiz");
    let quizData = storedData
      ? JSON.parse(storedData)
      : { locale: questionidFromUrl === 1 ? selected[0] : locale, questions: [] };
    const existingIndex = quizData.questions.findIndex((q: any) => q.order === questionidFromUrl);

    if (questionidFromUrl === messages.length) {
      router.push(`/${locale}/analyzing-preferences`);
      return;
    }
    if (existingIndex !== -1) {
      quizData.questions[existingIndex].answer = selectedAnswers.length === 1 ? selectedAnswers[0] : selectedAnswers;
    } else {
      quizData.questions.push({
        order: questionidFromUrl,
        title: messages[questionidFromUrl - 1]?.[locale].question,
        type: messages[questionidFromUrl - 1]?.[locale].type,
        answer: selectedAnswers.length === 1 ? selectedAnswers[0] : selectedAnswers,
      });
    }

    localStorage.setItem("smartQuiz", JSON.stringify(quizData));

    if (questionidFromUrl === 1) {
      localStorage.setItem("locale", selectedAnswers[0]);
    }

    const newLocale = questionidFromUrl === 1 ? selected[0] : locale;
    router.push(`/${newLocale}/quiz/${questionidFromUrl + 1}`);
  };

  const onSelectableList = (selected: string[]) => {
    setSelectedAnswers(selected);
  };

  const message: QuestionData | undefined = messages[questionidFromUrl - 1]?.[locale];

  if (!message) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      <div>
        <ProgressBar
          total={messages.length}
          current={questionidFromUrl}
          showBackArrow={questionidFromUrl > 1}
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
            storageKey={String(questionidFromUrl)}
            options={message.answers}
            quantity={message.quantity}
            onChange={onSelectableList}
            onAutoNext={handleNextClick}
          />
        </div>
        {(message.type === "multiple-select" || message.type === "bubble") && (
          <div className={styles.buttonSection}>
            <Button disabled={selectedAnswers.length === 0} onClick={() => handleNextClick(selectedAnswers)}>
              {t("next")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
