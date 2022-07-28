import styles from "./ArticleData.module.scss";
import global from "../../styles/Global.module.scss";
import Date from "../Date";
import { externalLinks } from "../../constants/Links";
import { NextPage } from "next";

interface Props {
  author: any;
  title: string;
  date: string;
  updated: string;
  className?: string;
}

const ArticleData: NextPage<Props> = ({
  author,
  title,
  date,
  updated,
  className,
}) => {
  return (
    <div className={[styles.container, className, "w-full"].join(" ")}>
      <h1 className={styles.title}>{title}</h1>
      {author.page ? (
        <div className="mt-3.5">
          {/* is there a better way to have multiple classnames? */}
          <a
            href={`authors/${author.id}`}
            className={[styles.author, global.link__noDecor].join(" ")}
          >
            {author.label}
          </a>
        </div>
      ) : (
        <h3 className={styles.author}>{author.label}</h3>
      )}
      <div
        className={["mt-2.5", styles.dateContainer, styles.genericText].join(
          " "
        )}
      >
        <h4 className={styles.genericText}>Posted&nbsp;</h4>
        <Date dateString={date} />
        {date === updated ? (
          ""
        ) : (
          <div className="flex">
            <h4 className={styles.genericText}>
              &nbsp;&nbsp;-&nbsp;&nbsp;Last Updated&nbsp;
            </h4>
            <Date dateString={updated} />
          </div>
        )}
      </div>
      <div className="mt-2.5">
        <a
          href={externalLinks[1].url}
          className={[styles.genericText, global.link__noDecor].join(" ")}
        >
          Give us your thoughts in our Discord server
        </a>
      </div>
    </div>
  );
};

export default ArticleData;
