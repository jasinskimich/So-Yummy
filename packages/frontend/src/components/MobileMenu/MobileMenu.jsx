import React from "react";
import styles from "./MobileMenu.module.css";

const MobileMenu = ({handleModalOpen}) => {
    
    const handleCloseModal = () => {
        handleModalOpen(false)
    }

  return <div className={styles.modalContainer}>
    <button onClick={handleCloseModal}>
        X
    </button>
  </div>;
};

export default MobileMenu;
