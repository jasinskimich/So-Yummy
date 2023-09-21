import React from "react";
import styles from "./DesktopView.module.css";
import cat1 from "../../images/cat1.png";
import cat2 from "../../images/cat2.png";
import cat3 from "../../images/cat3.png"
import cat4 from "../../images/cat4.png";


const DesktopView = () => {
  return (
    <>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>Asian</span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={cat1}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat2}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat3}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat4}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
        </div>
        <div className={styles.categoryButtonBox}>
          <button className={styles.categoryButton}>See all</button>
        </div>
      </div>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>American</span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={cat1}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat2}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat3}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat4}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
        </div>
        <div className={styles.categoryButtonBox}>
          <button className={styles.categoryButton}>See all</button>
        </div>
      </div>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>Chinese</span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={cat1}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat2}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat3}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat4}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
        </div>
        <div className={styles.categoryButtonBox}>
          <button className={styles.categoryButton}>See all</button>
        </div>
      </div>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>Thai</span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={cat1}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat2}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat3}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat4}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>Portuguese prego Por</span>
            </div>
          </div>
        </div>
        <div className={styles.categoryButtonBox}>
          <button className={styles.categoryButton}>See all</button>
        </div>
      </div>
      </>
  );
};

export default DesktopView;
