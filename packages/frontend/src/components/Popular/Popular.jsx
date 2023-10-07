import React, { useState, useEffect } from "react";
import styles from "./Popular.module.css";
import Loader from "../../components/Loader/Loader";
import { useParams, NavLink } from "react-router-dom";

const axios = require("axios");

function Popular() {
  const [recipes, setRecipes] = useState([]);
  console.log(recipes, "recipes");
  const { owner } = useParams();

  useEffect(() => {
    const fetchPopular = async () => {
      const options = {
        method: "GET",
        url: "https://yummly2.p.rapidapi.com/feeds/list",
        params: {
          limit: "2",
          start: "0",
          tag: "list.recipe.popular",
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await axios.request(options);
        const recipes = response.data.feed;
        setRecipes(recipes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopular();
  }, []);

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  return (
    <div className={styles.pouplarContainer}>
      <div className={styles.pouplarTitleContainer}>
        <span className={styles.pouplarTitle}>Popular recipes</span>
      </div>
      <div className={styles.pouplarItemsContainer}>
        {recipes.length === 0 ? (
          <Loader />
        ) : (
          recipes.map((recipe, index) => (
            <NavLink
            className={styles.pouplarItemLink}
              key={index}
              to={`/recipes/${owner}/${encodeURIComponent(
                recipe["tracking-id"]
              )}`}
            >
              <div key={index} className={styles.pouplarItem}>
                <div className={styles.pouplarItemPic}>
                  <img
                    src={recipe.display.images[0]}
                    alt={recipe.display.displayName}
                    className={styles.pouplarItemPic}
                  />
                </div>
                <div className={styles.pouplarItemText}>
                  <span className={styles.pouplarItemTitle}>
                    {recipe.display.displayName}
                  </span>
                  <span className={styles.pouplarItemDescr}>
                    {truncateString(recipe.content.description.text, 90)}
                  </span>
                </div>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
}

export default Popular;
