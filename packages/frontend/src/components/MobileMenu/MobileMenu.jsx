import React from "react";
import styles from "./MobileMenu.module.css";
import MobileMenuNav from "../MobileMenuNav/MobileMenuNav";
import { ReactComponent as Close } from "../../images/closeModal.svg";
import { NavLink } from "react-router-dom";
import Logo from "../../images/logo.svg";
import { useParams } from "react-router-dom";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";

const MobileMenu = ({ handleModalOpen, isModalOpen }) => {
  const { owner } = useParams();

  const handleCloseModal = () => {
    handleModalOpen(false);
  };

  if (!isModalOpen) {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.logo}>
              <NavLink to={`/home/${owner}`}>
                <button onClick={handleCloseModal}>
                  <img
                    src={Logo}
                    alt="wallet icon"
                    className={styles.logoIcon}
                  ></img>
                </button>
              </NavLink>
            </div>

            <button onClick={handleCloseModal} className={styles.closeButton}>
              <Close className={styles.closeModal} />
            </button>
          </div>
          <div className={styles.modalNavContainer}>
            {" "}
            <MobileMenuNav />
          </div>
          <div className={styles.switchCheckbox}>
            <SwitchCheckbox id="modal-menu" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.modalContainer2}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.logo}>
              <NavLink to={`/home/${owner}`}>
                <img
                  src={Logo}
                  alt="wallet icon"
                  className={styles.logoIcon}
                  onClick={handleCloseModal}
                ></img>
              </NavLink>
            </div>

            <button onClick={handleCloseModal} className={styles.closeButton}>
              <Close className={styles.closeModal} />
            </button>
          </div>
          <div className={styles.modalNavContainer}>
            {" "}
            <MobileMenuNav handleCloseModal={handleCloseModal} />
          </div>
          <div className={styles.switchCheckbox}>
            <SwitchCheckbox id="modal-menu" />
          </div>
        </div>
      </div>
    );
  }
};
export default MobileMenu;
