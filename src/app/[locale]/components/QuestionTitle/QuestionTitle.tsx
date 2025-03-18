import styles from "./QuestionTitle.module.css";

type QuestionTitleProps = {
  text: string;
};

export const QuestionTitle: React.FC<QuestionTitleProps> = ({ text }) => {
  return <div className={styles.questionTitle}>{text}</div>;
};
