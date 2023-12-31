
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import styles from "./NoFound.module.css";


export function NoFound() {
  return (
    <>
      <div className={styles.main}>
        <Header />
        <div className={styles.container}></div>
        <div className={styles.text}>
          <span className={styles.textHead}>We are sorry,</span>
          <span>but the page you were looking for can’t be found..</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NoFound;
