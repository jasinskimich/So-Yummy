import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { ModalLogout } from '../ModalLogout/ModalLogout';
import { useParams } from "react-router-dom";
import Logo from "../../images/logo.svg";
import styles from "./Header.module.css";
import { ReactComponent as Search } from "../../images/search.svg";
import avatarImage from "../../images/avatarDefault.jpg";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";

export const Header = () => {
  const [name, setName] = useState("");
  const { owner } = useParams();
  useEffect(() => {
    const fetchName = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/users/name/${owner}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }

        response = await response.json();

        setName(response.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchName();
  }, [owner]);

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <NavLink to={`/home/${owner}`}>
          <img src={Logo} alt="wallet icon" className={styles.logoIcon}></img>
        </NavLink>
      </div>
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
      <div className={styles.userNav}>
        <button className={styles.avatar}>
          <img src={avatarImage} alt="Avatar" className={styles.avatarImage} />
        </button>
        <button className={styles.username}>
          <span className={styles.usernameText}>{name}</span>
        </button>
        <SwitchCheckbox />
      </div>
    </div>
  );
};
