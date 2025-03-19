"use client";

import { useRouter } from "next/navigation";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/EmailInput/Input";
import { InfoTitle } from "../components/InfoTitle";
import { QuestionTitle } from "../components/QuestionTitle";
import styles from "../page.module.css";
import { useQuiz } from "@/app/context/QuizContext";

export default function Email() {
  const { messages } = useQuiz();

  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const t = useTranslations("Texts");

  const locale = useLocale() as Locale;

  const router = useRouter();

  const goToThxPage = () => {
    const storedData = localStorage.getItem("smartQuiz");
    const quizData = storedData ? JSON.parse(storedData) : { questions: [] };

    quizData.questions.push({
      order: messages.length + 1,
      title: "Email",
      type: "Email",
      answer: email,
    });

    localStorage.setItem("smartQuiz", JSON.stringify(quizData));
    router.push(`/${locale}/thank-you`);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlevalidationChange = (isValid: boolean) => {
    setIsValid(isValid);
  };

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.titleSectionEmail}>
          <QuestionTitle text={t("email")} />
        </div>
        <div className={styles.subtitleSection}>
          <InfoTitle text={t("enter_email")} />
        </div>
        <div className={styles.inputSection}>
          <Input value={email} onChange={handleEmailChange} onValidationChange={handlevalidationChange} />
        </div>
        <div className={styles.privacyAndTermsSection}>
          <div className={styles.privacyAndTermsText}>{t("privacy_and_terms")}</div>
        </div>

        <div className={styles.buttonSectionEmailPage}>
          <Button disabled={!isValid} onClick={goToThxPage}>
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
