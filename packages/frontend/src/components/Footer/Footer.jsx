import LogoFooter from "../../images/logoFooter.svg";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./Footer.module.css";
import { ReactComponent as Facebook } from "../../images/fb.svg";
import { ReactComponent as Twitter } from "../../images/twt.svg";
import { ReactComponent as Instagram } from "../../images/ig.svg";
import { ReactComponent as YouTube } from "../../images/yt.svg";

export const Footer = () => {
  const { owner } = useParams();

  return (
    <div>
      <div>
        <div>
          <div>
            <NavLink to={`/home/${owner}`}>
              <img
                src={LogoFooter}
                alt="wallet icon"
                className={styles.logoIcon}
              ></img>
            </NavLink>
            <span>So Yummy</span>
          </div>
          <div>
            <ul>
              <li>Database of recipes that can be replenished</li>
              <li>Flexible search for desired and unwanted ingredients</li>
              <li>Ability to add your own recipes with photos</li>
              <li>Convenient and easy to use</li>
            </ul>
          </div>
        </div>
        <div>
          <div className={styles.navContainer}>
            <NavLink to={`/categories/${owner}`} className={styles.navLink}>
              <button className={styles.navItem}>Categories</button>
            </NavLink>
            <NavLink to={`/add-recipes/${owner}`} className={styles.navLink}>
              <button className={styles.navItem}>Add Recipes</button>
            </NavLink>
            <NavLink to={`/my-recipes/${owner}`} className={styles.navLink}>
              <button className={styles.navItem}>My Recipes</button>
            </NavLink>
            <NavLink to={`/favorites/${owner}`} className={styles.navLink}>
              <button className={styles.navItem}>Favorites</button>
            </NavLink>
            <NavLink to={`/shopping-list/${owner}`} className={styles.navLink}>
              <button className={styles.navItem}>Shopping list</button>
            </NavLink>
          </div>
          <div>
            <Facebook />
            <YouTube />
            <Twitter />
            <Instagram />
          </div>
        </div>
        <div>
            <div>
                <h2>Subscribe to our Newsletter</h2>
                <span>Subscribe up to our newsletter. Be in touch with latest news and special offers, etc.</span>
                <div>
                    <input></input>
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
