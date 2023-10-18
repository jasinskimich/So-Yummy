import styles from "./Home.module.css";
import Hero from "../../components/Hero/Hero";
import { Footer } from "../../components/Footer/Footer";

import HomeCategories from "../../components/HomeCategories/HomeCategories";

function Home() {
  return (
    <div className={styles.main}>
      
      <Hero />
      <HomeCategories />
      <Footer />
    </div>
  );
}

export default Home;
