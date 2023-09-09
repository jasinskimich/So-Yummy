import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { ModalLogout } from '../ModalLogout/ModalLogout';
import Logo from "../../images/logo.svg";
import styles from "./Header.module.css";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";
import { ReactComponent as Menu } from "../../images/modalWindow.svg";
import MobileMenu from "../MobileMenu/MobileMenu";
import Navigation from "../Navigation/Navigation";
import SettingsModal from "../SettingsModal/SettingsModal";
import { useParams } from "react-router-dom";

export const Header = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { owner } = useParams();


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
         
          <SettingsModal/>
            
          
        </div>
        <div className={styles.switchCheckbox}>
          <SwitchCheckbox id="header" />
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
