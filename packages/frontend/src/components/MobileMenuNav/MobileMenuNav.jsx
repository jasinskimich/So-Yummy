import { ReactComponent as Search } from "../../images/search.svg";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./MobileMenuNav.module.css";
import { useParams } from "react-router-dom";
import React from "react";

export const MobileMenuNav = ({ handleCloseModal }) => {
  const { owner } = useParams();
  const location = useLocation();

  return (
    <div className={styles.navContainer}>
      <NavLink to={`/categories/${owner}/american`} className={styles.navLink}>
        <button className={location.pathname.includes("/categories") ? styles.navItem1 : styles.navItem} onClick={handleCloseModal}>
          <span>Categories</span>
        </button>
      </NavLink>
      <NavLink to={`/add-recipes/${owner}`} className={styles.navLink}>
        <button className={location.pathname.includes("/add-recipes") ? styles.navItem1 : styles.navItem} onClick={handleCloseModal}>
          <span>Add Recipes</span>
        </button>
      </NavLink>
      <NavLink to={`/my-recipes/${owner}`} className={styles.navLink}>
        <button className={location.pathname.includes("/my-recipes") ? styles.navItem1 : styles.navItem} onClick={handleCloseModal}>
          <span>My Recipes</span>
        </button>
      </NavLink>
      <NavLink to={`/favorites/${owner}`} className={styles.navLink}>
        <button className={location.pathname.includes("/favorites") ? styles.navItem1 : styles.navItem} onClick={handleCloseModal}>
          <span>Favorites</span>
        </button>
      </NavLink>
      <NavLink to={`/shopping-list/${owner}`} className={styles.navLink}>
        <button className={location.pathname.includes("/shopping-list") ? styles.navItem1 : styles.navItem} onClick={handleCloseModal}>
          {" "}
          <span>Shopping list</span>
        </button>
      </NavLink>
      <NavLink
        to={`/search/${owner}`}
        className={styles.navLink}
        onClick={handleCloseModal}
      >
        <button className={location.pathname.includes("/search") ? styles.navItem1 : styles.navItem}>
          {" "}
          <Search  className={location.pathname.includes("/search") ? styles.searchIcon1 : styles.searchIcon}/>
          <span>Search</span>
        </button>
      </NavLink>
    </div>
  );
};

export default MobileMenuNav;
