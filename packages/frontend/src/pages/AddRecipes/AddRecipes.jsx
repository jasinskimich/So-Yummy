import React from "react";
// import Dropdown from "react-bootstrap/Dropdown";
import styles from "./AddRecipes.module.css";
import { ReactComponent as Facebook } from "../../images/fb.svg";
import { ReactComponent as Twitter } from "../../images/twt.svg";
import { ReactComponent as Instagram } from "../../images/ig.svg";
import { ReactComponent as YouTube } from "../../images/yt.svg";
import AddForm from "../../components/AddForm/AddForm";
import Popular from "../../components/Popular/Popular";

function AddReceipes() {
  const FacebookIcon = () => {
    return (
      <div
        className={styles.socialIcon}
        onClick={() => window.open("https://www.facebook.com")}
      >
        <Facebook />
      </div>
    );
  };

  const TwitterIcon = () => {
    return (
      <div
        className={styles.socialIcon}
        onClick={() => window.open("https://www.twitter.com")}
      >
        <Twitter />
      </div>
    );
  };

  const InstagramIcon = () => {
    return (
      <div
        className={styles.socialIcon}
        onClick={() => window.open("https://www.instagram.com")}
      >
        <Instagram />
      </div>
    );
  };

  const YouTubeIcon = () => {
    return (
      <div
        className={styles.socialIcon}
        onClick={() => window.open("https://www.youtube.com")}
      >
        <YouTube />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.pageTitleBox}>
          <span className={styles.pageTitle}>Add recipe</span>
        </div>
        <div className={styles.contentContainer}>
          <AddForm />
          <div className={styles.side}>
            <div className={styles.socialContainer}>
              {" "}
              <div>
                <span className={styles.socialText}>Follow us</span>
              </div>
              <div className={styles.socialIconsContainer}>
                <FacebookIcon />
                <YouTubeIcon />
                <TwitterIcon />
                <InstagramIcon />
              </div>
            </div>
            <Popular />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReceipes;
