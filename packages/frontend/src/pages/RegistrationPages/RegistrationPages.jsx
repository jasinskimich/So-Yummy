import React from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPages.module.css";
import { Box } from "@mui/material";
// import RegistrationPageIcon from "../../images/RegistrationPageIcon.svg";

const RegistrationPages = () => {
  return (
    <Box>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <div className={styles.logoPicture}></div>
        </div>
        <div className={styles.registrationFormContainer}>
          <RegistrationForm />
        </div>
      </div>
    </Box>
  );
};

export default RegistrationPages;
