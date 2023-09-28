import styles from "./Recipe.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

function Recipe() {
  return (
    <div>
      <div className={styles.main}>
        <Header />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Footer />
    </div>
  );
}

export default Recipe;
