import { Box } from "@mui/material";
import Logo from "../../images/logo.svg";
import styles from "./StartPage.module.css";
import { ReactComponent as RegistrationButton } from "../../images/Registration.svg";
import { ReactComponent as SignIn } from "../../images/SignIn.svg";
import { Link, useNavigate } from "react-router-dom";

function StartPage() {
  return (
    <Box>
      <div className={styles.startContainter}>
        <div className={styles.form}>
          <img src={Logo} alt="logo icon" />
          <h1 className={styles.startHeadline}>Welcome to the app!</h1>
          <p className={styles.startText}>
            This app offers more than just a collection of recipes - it is
            designed to be your very own digital cookbook. You can easily save
            and retrieve your own recipes at any time.
          </p>
          <div>
            <Link to="/register">
              <button  className={styles.startButton}>
                <RegistrationButton className={styles.registrationButton} />
              </button>
            </Link>
            <Link to="/login">
            <button  className={styles.startButton}>
              <SignIn className={styles.signInButton} />
            </button>
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default StartPage;
