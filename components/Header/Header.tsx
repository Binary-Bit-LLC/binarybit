import Branding from "./Branding/Branding";
import ExternalLinks from "./ExternalLinks/ExternalLinks";
import GradientBar from "./GradientBar/GradientBar";
import styles from "./Header.module.sass";
import Navbar from "./Navbar/Navbar";

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.primaryContainer}>
        <div className={styles.wrapper}>
          <Branding />
          <Navbar />
          <ExternalLinks />
        </div>
      </div>
      <GradientBar />
    </div>
  );
};
