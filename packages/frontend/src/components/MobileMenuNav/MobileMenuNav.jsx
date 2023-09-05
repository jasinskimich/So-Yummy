import { ReactComponent as Search } from "../../images/search.svg";
import { NavLink } from "react-router-dom";
import styles from "./MobileMenuNav.module.css";
import { useParams } from "react-router-dom";
import React from "react";

export const MobileMenuNav = ({ handleCloseModal }) => {
  const { owner } = useParams();

  return (
    <div className={styles.navContainer}>
      <NavLink to={`/categories/${owner}`} className={styles.navLink}>
        <button className={styles.navItem} onClick={handleCloseModal}>
          <span>Categories</span>
        </button>
      </NavLink>
      <NavLink to={`/add-recipes/${owner}`} className={styles.navLink}>
        <button className={styles.navItem} onClick={handleCloseModal}>
          <span>Add Recipes</span>
        </button>
      </NavLink>
      <NavLink to={`/my-recipes/${owner}`} className={styles.navLink}>
        <button className={styles.navItem} onClick={handleCloseModal}>
          <span>My Recipes</span>
        </button>
      </NavLink>
      <NavLink to={`/favorites/${owner}`} className={styles.navLink}>
        <button className={styles.navItem} onClick={handleCloseModal}>
          <span>Favorites</span>
        </button>
      </NavLink>
      <NavLink to={`/shopping-list/${owner}`} className={styles.navLink}>
        <button className={styles.navItem} onClick={handleCloseModal}>
          {" "}
          <span>Shopping list</span>
        </button>
      </NavLink>
      <NavLink
        to={`/search/${owner}`}
        className={styles.navLink}
        onClick={handleCloseModal}
      >
        <button className={styles.navItem}>
          {" "}
          <Search className={styles.searchIcon} />
          <span>Search</span>
        </button>
      </NavLink>
    </div>
  );
};

export default MobileMenuNav;
