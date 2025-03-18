"use client";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

import styles from "../../page.module.css";
import { Loader } from "../../components/Loader";
import { ProgressBar } from "../../components/ProgressBar";
import { QuestionTitle } from "../../components/QuestionTitle";
import { InfoTitle } from "../../components/InfoTitle";
import { SelectableList } from "../../components/SelectableList";
import { Messages, QuestionData, Locale } from "@/types/types";

export default function Quiz() {
  const [messages, setMessages] = useState<Messages>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const locale = useLocale() as Locale;

  console.log("locale:", locale);

  const t = useTranslations("Texts");
  const handleBackClick = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch("/questions.json");
      const messages = await response.json();
      setMessages(messages);
    };
    getMessages();
  }, []);

  const onSelectableList = (selected: string[]) => {
    console.log("Вибрано:", selected);
    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);
    }, 1000);
  };

  const isValidLocale = (locale: string): locale is Locale => {
    return ["en", "fr", "de", "es"].includes(locale);
  };

  const message: QuestionData | undefined = isValidLocale(locale) ? messages[currentQuestion]?.[locale] : undefined;

  console.log("message:", message);

  if (!message) {
    return "🤗";
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <ProgressBar
          total={messages.length}
          current={currentQuestion + 1}
          showBackArrow={currentQuestion > 2}
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
            storageKey="selectedLanguage"
            options={message.answers}
            onChange={(selected) => onSelectableList(selected)}
          />
        </div>
      </div>
    </div>
  );
}
