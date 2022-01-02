import styles from "./Navbar.module.sass";
import { internalLinks } from "../../../constants/Links";
import Link from "next/link";

// Todo: add a hamburger slide-down menu (similar to the one on itsfoss)
// Make a decision on how to handle the "Binary Bit" text when width is <1092

export default () => {
  return (
    <div className={styles.container}>
      {internalLinks.map((link) => (
        <Link href={link.url}>
          <a className={styles.navigationLink}>{link.label}</a>
        </Link>
      ))}
    </div>
  );
};
