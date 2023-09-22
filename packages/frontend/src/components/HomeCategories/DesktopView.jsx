import styles from "./DesktopView.module.css";
import cat1 from "../../images/cat1.png";
import cat2 from "../../images/cat2.png";
import cat3 from "../../images/cat3.png";
import cat4 from "../../images/cat4.png";
import React, { useEffect, useState } from 'react';
const DesktopView = () => {

  const [categories, setCategories] = useState([]);
  console.log(categories, "categoriesSTATE")

  useEffect(() => {
  
    const fetchCategories = async () => {
      const url = "https://yummly2.p.rapidapi.com/categories/list";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
          process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const browseCategories = Object.values(result)[0];
        const cusines = browseCategories[8];
        const categories = cusines.display.categoryTopics;
        setCategories(categories);
        console.log(categories, "categories");
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>{categories.length > 0 && categories[0].display.displayName}</span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={cat1}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              Melt-In-Your-Mouth Baked Chicken Breasts
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat2}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat3}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat4}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
        </div>
        <div className={styles.categoryButtonBox}>
          <button className={styles.categoryButton}>See all</button>
        </div>
      </div>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>{categories.length > 0 && categories[1].display.displayName}</span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={cat1}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat2}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat3}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat4}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
        </div>
        <div className={styles.categoryButtonBox}>
          <button className={styles.categoryButton}>See all</button>
        </div>
      </div>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>{categories.length > 0 && categories[2].display.displayName}</span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={cat1}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat2}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat3}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat4}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
        </div>
        <div className={styles.categoryButtonBox}>
          <button className={styles.categoryButton}>See all</button>
        </div>
      </div>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>{categories.length > 0 && categories[3].display.displayName}</span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={cat1}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat2}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat3}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={cat4}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
                Portuguese prego Por
              </span>
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
