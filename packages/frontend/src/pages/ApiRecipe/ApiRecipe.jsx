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
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  console.log(favoriteRecipes, "favoriteRecipes");
  const trackingId = decodeURIComponent(recipeId);
  const parts = trackingId.split(",");
  const tag = parts.pop();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRendered(true);
    }, 8000);
  }, []);
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
        // console.log(response.recipes, "response");
        setFavoriteRecipes(response.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, [owner]);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/shopping-list/${owner}`,
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

        setShoppingList(response.shoppingList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShoppingList();
  }, [owner]);

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
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await axios.request(options);
        const recipes = response.data.feed;

        if (recipes) {
          const foundRecipe = recipes.find(
            (recipe) => recipe["tracking-id"] === trackingId
          );

          const isFavorite = favoriteRecipes.some(
            (recipe) => recipe.id === foundRecipe["tracking-id"]
          );
          setRecipe({ ...foundRecipe, favorite: isFavorite });
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
  }, [tag, trackingId, favoriteRecipes]);

  const toggleFavorite = async () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      favorite: !prevRecipe.favorite,
    }));

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      url: `http://localhost:5000/api/recipes/${owner}`,
      data: {
        id: recipe["tracking-id"] ?? "N/A",
        picture: recipe.display?.images[0] ?? "N/A",
        title: recipe.display?.displayName ?? "N/A",
        about: recipe.content?.description?.text ?? "N/A",
        cookingTime: recipe.content?.details?.totalTime ?? "N/A",
        preparation: recipe.content?.preparationSteps ?? "N/A",
        ingredients: recipe.content?.ingredientLines ?? "N/A",
      },
    };

    try {
      await axios(requestOptions);
      console.log("Favorite updated successfully");
    } catch (error) {
      console.error("Error updating favorite", error);
    }
  };

  const handleIngredientChange = async (index, ingredient) => {
    setIngredients((prevIngredients) =>
    prevIngredients.map((ingredient, i) =>
      i === index
        ? { ...ingredient, checked: !ingredient.checked }
        : ingredient
    )
  );

  setShoppingList((prevShoppingList) => {
    // If the ingredient is already in the shopping list, remove it
    if (prevShoppingList.some((item) => item.id === ingredient.id)) {
      return prevShoppingList.filter((item) => item.id !== ingredient.id);
    }
    // If the ingredient is not in the shopping list, add it
    else {
      return [...prevShoppingList, ingredient];
    }
  });

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      url: `http://localhost:5000/api/shopping-list/${owner}`,
      data: {
        id: ingredient.id ?? "N/A",
        name: ingredient.ingredient ?? "N/A",
        measurement: ingredient.amount.metric.unit.abbreviation ?? "N/A",
        amount: ingredient.amount.metric.quantity ?? "N/A",
      },
    };

    try {
      await axios(requestOptions);
      console.log("Shopping List updated succesfully!");
    } catch (error) {
      console.error("Error updating Shopping List", error);
    }
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
            {recipe && recipe.content && recipe.content.description ? (
              <span>{recipe.content.description.text}</span>
            ) : (
              "Description N/A"
            )}
          </div>
          <div className={styles.buttonBox}>
          {isRendered && (
            <button className={styles.button} onClick={toggleFavorite}>
              {" "}
              {recipe && recipe.favorite ? <RemoveFav /> : <AddFav />}
            </button>
          )}
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
                  {ingredient &&
                  ingredient.amount &&
                  ingredient.amount.metric &&
                  ingredient.amount.metric.quantity &&
                  ingredient.amount.metric.unit &&
                  ingredient.amount.metric.unit.abbreviation ? (
                    <span>
                      {ingredient.amount.metric.quantity}{" "}
                      {ingredient.amount.metric.unit.abbreviation}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <div className={styles.checkBox}>
                  <input
                    type="checkbox"
                    checked={shoppingList.some(
                      (item) => item.id === ingredient.id
                    )}
                    onChange={() => handleIngredientChange(index, ingredient)}
                    className={styles.check}
                  />
                  {shoppingList.some((item) => item.id === ingredient.id) ? (
                    <Checked />
                  ) : (
                    <UnChecked />
                  )}
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
