import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import styles from "./Search.module.css";
import { ReactComponent as SearchButton } from "../../images/searchButton.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "../../components/Loader/Loader";


function Search() {
  const navigate = useNavigate();
  const { owner } = useParams();
  const { q } = useParams();
  const [query, setQuery] = useState(undefined || "");
  const [recipes, setRecipes] = useState([]);
  const [prevQuery, setPrevQuery] = useState(undefined || "");
  const [isInputActive, setIsInputActive] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (q !== "q") {
      
      setPrevQuery(q);
      const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(prevQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
    }
   
  }, [q, query, recipes, prevQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/");
    pathSegments[pathSegments.length - 1] = query;
    url.pathname = pathSegments.join("/");
    url.search = ""; 
    url.hash = ""; 

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
    
    setPrevQuery(query);
    setQuery("")
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    navigate(url.pathname);
    
  };

  const handleChange = (value) => {
    setQuery(value);
  };


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/all-recipes`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const recipes = data.recipes;
        setRecipes(recipes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    let words = [];
    recipes.forEach((recipe) => {
      let titleWords = recipe.title.toLowerCase().split(" ");
      let categoryWords = recipe.category.toLowerCase().split(" ");
      let areaWords = recipe.area.toLowerCase().split(" ");

      let allWords = [...titleWords, ...categoryWords, ...areaWords];
      allWords.forEach((word) => {
        if (
          word.includes(query.toLowerCase()) &&
          !word.startsWith("(") &&
          !word.endsWith(")") &&
          !word.endsWith(" )")
        ) {
          let cleanedWord = word.trim().replace(/[.,]$/, "");
          words.push(cleanedWord);
        }
      });
    });
    let uniqueWords = [...new Set(words)];
    setSuggestions(uniqueWords);
  }, [query, recipes]);

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
                {suggestions.slice(0, 15).map((suggestion) => (
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
      {filteredRecipes && filteredRecipes.length > 0 ? (
          filteredRecipes.slice((page - 1) * 8, page * 8).map((item, index) => (
            <NavLink
              key={index}
              to={`/recipes/${owner}/${item._id}`}
            >
              <div className={styles.categoryItem}>
                <img
                  src={item.preview}
                  alt={item.title}
                  className={styles.categoryItemPic}
                />
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {item.title}
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
          count={Math.ceil((filteredRecipes?.length || 0) / 8)}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
}

export default Search;
