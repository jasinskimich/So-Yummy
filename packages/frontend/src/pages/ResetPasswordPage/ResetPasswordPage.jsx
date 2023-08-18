import { Box } from "@mui/material";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import css from "./ResetPasswordPage.module.css";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";



function ResetPassword() {
  return (
    <Box className={css.margins}>
      <div className={css.verifyHeader}>
        <Link to="/" className={css.verifyLink}>
          <h1>So Yummy!</h1>
          <img src={Logo} alt="logo icon" />
        </Link>
      </div>
      <div className={css.main}>
        <ResetPasswordForm />
      </div>
    </Box>
  );
}

export default ResetPassword;
