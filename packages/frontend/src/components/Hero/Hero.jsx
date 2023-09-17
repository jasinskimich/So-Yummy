import React from "react";
import styles from "./Hero.module.css";
import { ReactComponent as SearchButton } from "../../images/searchButton.svg";
import { ReactComponent as Arrow } from "../../images/arrowHero.svg";
import { ReactComponent as SmallArrow } from "../../images/smallArrowBtn.svg";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";


const Hero = () => {


  const { owner } = useParams();

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
          <div className={styles.infoTextBox}>
            <div className={styles.infoTextBoxContainer}>
              <div className={styles.infoTextContent}>
                <span className={styles.greenText}>Delicious and healthy </span>
                <span className={styles.blackText}>way to enjoy a variety of fresh ingredients in one satisfying meal</span>
              </div>
              <div className={styles.infoTextButtonContainer}>
              <NavLink to={`/categories/${owner}`} className={styles.navLink}>
                <button className={styles.infoTextButton}>
                  See Recipes
                  <SmallArrow />
                </button>
                </NavLink>
              </div>
            </div>
          </div>
          <Arrow className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
