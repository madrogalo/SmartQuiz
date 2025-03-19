"use client";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { Loader } from "../components/Loader";
import styles from "../page.module.css";
import { Locale } from "@/types/types";

export default function AnalyzingPreferences() {
  const t = useTranslations("Texts");
  const router = useRouter();
  const locale = useLocale() as Locale;

  const handleComplete = () => {
    router.push(`/${locale}/email`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Loader onComplete={handleComplete} />
        <div className={styles.findingText}>{t("finding_collections")}</div>
      </div>
    </div>
  );
}
