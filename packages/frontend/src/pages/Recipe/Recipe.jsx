import styles from "./Recipe.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ReactComponent as AddFav } from "../../images/favButton.svg";
import { ReactComponent as RemoveFav } from "../../images/removeBtn.svg";
import { ReactComponent as Clock } from "../../images/clock.svg";
import { ReactComponent as Checked } from "../../images/checked.svg";
import { ReactComponent as UnChecked } from "../../images/unchecked.svg";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const updateSelectedIngredients = async (checked, owner, recipeId, ingId) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ checked: checked }),
  };

  try {
    const response = await fetch(
      `http://localhost:5000/api/recipes/${owner}/${recipeId}/${ingId}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Failed to update selected ingredients");
    }

  } catch (error) {
    console.error(error);
  }
};

function Recipe() {
  const { owner } = useParams();
  const { recipeId } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [ingId, setIngId] = useState("");

  const toggleFavorite = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite: !favorite }),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/recipes/${owner}/${recipeId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite state");
      }

      const data = await response.json();
      setFavorite(!data.recipe.favorite);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/recipes/${owner}/${recipeId}`,
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
        setRecipe(response.recipe);
        setFavorite(response.recipe.favorite);
        setIngredients(response.ingredients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredients();
  }, [owner, recipeId]);

  const checkedRef = useRef(false);

  const handleIngredientChange = async (id, checked) => {
    setIngId(id);
    checkedRef.current = checked;
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient._id === id ? { ...ingredient, checked } : ingredient
      )
    );
  };

  useEffect(() => {
    if (ingId) {
      updateSelectedIngredients(checkedRef.current, owner, recipeId, ingId);
    }
  }, [ingId, owner, recipeId]);

  return (
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <Header />
        <div className={styles.container}>
          <div className={styles.title}>
            <span className={styles.titleText}>{recipe.title}</span>
          </div>
          <div className={styles.about}>
            <span>{recipe.about}</span>
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.button} onClick={toggleFavorite}>
              {" "}
              {!favorite ? <AddFav /> : <RemoveFav />}
            </button>
          </div>
          <div className={styles.cookingBox}>
            <Clock />
            <span className={styles.cookingTime}>
              {" "}
              {recipe.cookingTime >= 60
                ? `${Math.floor(recipe.cookingTime / 60)} hr ${
                    recipe.cookingTime % 60
                  } min`
                : `${recipe.cookingTime} min`}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoHead}>
          <div className={styles.front}>
            <span>Ingredients</span>
          </div>
          <div className={styles.back}>
            <span>Amount</span>
            <span>Add to list</span>
          </div>
        </div>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.detailsContainer}>
            <div className={styles.detailsFirst}>
              <div className={styles.imageBox}>
                <img
                  className={styles.ingredientImage}
                  src={ingredient.thb}
                  alt="ingridientPicture"
                />
              </div>
              <div className={styles.name}>
                <span>{ingredient.name}</span>
              </div>
            </div>
            <div className={styles.detailsSecond}>
              <div className={styles.amount}>
                <span>
                  {ingredient.amount} {ingredient.measurement}
                </span>
              </div>
              <div className={styles.checkBox}>
                <input
                  type="checkbox"
                  checked={ingredient.checked}
                  onChange={() =>
                    handleIngredientChange(ingredient._id, !ingredient.checked)
                  }
                  className={styles.check}
                />
                {ingredient.checked ? <Checked /> : <UnChecked />}
              </div>
            </div>
          </div>
        ))}

        <div className={styles.prepContainter}>
          <div className={styles.prepTextBox}>
            <span className={styles.prepTextTitle}>Recipe Preparation</span>
            <span className={styles.prepText}>{recipe.preparation}</span>
          </div>
          <div className={styles.prepImageBox}>
            <img
              src={recipe.picture}
              alt={recipe.title}
              className={styles.prepImage}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Recipe;
