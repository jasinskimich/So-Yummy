import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headContainer}>
        <div className={styles.headTitle}>
          <div>
            <span className={styles.title}>So</span>
            <span className={styles.title1}>Yummy</span>
          </div>
          <span className={styles.text}>
            "What to cook?" is not only a recipe app, it is, in fact, your
            cookbook. You can add your own recipes to save them for the future.
          </span>
        </div>
        <div className={styles.headButton}>
            
          {/* <form>
            <input></input>
            <button>Search</button>
          </form> */}
        </div>
      </div>
      <div className={styles.infoContainer}></div>
    </div>
  );
};

export default Hero;
