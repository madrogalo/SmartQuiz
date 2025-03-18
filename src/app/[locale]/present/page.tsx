"use client";

import { useTranslations } from "next-intl";

import { InfoTitle } from "../components/InfoTitle";
import { ProgressBar } from "../components/ProgressBar";
import { QuestionTitle } from "../components/QuestionTitle";
import { SelectableList } from "../components/SelectableList";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import styles from "../page.module.css";

export default function Home() {
  const t = useTranslations("Texts");
  const handleBackClick = () => {
    // console.log("handleBackClick !");
  };

  const handleComplete = () => {};

  const onSelectableList = (selected: string[]) => {
    console.log("Вибрано:", selected);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Loader onComplete={handleComplete} />
        <p>{t("identify_yourself")}</p>
        {t("your_email")}
        <ProgressBar total={5} current={2} showBackArrow={true} onBackClick={handleBackClick} />
        <QuestionTitle text="What is your preferred language?" />
        <InfoTitle text="What is your preferred language?" />

        <SelectableList
          type="single-select"
          storageKey="selectedLanguage"
          options={[
            { id: "english", label: "English" },
            { id: "french", label: "French" },
            { id: "german", label: "German" },
            { id: "spanish", label: "Spanish" },
          ]}
          //@lint-ignore CLS003
          onChange={(selected) => console.log("selected:", selected)}
        />
        <SelectableList
          type="multiple-select"
          storageKey="selectedIssues"
          options={[
            { id: "logic", label: "Lack of logic" },
            { id: "speed", label: "A slow speed" },
            { id: "humor", label: "Lack of humor" },
            { id: "ending", label: "Way too generic ending" },
          ]}
          onChange={(selected) => console.log("Selected option:", selected)}
        />
        <SelectableList
          type="single-select-image"
          storageKey="selectedGender"
          options={[
            { id: "female", label: "Female", emoji: "👩‍🦰" },
            { id: "male", label: "Male", emoji: "👨‍🦱" },
            { id: "other", label: "Other", emoji: "😉" },
          ]}
          onChange={(selected) => console.log("Вибрано:", selected)}
        />
        <SelectableList
          type="bubble"
          storageKey="selectedTopics"
          options={[
            { id: "werewolf", label: "Werewolf", emoji: "🐺" },
            { id: "romance", label: "Romance", emoji: "🥰" },
            { id: "action", label: "Action", emoji: "💃" },
            { id: "young-adult", label: "Young Adult", emoji: "💁‍♀️" },
            { id: "royal-obsession", label: "Royal Obsession", emoji: "👑" },
            { id: "bad-boy", label: "Bad Boy", emoji: "🤠" },
            { id: "billionairey", label: "Billionaire", emoji: "🤑" },
          ]}
          onChange={(selected) => console.log("Selected thems:", selected)}
        />
      </div>

      <Button onClick={() => console.log("Click")}>Click me</Button>
      <Button disabled onClick={() => console.log("Click")}>
        Click me
      </Button>
    </div>
  );
}
