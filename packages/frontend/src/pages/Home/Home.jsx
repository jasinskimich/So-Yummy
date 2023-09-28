// import { Box } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import styles from "./Home.module.css";
import Hero from "../../components/Hero/Hero";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

import HomeCategories from "../../components/HomeCategories/HomeCategories";

function Home() {
  //   const { owner } = useParams();

  return (
    <div className={styles.main}>
      <Header />
      <Hero />
      <HomeCategories />
      <Footer />
    </div>
  );
}

export default Home;
