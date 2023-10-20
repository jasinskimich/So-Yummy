import styles from "./TabletView.module.css";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import React, { useState, useEffect } from "react";


const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

const TabletView = () => {
  const { owner } = useParams();
  const categories = ["Breakfast", "Miscellaneous", "Chicken", "Dessert"];
  const [recipes, setRecipes] = useState(null);

  const windowWidth = useWindowWidth();

  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/all-recipes`);
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
                <span className={styles.categoryHeadText}>{category}</span>
              </div>
              <div className={styles.categoryContent}>
              {filteredRecipes.slice(0, windowWidth > 1141 ? 3 : 2).map((recipe, index) => (
                <div key={index}>
                  <NavLink to={`/categories/${owner}/${category._id}`}>
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
                <NavLink to={`/categories/${owner}/${category._id}`}>
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

export default TabletView;

