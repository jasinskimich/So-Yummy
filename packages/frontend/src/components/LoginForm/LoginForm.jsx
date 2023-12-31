import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { useState } from "react";
import { Box, FormControl, InputAdornment, Input } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import styles from "./LoginForm.module.css";
import Loader from "../Loader/Loader";

const LoginForm = ({ setLoggedName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    try {
      let response = await fetch(
        `https://so-yummy-1f2e.onrender.com/api/users/checkEmail/${email}`
      );
      let data = await response.json();

      if (!data.exists) {
        Notiflix.Notify.warning("Email or password is incorrect.");
        setIsLoading(true);
        return;
      }

      let result = await fetch(
        "https://so-yummy-1f2e.onrender.com/api/users/login",
        {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let loginResponse = await result.json();

      if (loginResponse?.data?.user?._id) {
        let id = loginResponse.data.user._id;
        let name = loginResponse.data.user.name;

        localStorage.setItem("authToken", loginResponse.data.token);
        localStorage.setItem("userName", name);

        setLoggedName(name);

        navigate(`/home/${id}`);

        setEmail("");
        setPassword("");
      } else {
        Notiflix.Notify.warning("Email or password is incorrect.");
        setIsLoading(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ "& > :not(style)": { m: 1 } }} className={styles.loginBox}>
        <div className={styles.loginFormHeader}>
          <p className={styles.loginHeaderText}>Sign In</p>
        </div>
        <FormControl variant="outlined" className={styles.inputWidthFirst}>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
            autoComplete="userName"
            required
            className={styles.inputMarginFirst}
            startAdornment={
              <InputAdornment position="start">
                <LocalPostOfficeIcon
                  sx={{ color: "lightgrey", mr: 1, my: 0.5 }}
                  className={styles.iconMarginPost}
                />
              </InputAdornment>
            }
            inputProps={{
              style: { color: "white" },
            }}
          />
        </FormControl>
        <FormControl variant="outlined" className={styles.inputWidth}>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
            minLength={6}
            maxLength={12}
            autoComplete="current-password"
            required
            className={styles.inputMargin}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon
                  sx={{ color: "lightgrey", mr: 1, my: 0.5 }}
                  className={styles.iconMargin}
                />
              </InputAdornment>
            }
            inputProps={{
              style: { color: "white" },
            }}
          />
        </FormControl>

        {isLoading ? (
          <>
            <button
              variant="contained"
              type="submit"
              className={styles.loginButton}
            >
              Sign In
            </button>

            <Link to="/register" className={styles.regLink}>
              <button className={styles.registrationButton}>Sign Up</button>
            </Link>
          </>
        ) : (
          <Loader />
        )}
        {/* <button
          variant="contained"
          type="submit"
          className={styles.loginButton}
        >
          Sign In
        </button>

        <Link to="/register" className={styles.regLink}>
          <button className={styles.registrationButton}>Sign Up</button>
        </Link> */}

        <div>
          <Link to="/reset-password">
            <span className={styles.verifyLink}>Forgot Password?</span>
          </Link>
        </div>
      </Box>
    </form>
  );
};

export default LoginForm;
