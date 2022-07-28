import styles from "./AuthorCard.module.scss";
import global from "../../styles/Global.module.scss";
import { NextPage } from "next";
import GlowImage from "../GlowImage/GlowImage";
import { Author } from "../../constants/Types";

interface Props {
  author: Author;
  className?: string;
  link?: boolean;
}

const AuthorCard: NextPage<Props> = ({ author, className, link }) => {
  return (
    <div className={[className, styles.container].join(" ")}>
      {author.picture && (
        <GlowImage
          className="h-32 rounded-full select-none pointer-events-none"
          src={`/authors/${author.picture}`}
        />
      )}
      <div className={styles.authorTextContainer}>
        <a
          href={`authors/${author.id}`}
          className={[global.link__noDecor, styles.authorLabel].join(" ")}
        >
          {author.label}
        </a>
        <a
          href={author.website}
          className={[global.link__noDecor, "mt-2"].join(" ")}
        >
          {author.website}
        </a>
        <h3 className={[styles.bio, "mt-2", "text-base"].join(" ")}>
          {author.bio}
        </h3>
        <div
          className={[
            styles.dateContainer,
            styles.genericText,
            styles.topMargin,
          ].join(" ")}
        ></div>
      </div>
    </div>
  );
};

export default AuthorCard;
