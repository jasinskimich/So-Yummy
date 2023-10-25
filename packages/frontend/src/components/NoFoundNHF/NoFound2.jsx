
import styles from "./NoFound.module.css";


export function NoFound() {
  return (
    <>
      <div className={styles.main}>
        
        <div className={styles.container}></div>
        <div className={styles.text}>
          <span className={styles.textHead}>We are sorry,</span>
          <span>but the page you were looking for can’t be found..</span>
        </div>
      </div>
     
    </>
  );
}

export default NoFound;
