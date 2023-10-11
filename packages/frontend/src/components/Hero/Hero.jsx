import React, { useState, useEffect } from "react";
// import { useNavigation } from '@react-navigation/native';

import styles from "./Hero.module.css";
import { ReactComponent as SearchButton } from "../../images/searchButton.svg";
import { ReactComponent as Arrow } from "../../images/arrowHero.svg";
import { ReactComponent as SmallArrow } from "../../images/smallArrowBtn.svg";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { debounce } from 'lodash';

const axios = require("axios");

function Hero() {
  const [query, setQuery] = useState(undefined || "");
  console.log(query, "query");
  const { owner } = useParams();
  const [autoComplete, setAutoComplete] = useState([]);
  console.log(autoComplete, "autocomplete");
  const [isInputActive, setIsInputActive] = useState(false);
  // const navigation = useNavigation();

  useEffect(() => {
    if (query === '') {
      return;
    }
    const autoCompletes = async () => {
      const options = {
        method: "GET",
        url: "https://yummly2.p.rapidapi.com/feeds/auto-complete",
        params: { q: query },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await axios.request(options);

        const title = response.data.searches;
        if (title) {
          setAutoComplete(title);
        } else {
          setAutoComplete([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    autoCompletes();
  }, [query, ]);

  const handleChange = (value) => {
    if (value !== '') {
      setQuery(value);
    }
  };
  const handleSubmit = (e) => {
    
    if (query) {
      window.history.replaceState(null, "New Page Title", `/search/${owner}/${query}`);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headContainer}>
        <div className={styles.wrapper}>
          <div className={styles.headTitle}>
            <div>
              <span className={styles.title}>So</span>
              <span className={styles.title1}>Yummy</span>
            </div>
            <span className={styles.text}>
              "What to cook?" is not only a recipe app, it is, in fact, your
              cookbook. You can add your own recipes to save them for the
              future.
            </span>
          </div>

          <div className={styles.headButton}>
            <div className={styles.inputInside}>
              <form className={styles.inputFormBox} onSubmit={handleSubmit}>
                <div className={styles.inputForm}>
                  <input
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => setIsInputActive(true)}
                    onBlur={() => setIsInputActive(false)}
                    className={styles.input}
                    placeholder="Search your category"
                  ></input>
                  <button className={styles.inputButton} type="submit">
                    <SearchButton className={styles.inputButtonImage} />
                  </button>
                </div>
                {isInputActive && (
                  <div className={styles.searchResultsSugestions}>
                    {autoComplete.map((suggestion) => (
                      <div
                        key={suggestion}
                        onMouseDown={() => setQuery(suggestion)}
                        className={styles.searchResultsItem}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoContent}>
          <div className={styles.infoTextBox}>
            <div className={styles.infoTextBoxContainer}>
              <div className={styles.infoTextContent}>
                <span className={styles.greenText}>Delicious and healthy </span>
                <span className={styles.blackText}>
                  way to enjoy a variety of fresh ingredients in one satisfying
                  meal
                </span>
              </div>
              <div className={styles.infoTextButtonContainer}>
                <NavLink to={`/categories/${owner}`} className={styles.navLink}>
                  <button className={styles.infoTextButton}>
                    See Recipes
                    <SmallArrow />
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <Arrow className={styles.arrow} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
