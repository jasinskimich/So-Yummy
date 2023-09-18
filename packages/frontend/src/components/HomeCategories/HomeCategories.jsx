import React from "react";
import styles from "./HomeCategories.module.css";
import cat1 from "../../images/cat1.png";
import cat2 from "../../images/cat2.png";
import cat3 from "../../images/cat3.png"
import cat4 from "../../images/cat4.png";


const HomeCategories = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>Breakfast</span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={cat1}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Banan Pancakes</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat2}
              alt="Ham hock colcannon"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Ham hock colcannon</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat3}
              alt="Polish Pancakes"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Polish Pancakes</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat4}
              alt="Boxty Breakfast"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Boxty Breakfast</span>
            </div>
          </div>
        </div>
        <div className={styles.categoryButtonBox}>
          <button className={styles.categoryButton}>See all</button>
        </div>
      </div>
      <button></button>
    </div>
  );
};

export default HomeCategories;
