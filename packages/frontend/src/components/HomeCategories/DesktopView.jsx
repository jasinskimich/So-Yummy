import styles from "./DesktopView.module.css";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const DesktopView = () => {
  const { owner } = useParams();

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

  if (categories && first && second && third && fourth) {
    return (
      <>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryHead}>
            <span className={styles.categoryHeadText}>
              {categories.length > 0 && categories[0].display.displayName}
            </span>
          </div>
          <div className={styles.categoryContent}>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(first[0]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {first.length > 0 && first[0].display.images[0] && (
                  <img
                    src={first[0].display.images[0]}
                    alt={first[0].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}

                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {first.length > 0 && first[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${first[1]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {first.length > 0 && first[1].display.images[0] && (
                  <img
                    src={first[1].display.images[0]}
                    alt={first[1].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {first.length > 0 && first[1].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${first[2]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {first.length > 0 && first[2].display.images[0] && (
                  <img
                    src={first[2].display.images[0]}
                    alt={first[2].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {first.length > 0 && first[2].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${first[3]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {first.length > 0 && first[3].display.images[0] && (
                  <img
                    src={first[3].display.images[0]}
                    alt={first[3].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {first.length > 0 && first[3].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className={styles.categoryButtonBox}>
            <NavLink
              to={`/categories/${owner}/${categories[0]["tracking-id"]}`}
            >
              <button className={styles.categoryButton}>See all</button>
            </NavLink>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryHead}>
            <span className={styles.categoryHeadText}>
              {categories.length > 0 && categories[1].display.displayName}
            </span>
          </div>
          <div className={styles.categoryContent}>
            <NavLink to={`/recipes/${owner}/${second[0]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {second.length > 0 && second[0].display.images[0] && (
                  <img
                    src={second[0].display.images[0]}
                    alt={second[0].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {second.length > 0 && second[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${second[1]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {second.length > 0 && second[1].display.images[0] && (
                  <img
                    src={second[1].display.images[0]}
                    alt={second[1].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {second.length > 0 && second[1].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${second[2]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {second.length > 0 && second[2].display.images[0] && (
                  <img
                    src={second[2].display.images[0]}
                    alt={second[2].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {second.length > 0 && second[2].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${second[3]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {second.length > 0 && second[3].display.images[0] && (
                  <img
                    src={second[3].display.images[0]}
                    alt={second[3].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {second.length > 0 && second[3].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className={styles.categoryButtonBox}>
            <NavLink
              to={`/categories/${owner}/${categories[1]["tracking-id"]}`}
            >
              <button className={styles.categoryButton}>See all</button>
            </NavLink>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryHead}>
            <span className={styles.categoryHeadText}>
              {categories.length > 0 && categories[2].display.displayName}
            </span>
          </div>
          <div className={styles.categoryContent}>
            <NavLink to={`/recipes/${owner}/${third[0]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {third.length > 0 && third[0].display.images[0] && (
                  <img
                    src={third[0].display.images[0]}
                    alt={third[0].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {third.length > 0 && third[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${third[1]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {third.length > 0 && third[1].display.images[0] && (
                  <img
                    src={third[1].display.images[0]}
                    alt={third[1].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {third[1].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${third[2]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {third.length > 0 && third[2].display.images[0] && (
                  <img
                    src={third[2].display.images[0]}
                    alt={third[2].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {third.length > 0 && third[2].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${third[3]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {third.length > 0 && third[3].display.images[0] && (
                  <img
                    src={third[3].display.images[0]}
                    alt={third[3].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {third.length > 0 && third[3].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className={styles.categoryButtonBox}>
            <NavLink
              to={`/categories/${owner}/${categories[2]["tracking-id"]}`}
            >
              <button className={styles.categoryButton}>See all</button>
            </NavLink>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryHead}>
            <span className={styles.categoryHeadText}>
              {categories.length > 0 && categories[3].display.displayName}
            </span>
          </div>
          <div className={styles.categoryContent}>
            <NavLink to={`/recipes/${owner}/${fourth[0]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {fourth.length > 0 && fourth[0].display.images[0] && (
                  <img
                    src={fourth[0].display.images[0]}
                    alt={fourth[0].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {fourth.length > 0 && fourth[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${fourth[1]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {fourth.length > 0 && fourth[1].display.images[0] && (
                  <img
                    src={fourth[1].display.images[0]}
                    alt={fourth[1].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {fourth.length > 0 && fourth[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${fourth[2]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {fourth.length > 0 && fourth[2].display.images[0] && (
                  <img
                    src={fourth[2].display.images[0]}
                    alt={fourth[2].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {fourth.length > 0 && fourth[0].display.displayName}r
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${fourth[3]["tracking-id"]}`}>
              <div className={styles.categoryItem}>
                {fourth.length > 0 && fourth[3].display.images[0] && (
                  <img
                    src={fourth[3].display.images[0]}
                    alt={fourth[3].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {fourth.length > 0 && fourth[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className={styles.categoryButtonBox}>
            <NavLink
              to={`/categories/${owner}/${categories[3]["tracking-id"]}`}
            >
              <button className={styles.categoryButton}>See all</button>
            </NavLink>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Loader />
      </div>
    );
  }
};

export default DesktopView;
