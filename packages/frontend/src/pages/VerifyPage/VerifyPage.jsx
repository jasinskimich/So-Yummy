import { Box } from "@mui/material";
import VerifyForm from "../../components/VerifyForm/VerifyForm";
import css from "./VerifyPage.module.css";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Verify() {
  return (
    <Box className={css.margins}>
      <div className={css.verifyHeader}>
        <Link to="/" className={css.verifyLink}>
          <h1>So Yummy!</h1>
          <img src={Logo} alt="logo icon" />
        </Link>
      </div>

      <div className={css.main}>
        <VerifyForm />
      </div>
    </Box>
  );
}

export default Verify;
