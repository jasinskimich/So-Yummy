// import { Box } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import styles from "./Home.module.css";
import Hero from "../../components/Hero/Hero";

import HomeCategories from "../../components/HomeCategories/HomeCategories";

function Home() {
  //   const { owner } = useParams();

  return (
    <div>
      <Hero />
      <HomeCategories/>
    </div>
  );
}

export default Home;
