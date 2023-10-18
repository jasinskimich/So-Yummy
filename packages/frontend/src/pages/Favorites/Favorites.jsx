import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import styles from "./Favorites.module.css";
import { ReactComponent as See } from "../../images/seeRecipe.svg";
import Loader from "../../components/Loader/Loader";
import DeleteModal from "../../components/FavoriteDeleteModal/DeleteModal";
import Notiflix from "notiflix";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Favorites() {
  const { owner } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [deletedRecipes, setDeletedRecipes] = useState([]);

  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/fav-recipes/${owner}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        response = await response.json();
        console.log(response.recipes, "response");
        setRecipes(response.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, [owner]);

  const updateDeleteRecipes = (deletedRecipe) => {
    setDeletedRecipes((prevDeletedRecipe) =>
      prevDeletedRecipe.concat(deletedRecipe._id)
    );
    Notiflix.Notify.success("Recipe deleted");
  };

  const filteredRecipes = recipes.filter(
    (item) => !deletedRecipes.includes(item._id)
  );

  function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }
  function convertTime(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
  
    let result = '';
  
    if (hours > 0) {
      result += `${hours} hr `;
    }
  
    if (minutes > 0) {
      result += `${minutes} min`;
    }
  
    return result.trim();
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <span className={styles.title}>Favorites</span>
      </div>
      {filteredRecipes && filteredRecipes.length > 0 ? (
        filteredRecipes.slice((page - 1) * 4, page * 4).map((item, index) => (
          <div key={index} className={styles.itemContainer}>
            <div className={styles.itemImageBox}>
              <img
                src={item.picture}
                alt={item.title}
                className={styles.itemImageBox}
              />
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.top}>
                <span className={styles.itemTitle}>{item.title}</span>

                <DeleteModal
                  id={item._id}
                  updateDeleteRecipes={updateDeleteRecipes}
                />
              </div>
              <div className={styles.mid}>
                <span className={styles.description}> {truncateString(item.about, 200)} </span>
              </div>
              <div className={styles.bottom}>
                <div className={styles.cookingTimeBox}>
                {convertTime(item.cookingTime)}
                </div>
                <NavLink
                  to={`/recipes/${owner}/${encodeURIComponent(item.id)}`}
                  className={styles.navLink}
                >
                  <button className={styles.recipeButton}>
                    <See className={styles.recipeButtonImg} />
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}

      <Stack spacing={2}>
        <Pagination
          count={Math.ceil((recipes?.length || 0) / 4)}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
}

export default Favorites;
