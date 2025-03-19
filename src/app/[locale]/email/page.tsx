"use client";

import { Locale, useLocale, useTranslations } from "next-intl";

import { InfoTitle } from "../components/InfoTitle";
import { QuestionTitle } from "../components/QuestionTitle";
import { Button } from "../components/Button";
import { useRouter, usePathname } from "next/navigation";

import { Input } from "../components/EmailInput/Input";
import styles from "../page.module.css";
import { useState } from "react";

export default function Email() {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const t = useTranslations("Texts");

  const locale = useLocale() as Locale;

  const router = useRouter();

  const goToThxPage = () => {
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
          <div className={styles.privacyAndTermsText}>{t("privacyAndTerms")}</div>
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
