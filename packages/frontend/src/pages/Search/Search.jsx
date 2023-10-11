import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { NavLink, useParams, useNavigate  } from "react-router-dom";

import styles from "./Search.module.css";
import { ReactComponent as SearchButton } from "../../images/searchButton.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "../../components/Loader/Loader";

const axios = require("axios");

function Search() {
  //   const { owner } = useParams();
  const [query, setQuery] = useState(undefined || "");
  const [autoComplete, setAutoComplete] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [prevQuery, setPrevQuery] = useState(undefined || "");
  const [isInputActive, setIsInputActive] = useState(false);
  const [page, setPage] = useState(1);
  const { owner } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { q } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const autoComplete = async () => {
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
    autoComplete();
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    pathSegments[pathSegments.length - 1] = query;
    url.pathname = pathSegments.join('/');
    url.search = ''; // clear the search parameters
    url.hash = ''; // clear the hash
    const options = {
      method: "GET",
      url: "https://yummly2.p.rapidapi.com/feeds/search",
      params: {
        start: "0",
        maxResult: "24",
        q: query,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      },
    };
  
    try {
      const response = await axios.request(options);
      const fetchedRecipes = response.data.feed;
      setRecipes(fetchedRecipes);
      setPrevQuery(query);
      setQuery("");
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    navigate(url.pathname);
  };

  const handleChange = (value) => {
    setQuery(value);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const options = {
        method: "GET",
        url: "https://yummly2.p.rapidapi.com/feeds/search",
        params: {
          start: "0",
          maxResult: "24",
          q: q,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };
  
      try {
        const response = await axios.request(options);
  
        const fetchedRecipes = response.data.feed;
        console.log(fetchedRecipes," recipes");
        setRecipes(fetchedRecipes);
        setPrevQuery(q);
        setQuery("");
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      
    };
  
    if (q !== "q") {
      fetchRecipes();
    }
  }, [q, query]);


  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <span className={styles.title}>Search</span>
      </div>

      <div className={styles.headButton}>
        <div className={styles.inputInside}>
          <form className={styles.inputField} onSubmit={handleSubmit}>
            <div className={styles.inputForm}>
              {" "}
              <input
                value={query}
                className={styles.input}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setIsInputActive(true)}
                onBlur={() => setIsInputActive(false)}
                placeholder="Type your query.."
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
      {isLoading && <Loader />}
      <div>
        {" "}
        {prevQuery === "" ? (
          <span></span>
        ) : (
          <span>
            <b>Searched query:</b> {prevQuery}
          </span>
        )}{" "}
      </div>

      <div className={styles.searchResults}>
        {recipes && recipes.length > 0 ? (
          recipes.slice((page - 1) * 8, page * 8).map((item, index) => (
            <NavLink
              key={index}
              to={`/recipes/${owner}/${encodeURIComponent(
                item["tracking-id"]
              )}`}
            >
              <div className={styles.categoryItem}>
                <img
                  src={item.display.images[0]}
                  alt={item.display.displayName}
                  className={styles.categoryItemPic}
                />
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {item.display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <>
            <div className={styles.classicContainer}>
              <div className={styles.classicView}></div>
              <span>Try looking for something..</span>
            </div>
          </>
        )}
      </div>

      <Stack spacing={2}>
        <Pagination
          count={Math.ceil((recipes?.length || 0) / 8)}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
}

export default Search;
