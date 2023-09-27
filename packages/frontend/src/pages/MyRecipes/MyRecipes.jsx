import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./MyRecipes.module.css";
import { ReactComponent as Delete } from "../../images/delete.svg";
import { ReactComponent as See } from "../../images/seeRecipe.svg";
import Loader from "../../components/Loader/Loader";
import ShowDeleteModal from "../../components/RecipeDeleteModal/ShowDeleteModal";
import Notiflix from "notiflix";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function MyRecipes() {
  const { owner } = useParams();
  const [recipes, setRecipes] = useState([]);
  console.log(recipes, "recipes");
  const [page, setPage] = useState(1);
  const [updatedRecipes, setDeletedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/recipes/${owner}`,
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
        setRecipes(response.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, [owner]);

  const updateDeleteRecipes = (deletedTransaction, newBalance) => {
    setDeletedRecipes((prevDeletedTransactions) =>
      prevDeletedTransactions.concat(deletedTransaction._id)
    );
    updateBalance(newBalance);
    Notiflix.Notify.success("Transaction deleted");
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <span className={styles.title}>My recipes</span>
      </div>
      {recipes && recipes.length > 0 ? (
        recipes.slice((page - 1) * 4, page * 4).map((item, index) => (
          <div key={index} className={styles.itemContainer}>
            <div className={styles.itemImageBox}>
              <img
                src={item.picture}
                alt={item.name}
                className={styles.itemImageBox}
              />
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.top}>
                <span className={styles.itemTitle}>{item.name}</span>
          
                <ShowDeleteModal id={item._id}
                        updateDeleteTransactions={updateDeleteTransactions}/>
              </div>
              <div className={styles.mid}>
                <span className={styles.description}>{item.about}</span>
              </div>
              <div className={styles.bottom}>
                <div className={styles.cookingTimeBox}>
                  {" "}
                  {item.cookingTime >= 60
                    ? `${Math.floor(item.cookingTime / 60)} hr ${
                        item.cookingTime % 60
                      } min`
                    : `${item.cookingTime} min`}
                </div>
                <button className={styles.recipeButton}>
                  <See />
                </button>
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

export default MyRecipes;
