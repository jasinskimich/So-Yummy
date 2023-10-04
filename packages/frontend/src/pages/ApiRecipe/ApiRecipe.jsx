import styles from "./ApiRecipe.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import { ReactComponent as AddFav } from "../../images/favButton.svg";
import { ReactComponent as RemoveFav } from "../../images/removeBtn.svg";
import { ReactComponent as Clock } from "../../images/clock.svg";
import { ReactComponent as Checked } from "../../images/checked.svg";
import { ReactComponent as UnChecked } from "../../images/unchecked.svg";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios");

function ApiRecipe() {
  const { owner } = useParams();
  const { recipeId } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  console.log(recipe, "recipe");
  const [favorite, setFavorite] = useState(false);
  const trackingId = decodeURIComponent(recipeId);
  const parts = trackingId.split(",");
  const tag = parts.pop();

  useEffect(() => {
    const fetchIngredients = async () => {
      const options = {
        method: "GET",
        url: "https://yummly2.p.rapidapi.com/feeds/list",
        params: {
          limit: "24",
          start: "0",
          tag: tag,
        },
        headers: {
          "X-RapidAPI-Key":
            "b5506666d9msh49053d7448287e1p1b24fbjsn04cdf484a3aa",
          "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const recipes = response.data.feed;

        if (recipes) {
          const foundRecipe = recipes.find(
            (recipe) => recipe["tracking-id"] === trackingId
          );
          setRecipe({ ...foundRecipe, favorite: false });
          const recipeIngredients = foundRecipe.content.ingredientLines;
          const updatedIngredients = recipeIngredients.map((ingredient) => ({
            ...ingredient,
            checked: false,
          }));

          setIngredients(updatedIngredients);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchIngredients();
  }, [tag, trackingId]);

  //   const toggleFavorite = async () => {
  //     const requestOptions = {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ favorite: !favorite }),
  //     };

  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/api/recipes/${owner}/${recipeId}`,
  //         requestOptions
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to update favorite state");
  //       }

  //       const data = await response.json();
  //       setFavorite(!data.recipe.favorite);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const toggleFavorite = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      favorite: !prevRecipe.favorite,
    }));
  };
  const handleIngredientChange = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index
          ? { ...ingredient, checked: !ingredient.checked }
          : ingredient
      )
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <Header />
        <div className={styles.container}>
          <div className={styles.title}>
            <span className={styles.titleText}>
              {recipe && recipe.display && recipe.display.displayName ? (
                <span className={styles.titleText}>
                  {recipe.display.displayName}
                </span>
              ) : (
                <Loader />
              )}
            </span>
          </div>
          <div className={styles.about}>
            {recipe && recipe.content && recipe.content.description.text ? (
              <span>{recipe.content.description.text}</span>
            ) : (
              <Loader />
            )}
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.button} onClick={toggleFavorite}>
              {" "}
              {recipe && recipe.favorite ? <RemoveFav /> : <AddFav />}
            </button>
          </div>
          <div className={styles.cookingBox}>
            <Clock />
            <span className={styles.cookingTime}>
              {recipe && recipe.content && recipe.content.details.totalTime ? (
                <span>{recipe.content.details.totalTime}</span>
              ) : (
                <Loader />
              )}
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

        {ingredients && ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <div key={index} className={styles.detailsContainer}>
              <div className={styles.detailsFirst}>
                <div className={styles.imageBox}>{index + 1}</div>
                <div className={styles.name}>
                  <span>{ingredient.ingredient}</span>
                </div>
              </div>
              <div className={styles.detailsSecond}>
                <div className={styles.amount}>
                  <span>
                    {ingredient.amount.metric.quantity}{" "}
                    {ingredient.amount.metric.unit.abbreviation}
                  </span>
                </div>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    checked={ingredient.checked}
                    onChange={() => handleIngredientChange(index)}
                    className={styles.check}
                  />
                  {ingredient.checked ? <Checked /> : <UnChecked />}
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}

        <div className={styles.prepContainter}>
          <div className={styles.prepTextBox}>
            <span className={styles.prepTextTitle}>Recipe Preparation</span>
            {recipe && recipe.content && recipe.content.preparationSteps ? (
              <>
                {recipe.content.preparationSteps.map((step, index) => (
                  <span key={index} className={styles.prepText}>
                    {index + 1 + "."} {step}
                  </span>
                ))}
              </>
            ) : (
              <Loader />
            )}
          </div>
          <div className={styles.prepImageBox}>
            {recipe && recipe.display && recipe.display.images ? (
              <img
                src={recipe.display.images[0]}
                alt={recipe.display.displayName}
                className={styles.prepImage}
              />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ApiRecipe;
