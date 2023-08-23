import { Box } from "@mui/material";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import css from "./ResetPasswordPage.module.css";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";

function ResetPassword() {
  return (
    <Box >
      <div className={css.resetContainer}>
        <div className={css.resetHeader}>
          <Link to="/" className={css.resetLink}>
            <h1>So Yummy!</h1>
            <img src={Logo} alt="logo icon" />
          </Link>
        </div>
        <div className={css.resetFormConteiner}>
          <ResetPasswordForm />
        </div>
      </div>
    </Box>
  );
}

export default ResetPassword;
