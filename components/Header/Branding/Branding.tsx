import Link from "next/link";
import styles from "./Branding.module.sass";

export default () => {
  return (
    <Link href="/">
      <div className={styles.container}>
        <img className={styles.logo} src={"/normal/logo_circ.svg"} />
        <h2 className={styles.binarybit}>Binary Bit</h2>
      </div>
    </Link>
  );
};
