import styles from "./DesktopView2.module.css";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import React, { useState, useEffect } from "react";

const DesktopView2 = () => {
  const { owner } = useParams();
  const categories = ["Breakfast", "Miscellaneous", "Chicken", "Dessert"];
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://so-yummy-1f2e.onrender.com/api/all-recipes`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  if (categories && recipes) {
    return (
      <>
        {categories.map((category) => {
          const filteredRecipes = recipes.filter(
            (recipe) => recipe.category === category
          );

          return (
            <div className={styles.categoryContainer} key={category}>
              <div className={styles.categoryHead}>
                <span className={styles.categoryHeadText}>
                  <NavLink
                    className={styles.categoryHeadText}
                    to={`/categories/${owner}/${category}`}
                  >
                    {" "}
                    {category}
                  </NavLink>
                </span>
              </div>
              <div className={styles.categoryContent}>
                {filteredRecipes.slice(0, 4).map((recipe, index) => (
                  <div key={index}>
                    <NavLink to={`/recipes/${owner}/${recipe._id}`}>
                      <div className={styles.categoryItem}>
                        <img
                          src={recipe.preview}
                          alt={recipe.title}
                          className={styles.categoryItemPic}
                        />

                        <div className={styles.categoryItemBox}>
                          <span className={styles.categoryItemText}>
                            {recipe.title}
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
              <div className={styles.categoryButtonBox}>
                <NavLink to={`/categories/${owner}/${category}`}>
                  <button className={styles.categoryButton}>See all</button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <div className={styles.loaderView}>
        <Loader />
      </div>
    );
  }
};

export default DesktopView2;
