"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Locale, useLocale, useTranslations } from "next-intl";

import { Button } from "../components/Button";
import { DownloadAnswers } from "../components/DownloadAanswers";
import { InfoTitle } from "../components/InfoTitle";
import { QuestionTitle } from "../components/QuestionTitle";
import styles from "../page.module.css";
import { useExportCSV } from "@/app/hooks/useExportCSV";

export default function ThankYou() {
  const { generateCSV } = useExportCSV();

  const t = useTranslations("Texts");

  const locale = useLocale() as Locale;

  const router = useRouter();

  const goToTheFirstQuestion = () => {
    localStorage.removeItem("smartQuiz");
    router.push(`/${locale}/quiz/1`);
  };

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.titleSectionEmail}>
          <QuestionTitle text={t("thank_you")} />
        </div>
        <div className={styles.subtitleSection}>
          <InfoTitle text={t("thank_you_support")} />
        </div>
        <div className={styles.imageSection}>
          <Image src="/done.png" alt="done" width={118} height={118} priority />
        </div>

        <div className={styles.downloadSection}>
          <DownloadAnswers text={t("download_answers")} onClick={generateCSV} />
        </div>
        <div className={styles.buttonSectionEmailPage}>
          <Button onClick={goToTheFirstQuestion}>{t("retakequiz")}</Button>
        </div>
      </div>
    </div>
  );
}
