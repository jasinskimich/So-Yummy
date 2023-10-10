import React, { useState, useEffect } from "react";
import styles from "./HomeCategories.module.css";
import MobileView from "./MobileView";
import TabletView from "./TabletView";
import DesktopView from "./DesktopView";
import { ReactComponent as OtherBtn } from "../../images/OtherBtn.svg";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";


const HomeCategories = () => {
  const { owner } = useParams();
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1367);
  const [isTablet, setTablet] = useState(
    window.innerWidth <= 1080 && window.innerWidth >= 768
  );
  const [isMobile, setMobile] = useState(window.innerWidth <= 767);

  const updateMedia = () => {
    setDesktop(window.innerWidth >= 1367);
    setTablet(window.innerWidth < 1367 && window.innerWidth >= 768);
    setMobile(window.innerWidth <= 767);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const [categories, setCategories] = useState(null);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);
  const [fourth, setFourth] = useState(null);

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
        console.log(cusines, "cusines")
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
      const url =
        "https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0&tag=list.recipe.search_based%3Afq%3Aattribute_s_mv%3A(cuisine%5C%5Ecuisine%5C-american)";
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
        const categoryItems = result.feed;
        setFirst(categoryItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const url =
        "https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0&tag=list.recipe.search_based%3Afq%3Aattribute_s_mv%3A(cuisine%5C%5Ecuisine%5C-barbecue%5C-bbq)";
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
        const categoryItems = result.feed;
        setSecond(categoryItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const url =
        "https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0&tag=list.recipe.search_based%3Afq%3Aattribute_s_mv%3A(cuisine%5C%5Ecuisine%5C-asian)";
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
        const categoryItems = result.feed;
        setThird(categoryItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);
  useEffect(() => {
    const fetchDetails = async () => {
      const url =
        "https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0&tag=list.recipe.search_based%3Afq%3Aattribute_s_mv%3A(cuisine%5C%5Ecuisine%5C-italian)";
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
        const categoryItems = result.feed;
        setFourth(categoryItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);


  return (
    <div className={styles.mainContainer}>
      {isDesktop && <DesktopView first={first} second={second} third={third} fourth={fourth} categories={categories}/>}
      {isTablet && <TabletView first={first} second={second} third={third} fourth={fourth} categories={categories}/>}
      {isMobile && <MobileView first={first} second={second} third={third} fourth={fourth} categories={categories}/>}
      
      <NavLink to={`/categories/${owner}/american`} >
      <button className={styles.otherBtn}>
        <OtherBtn />{" "}
      </button>
      </NavLink>
    </div>
  );
};

export default HomeCategories;
