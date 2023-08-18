import React from "react";
import { Box } from "@mui/material";
import css from "./NewPasswordPage.module.css";
import NewPasswordForm from "../../components/NewPasswordForm/NewPasswordForm";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";

const NewPasswordPage = () => {
  return (
    <Box className={css.margins}>
      <div className={css.newPasswordHeader}>
        <Link to="/" className={css.verifyLink}>
          <h1>So Yummy!</h1>
          <img src={Logo} alt="logo icon" />
        </Link>
      </div>
      <div className={css.main}>
        <NewPasswordForm />
      </div>
    </Box>
  );
};

export default NewPasswordPage;
