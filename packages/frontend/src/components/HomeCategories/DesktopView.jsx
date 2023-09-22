import styles from "./DesktopView.module.css";
import cat1 from "../../images/cat1.png";
import cat2 from "../../images/cat2.png";
import cat3 from "../../images/cat3.png";
import cat4 from "../../images/cat4.png";
import React, { useEffect, useState } from "react";
const DesktopView = () => {
  const [categories, setCategories] = useState([]);
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [third, setThird] = useState([]);
  const [fourth, setFourth] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = "https://yummly2.p.rapidapi.com/categories/list";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = 'https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0&tag=list.recipe.search_based%3Afq%3Aattribute_s_mv%3A(cuisine%5C%5Ecuisine%5C-american)';
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const categoryItems =  result.feed;
        setFirst(categoryItems)
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = 'https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0&tag=list.recipe.search_based%3Afq%3Aattribute_s_mv%3A(cuisine%5C%5Ecuisine%5C-barbecue%5C-bbq)';
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const categoryItems =  result.feed;
        setSecond(categoryItems)
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = 'https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0&tag=list.recipe.search_based%3Afq%3Aattribute_s_mv%3A(cuisine%5C%5Ecuisine%5C-asian)';
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const categoryItems =  result.feed;
        setThird(categoryItems)
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);
  useEffect(() => {
    const fetchDetails = async () => {
      const url = 'https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0&tag=list.recipe.search_based%3Afq%3Aattribute_s_mv%3A(cuisine%5C%5Ecuisine%5C-italian)';
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const categoryItems =  result.feed;
        setFourth(categoryItems)
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryHead}>
          <span className={styles.categoryHeadText}>
            {categories.length > 0 && categories[0].display.displayName}
          </span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={first.length > 0 && first[0].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {first.length > 0 && first[0].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={first.length > 0 && first[1].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {first.length > 0 && first[1].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={first.length > 0 && first[2].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {first.length > 0 && first[2].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={first.length > 0 && first[3].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {first.length > 0 && first[3].display.displayName}
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
          <span className={styles.categoryHeadText}>
            {categories.length > 0 && categories[1].display.displayName}
          </span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={second.length > 0 && second[0].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {second.length > 0 && second[0].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={second.length > 0 && second[1].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {second.length > 0 && second[1].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={second.length > 0 && second[2].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {second.length > 0 && second[2].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={second.length > 0 && second[3].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {second.length > 0 && second[3].display.displayName}
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
          <span className={styles.categoryHeadText}>
            {categories.length > 0 && categories[2].display.displayName}
          </span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={third.length > 0 && third[0].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {third.length > 0 && third[0].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={third.length > 0 && third[1].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {third.length > 0 && third[1].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={third.length > 0 && third[2].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {third.length > 0 && third[2].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={third.length > 0 && third[3].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {third.length > 0 && third[3].display.displayName}
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
          <span className={styles.categoryHeadText}>
            {categories.length > 0 && categories[3].display.displayName}
          </span>
        </div>
        <div className={styles.categoryContent}>
          <div className={styles.categoryItem}>
            <img
              src={fourth.length > 0 && fourth[0].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {fourth.length > 0 && fourth[0].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={fourth.length > 0 && fourth[1].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {fourth.length > 0 && fourth[0].display.displayName}
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={fourth.length > 0 && fourth[2].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {fourth.length > 0 && fourth[0].display.displayName}r
              </span>
            </div>
          </div>
          <div className={styles.categoryItem}>
            <img
              src={fourth.length > 0 && fourth[3].display.images[0]}
              alt="nalesniki"
              className={styles.categoryItemPic}
            />
            <div className={styles.categoryItemBox}>
              <span className={styles.categoryItemText}>
              {fourth.length > 0 && fourth[0].display.displayName}
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
