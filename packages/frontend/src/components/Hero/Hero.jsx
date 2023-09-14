import React from "react";
import styles from "./Hero.module.css";
import { ReactComponent as SearchButton } from "../../images/searchButton.svg";
import { ReactComponent as Arrow } from "../../images/arrowHero.svg";

const Hero = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headContainer}>
        <div className={styles.wrapper}>
          <div className={styles.headTitle}>
            <div>
              <span className={styles.title}>So</span>
              <span className={styles.title1}>Yummy</span>
            </div>
            <span className={styles.text}>
              "What to cook?" is not only a recipe app, it is, in fact, your
              cookbook. You can add your own recipes to save them for the
              future.
            </span>
          </div>

          <div className={styles.headButton}>
            <div className={styles.inputInside}>
              <form className={styles.inputForm}>
                <input
                  className={styles.input}
                  placeholder="Search your category"
                ></input>
                <button className={styles.inputButton}>
                  <SearchButton className={styles.inputButtonImage} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoContent}>
          <div className={styles.infoTextBox}></div>
          <Arrow className={styles.arrow}/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
