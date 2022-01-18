import styles from "./ArticleData.module.sass";
import Date from "../Date";
import { externalLinks } from "../../constants/Links";
import { NextPage } from "next";

interface Props {
  author: any;
  title: string;
  date: string;
  updated: string;
}

const ArticleData: NextPage<Props> = ({ author, title, date, updated}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {author.page ? (
        <a href={`authors/${author.id}`}>
          {/* is there a better way to have multiple classnames? */}
          <h3 className={[styles.author, styles.link].join(" ")}>
            {author.label}
          </h3>
        </a>
      ) : (
        <h3 className={styles.author}>{author.label}</h3>
      )}
      <div
        className={[
          styles.dateContainer,
          styles.genericText,
          styles.topMargin,
        ].join(" ")}
      >
        <h4 className={styles.genericText}>Posted&nbsp;</h4>
        <Date dateString={date} />
        {date === updated ? (
          ""
        ) : (
          <div className={styles.updatedContainer}>
            <h4 className={styles.genericText}>
              &nbsp;&nbsp;-&nbsp;&nbsp;Last Updated&nbsp;
            </h4>
            <Date dateString={updated} />
          </div>
        )}
      </div>
      <a href={externalLinks[1].url}>
        <h4
          className={[styles.genericText, styles.link, styles.topMargin].join(
            " "
          )}
        >
          Give us your thoughts in our Discord server
        </h4>
      </a>
    </div>
  );
};

export default ArticleData;
