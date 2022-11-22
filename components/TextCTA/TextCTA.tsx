import styles from "./TextCTA.module.scss";
import { NextPage } from "next";

interface Props {
  label: string;
  id: string;
}

const TextCTA: NextPage<Props> = ({ label, id }) => {
  return (
    <a className={styles.container} href={`/${id}`}>
      <div className={styles.secondContainer}>
        <p className={styles.text}>{label}</p>
        <img className={styles.chevron} src={`/images/chevron-right.svg`} />
      </div>
    </a>
  );
};

export default TextCTA;
