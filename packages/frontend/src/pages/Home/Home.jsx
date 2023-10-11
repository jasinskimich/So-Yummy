import styles from "./Home.module.css";
import Hero from "../../components/Hero/Hero";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

import HomeCategories from "../../components/HomeCategories/HomeCategories";

function Home() {
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
