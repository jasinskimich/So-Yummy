import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { ModalLogout } from '../ModalLogout/ModalLogout';
import { useParams } from "react-router-dom";
import Logo from "../../images/logo.svg";
import styles from "./Header.module.css";
import avatarImage from "../../images/avatarDefault.jpg";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";
import { ReactComponent as Menu } from "../../images/modalWindow.svg";
import MobileMenu from "../MobileMenu/MobileMenu";
import Navigation from "../Navigation/Navigation";

export const Header = () => {
  const [name, setName] = useState("");
  const { owner } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

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
      <Navigation />
      <div className={styles.userNav}>
        <div className={styles.user}>
          <button className={styles.avatar}>
            <img
              src={avatarImage}
              alt="Avatar"
              className={styles.avatarImage}
            />
          </button>
          <button className={styles.username}>
            <span className={styles.usernameText}>{name}</span>
          </button>
        </div>
        <div className={styles.switchCheckbox}>
          <SwitchCheckbox id="header"/>
        </div>
        <div className={styles.modalWindow}>
          {" "}
          <button
            className={styles.modalWindowButton}
            onClick={handleModalOpen}
          >
            <Menu />
          </button>
          <MobileMenu
            handleModalOpen={handleModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>
    </div>
  );
};
