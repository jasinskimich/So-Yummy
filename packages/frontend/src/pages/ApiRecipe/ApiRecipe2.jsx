import styles from "./ApiRecipe.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { NoFound } from "../../components/NoFound/NoFound2";

import Loader from "../../components/Loader/Loader";
import { ReactComponent as AddFav } from "../../images/favButton.svg";
import { ReactComponent as RemoveFav } from "../../images/removeBtn.svg";
import { ReactComponent as Clock } from "../../images/clock.svg";
import { ReactComponent as Checked } from "../../images/checked.svg";
import { ReactComponent as UnChecked } from "../../images/unchecked.svg";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Notiflix from "notiflix";
import axios from "axios";

function ApiRecipe() {
  const { owner } = useParams();
  const { recipeId } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [apiIngredients, setApiIngredients] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRendered(true);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "https://so-yummy-1f2e.onrender.com/api/all-ingredients"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApiIngredients(data.ingredients);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let response = await fetch(
          `https://so-yummy-1f2e.onrender.com/api/fav-recipes/${owner}`,
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
          `https://so-yummy-1f2e.onrender.com/api/shopping-list/${owner}`,
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
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://so-yummy-1f2e.onrender.com/api/all-recipes`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const recipes = data.recipes;

        if (recipes) {
          const foundRecipe = recipes.find((recipe) => recipe._id === recipeId);
          if (!foundRecipe) {
            setNotFound(true);
          }
          const isFavorite = favoriteRecipes.some(
            (recipe) => recipe.id === foundRecipe._id
          );

          setRecipe({ ...foundRecipe, favorite: isFavorite });
          const recipeIngredients = foundRecipe.ingredients;
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
    fetchRecipes();
  }, [recipeId, favoriteRecipes]);

  const toggleFavorite = async () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      favorite: !prevRecipe.favorite,
    }));
    Notiflix.Notify.init({
      position: "left-bottom",
    });
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      url: `https://so-yummy-1f2e.onrender.com/api/recipes/${owner}`,
      data: {
        id: recipe._id,
        picture: recipe.preview ?? "N/A",
        title: recipe.title ?? "N/A",
        about: recipe.description ?? "N/A",
        cookingTime: recipe.time ?? "N/A",
        preparation: recipe.instructions ?? "N/A",
        ingredients: recipe.ingredients ?? "N/A",
      },
    };

    try {
      await axios(requestOptions);

      Notiflix.Notify.success("Favorite updated successfully");
    } catch (error) {
      console.error("Error updating favorite", error);
    }
  };

  const handleIngredientChange = async (
    index,
    ingredient,
    matchingIngredient
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index
          ? { ...ingredient, checked: !ingredient.checked }
          : ingredient
      )
    );
    Notiflix.Notify.init({
      position: "left-bottom",
    });
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
      url: `https://so-yummy-1f2e.onrender.com/api/shopping-list/${owner}`,
      data: {
        id: ingredient.id ?? "N/A",
        name: matchingIngredient.ttl ?? "N/A",
        measurement: ingredient.measure ?? "N/A",
        thb: matchingIngredient.thb ?? "N/A",
      },
    };
    try {
      await axios(requestOptions);
      Notiflix.Notify.success("Shopping List updated succesfully!");
    } catch (error) {
      console.error("Error updating Shopping List", error);
    }
  };

  const ids = ingredients.map((ingredient) => ingredient.id);

  let matchingIngredients = [];
  if (ids && apiIngredients) {
    matchingIngredients = ids.map((id) =>
      apiIngredients.find((apiIngredient) => apiIngredient._id === id)
    );
  }

  function convertTime(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    let result = "";

    if (hours > 0) {
      result += `${hours} hr `;
    }

    if (minutes > 0) {
      result += `${minutes} min`;
    }

    return result.trim();
  }

  function splitInstructions(instructions) {
    let splitInstructions = instructions.split(".");
    let cleanInstructions = splitInstructions.map((sentence) =>
      sentence.trim()
    );
    let displayInstructions = cleanInstructions.join("\n");
    return displayInstructions;
  }

  return (
    <div className={styles.main}>
      {notFound ? (
        <NoFound owner={owner} />
      ) : (
        <>
          <div className={styles.contentContainer}>
            <Header />
            <div className={styles.container}>
              <div className={styles.title}>
                {recipe && recipe.title ? (
                  <span className={styles.titleText}>{recipe.title}</span>
                ) : (
                  <Loader />
                )}
              </div>
              <div className={styles.about}>
                {recipe && recipe.description ? (
                  <span>{recipe.description}</span>
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
                  {recipe && recipe.time ? (
                    <span>{convertTime(recipe.time)}</span>
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
              ingredients.map((ingredient, index) => {
                const matchingIngredient = matchingIngredients.find(
                  (matchingIngredient) =>
                    matchingIngredient._id === ingredient.id
                );

                return (
                  <div key={index} className={styles.detailsContainer}>
                    <div className={styles.detailsFirst}>
                      <div className={styles.imageBox}>
                        <img
                          className={styles.ingredientImage}
                          src={matchingIngredient ? matchingIngredient.thb : ""}
                          alt="ingredientPicture"
                        />
                      </div>
                      <div className={styles.name}>
                        <span>{matchingIngredient.ttl}</span>
                      </div>
                    </div>
                    <div className={styles.detailsSecond}>
                      <div className={styles.amount}>
                        {ingredient ? (
                          <span>{ingredient.measure}</span>
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
                          onChange={() =>
                            handleIngredientChange(
                              index,
                              ingredient,
                              matchingIngredient
                            )
                          }
                          className={styles.check}
                        />
                        {shoppingList.some(
                          (item) => item.id === ingredient.id
                        ) ? (
                          <Checked />
                        ) : (
                          <UnChecked />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Loader />
            )}

            <div className={styles.prepContainter}>
              <div className={styles.prepTextBox}>
                <span className={styles.prepTextTitle}>Recipe Preparation</span>
                {recipe && recipe.instructions ? (
                  <pre className={styles.instruction}>
                    {splitInstructions(recipe.instructions)}
                  </pre>
                ) : (
                  "N/A"
                )}
              </div>
              <div className={styles.prepImageBox}>
                {recipe && recipe.preview ? (
                  <img
                    src={recipe.preview}
                    alt={recipe.title}
                    className={styles.prepImage}
                  />
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}

export default ApiRecipe;
