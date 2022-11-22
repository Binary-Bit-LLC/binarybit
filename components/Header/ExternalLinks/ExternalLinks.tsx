import styles from "./ExternalLinks.module.sass";
import { externalLinks } from "../../../constants/Links";
import IconButton from "../../IconButton/IconButton";

export default () => {
  return (
    <div className={styles.container}>
      {externalLinks.map((link, index) => (
        <IconButton
          metadata={{
            label: link.label,
            url: link.url,
            filename: link.filename,
            hoverColor: link.hoverColor,
          }}
        />
        // label={link.label}
        // url={link.url}
        // filename={link.filename}
        // hoverColor={link.hoverColor}

        // <Link href={link.url}>
        //   <img
        //     className={`${styles.image} ${
        //       index === 0 ? styles.noMarginLeft : ""
        //     }` }
        //     src={`/images/${link.filename}`}
        //     height={"30px"}
        //   />
        // </Link>
      ))}
    </div>
  );
};
