import styles from "./ArticleCard.module.sass";
import Link from "next/link";
import { NextPage } from "next";

interface Props {
  id: string;
  title: string;
  coverimage: string;
  index: number;
}

const ArticleCard: NextPage<Props> = ({ id, title, coverimage, index }) => {
  return (
    <div className={styles.container}>
      {index === 0 ? (
        <h2 className={styles.categoryTitle}>Latest Content</h2>
      ) : (
        ""
      )}
      <Link href={`/${id}`}>
        <div className={`${styles.cardContainer}`}>
          <img
            className={styles.coverImage}
            src={`/articles/${id}/${coverimage}`}
          />
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
