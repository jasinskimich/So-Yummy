import LogoFooter from "../../images/logoFooter.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./Footer.module.css";
import { ReactComponent as Facebook } from "../../images/fb.svg";
import { ReactComponent as Twitter } from "../../images/twt.svg";
import { ReactComponent as Instagram } from "../../images/ig.svg";
import { ReactComponent as YouTube } from "../../images/yt.svg";
import { FormControl, InputAdornment, Input } from "@mui/material";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import { useForm } from "react-hook-form";

export const Footer = () => {
  const { owner } = useParams();
  const location = useLocation();
  const { handleSubmit } = useForm();


  const onSubmit = async (data) => {
    const { email } = data;

    // Check if the email is in the database
    const response = await fetch(`http://localhost:5000/api/users/${email}`);
    const user = await response.json();

    if (user) {
      if (user.newsletter) {
        // Email is already signed up for the newsletter
        console.log("This email is already signed up for the newsletter");
      } else {
        // Update the newsletter field to true
        await fetch(`http://localhost:5000/api/users/${email}`, {
          method: "PUT",
          body: JSON.stringify({ newsletter: true }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Successfully subscribed to the newsletter");
      }
    } else {
      // Email not found in the database
      console.log("Email not found");
    }
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.footerContainer}>
          <div className={styles.topContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>
                <NavLink to={`/home/${owner}`}>
                  <img
                    src={LogoFooter}
                    alt="Yummy icon"
                    className={styles.logoIcon}
                  ></img>
                </NavLink>
                <NavLink to={`/home/${owner}`}>
                  <span className={styles.logoText}>So Yummy</span>
                </NavLink>
              </div>
              <div className={styles.description}>
                <ul className={styles.descriptionList}>
                  <li>Database of recipes that can be replenished</li>
                  <li>Flexible search for desired and unwanted ingredients</li>
                  <li>Ability to add your own recipes with photos</li>
                  <li>Convenient and easy to use</li>
                </ul>
              </div>
            </div>
            <div className={styles.midContainer}>
              <div className={styles.navContainer}>
                <NavLink to={`/categories/${owner}`} className={styles.navLink}>
                  <button className={location.pathname.includes("/categories") ? styles.navItem1 : styles.navItem}>Categories</button>
                </NavLink>
                <NavLink
                  to={`/add-recipes/${owner}`}
                  className={styles.navLink}
                >
                  <button className={location.pathname.includes("/add-recipes") ? styles.navItem1 : styles.navItem}>Add Recipes</button>
                </NavLink>
                <NavLink to={`/my-recipes/${owner}`} className={styles.navLink}>
                  <button className={location.pathname.includes("/my-recipes") ? styles.navItem1 : styles.navItem}>My Recipes</button>
                </NavLink>
                <NavLink to={`/favorites/${owner}`} className={styles.navLink}>
                  <button className={location.pathname.includes("/favorites") ? styles.navItem1 : styles.navItem}>Favorites</button>
                </NavLink>
                <NavLink
                  to={`/shopping-list/${owner}`}
                  className={styles.navLink}
                >
                  <button className={location.pathname.includes("/shopping-list") ? styles.navItem1 : styles.navItem}>Shopping list</button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className={styles.newsletterContainer}>
            <span className={styles.newsletterTitle}>
              Subscribe to our Newsletter
            </span>
            <span className={styles.newsletterText}>
              Subscribe up to our newsletter. Be in touch with latest news and
              special offers, etc.
            </span>
            <div className={styles.inputContainer}>
              <FormControl
                variant="outlined"
                className={styles.inputWidthFirst}
              >
                <Input
                  type="email"
                  id="email"
                  name="email"
                  onSubmit={handleSubmit(onSubmit)}
                  // value={email}
                  // onChange={(e) => handleInputChange(e)}
                  placeholder="Enter your email address"
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
              <button className={styles.submitButton} type="submit">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className={styles.socialContainer}>
          <div className={styles.socialIcon}>
            {" "}
            <Facebook />
          </div>
          <div className={styles.socialIcon}>
            {" "}
            <YouTube />
          </div>
          <div className={styles.socialIcon}>
            {" "}
            <Twitter />
          </div>
          <div className={styles.socialIcon}>
            {" "}
            <Instagram />
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <span className={styles.rightsText}>© 2023 All Rights Reserved.</span>
        <button className={styles.tremOfUse}>Terms of Service</button>
      </div>
    </div>
  );
};
