import { ReactComponent as Search } from "../../images/search.svg";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useParams } from "react-router-dom";
import React from "react";

export const Navigation = ({ showNavBar }) => {
  const { owner } = useParams();
  const location = useLocation();
  return (
    <div className={styles.navContainer}>
      <NavLink to={`/categories/${owner}/Beef`} className={styles.navLink}>
        <button className={location.pathname.includes("/categories") ? styles.navItem1 : styles.navItem}>Categories</button>
      </NavLink>
      <NavLink to={`/add-recipes/${owner}`} className={styles.navLink}>
        <button className={location.pathname.includes("/add-recipes") ? styles.navItem1 : styles.navItem}>Add Recipes</button>
      </NavLink>
      <NavLink to={`/my-recipes/${owner}`} className={styles.navLink}>
        <button className={location.pathname.includes("/my-recipes") ? styles.navItem1 : styles.navItem}>My Recipes</button>
      </NavLink>
      <NavLink to={`/favorites/${owner}`} className={styles.navLink}>
        <button className={location.pathname.includes("/favorites") ? styles.navItem1 : styles.navItem}>Favorites</button>
      </NavLink>
      <NavLink to={`/shopping-list/${owner}`} className={styles.navLink}>
        <button className={location.pathname.includes("/shopping-list") ? styles.navItem1 : styles.navItem}>Shopping list</button>
      </NavLink>
      <NavLink to={`/search/${owner}/q`} className={styles.navLink}>
        <button className={location.pathname.includes("/search") ? styles.navItem1 : styles.navItem}>
          {" "}
          <Search className={styles.searchIcon} />
        </button>
      </NavLink>
    </div>
  );
};

export default Navigation;
