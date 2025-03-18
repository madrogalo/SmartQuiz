import styles from "./InfoTitle.module.css";

type InfoTitleProps = {
  text: string;
};

export const InfoTitle: React.FC<InfoTitleProps> = ({ text }) => {
  return <div className={styles.infoTitle}>{text}</div>;
};
