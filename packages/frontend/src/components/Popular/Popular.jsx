import React, { useState, useEffect } from "react";
import styles from "./Popular.module.css";
import Loader from "../../components/Loader/Loader";
import { useParams, NavLink } from "react-router-dom";

function Popular() {
  const [recipes, setRecipes] = useState([]);
  console.log(recipes, "recipes");
  const { owner } = useParams();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/all-popular');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data.recipes.slice(0, 4));
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
              to={`/recipes/${owner}/${recipe._id}`}
            >
              <div key={index} className={styles.pouplarItem}>
                <div className={styles.pouplarItemPic}>
                  <img
                    src={recipe.preview}
                    alt={recipe.title}
                    className={styles.pouplarItemPic}
                  />
                </div>
                <div className={styles.pouplarItemText}>
                  <span className={styles.pouplarItemTitle}>
                    {recipe.title}
                  </span>
                  <span className={styles.pouplarItemDescr}>
                    {truncateString(recipe.description, 90)}
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
