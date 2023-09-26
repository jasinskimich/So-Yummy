import React from "react";
import styles from "./Popular.module.css";

function Popular() {
  return (
    <div className={styles.pouplarContainer}>
      <div className={styles.pouplarTitleContainer}>
        <span className={styles.pouplarTitle}>Popular recipes</span>
      </div>
      <div className={styles.pouplarItemsContainer}>
        <div className={styles.pouplarItem}>
          <div className={styles.pouplarItemPic}></div>
          <div className={styles.pouplarItemText}>
            <span className={styles.pouplarItemTitle}>Dobre jedzonko</span>
            <span className={styles.pouplarItemDescr}>
              Dobre jedzonko, bardzo puszne nalepsze bardzo bram bram lulu
            </span>
          </div>
        </div>
        <div className={styles.pouplarItem}>
          <div className={styles.pouplarItemPic}></div>
          <div className={styles.pouplarItemText}>
            <span className={styles.pouplarItemTitle}>Dobre jedzonko</span>
            <span className={styles.pouplarItemDescr}>
              Dobre jedzonko, bardzo puszne nalepsze bardzo bram bram lulu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popular;
