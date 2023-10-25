// import { useState, useEffect } from "react";
// import { NavLink,  } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import styles from "./NoFound.module.css";
// import { ReactComponent as SearchButton } from "../../images/searchButton.svg";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import Loader from "../../components/Loader/Loader";

function NoFound() {
  return (
    <>
    <Header />
      <div className={styles.main}>
        
        <div className={styles.container}></div>
        <div className={styles.text}>
          <span className={styles.textHead}>We are sorry,</span>
          <span>but the page you were looking for can’t be found..</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NoFound;
