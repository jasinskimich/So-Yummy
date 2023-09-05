import { ReactComponent as Search } from "../../images/search.svg";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useParams } from "react-router-dom";
import React from "react";

export const Navigation = ({ showNavBar }) => {
  const { owner } = useParams();

  return (
    <div className={styles.navContainer}>
      <NavLink to={`/categories/${owner}`} className={styles.navLink}>
        <button className={styles.navItem}>Categories</button>
      </NavLink>
      <NavLink to={`/add-recipes/${owner}`} className={styles.navLink}>
        <button className={styles.navItem}>Add Recipes</button>
      </NavLink>
      <NavLink to={`/my-recipes/${owner}`} className={styles.navLink}>
        <button className={styles.navItem}>My Recipes</button>
      </NavLink>
      <NavLink to={`/favorites/${owner}`} className={styles.navLink}>
        <button className={styles.navItem}>Favorites</button>
      </NavLink>
      <NavLink to={`/shopping-list/${owner}`} className={styles.navLink}>
        <button className={styles.navItem}>Shopping list</button>
      </NavLink>
      <NavLink to={`/search/${owner}`} className={styles.navLink}>
        <button className={styles.navItem}>
          {" "}
          <Search className={styles.searchIcon} />
        </button>
      </NavLink>
     
    </div>
  );
};

export default Navigation;
