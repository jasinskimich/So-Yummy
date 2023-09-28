import styles from "./Recipe.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ReactComponent as AddFav } from "../../images/favButton.svg";
import { ReactComponent as Clock } from "../../images/clock.svg";
import defaultIngridient from "../../images/defaultIngridient.png";
import { ReactComponent as Checked } from "../../images/checked.svg";
import { ReactComponent as UnChecked } from "../../images/unchecked.svg";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
  const { owner } = useParams();
  const { recipeId } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  console.log(selectedIngredients, "selectedIngredients");

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
        setIngredients(
          response.ingredients.map((ingredient) => ({
            ...ingredient,
            checked: false,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredients();
  }, [owner, recipeId]);

  const handleCheckboxChange = (index) => {
    const updatedIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, checked: !ingredient.checked } : ingredient
    );
    setIngredients(updatedIngredients);
    const updatedSelectedIngredients = updatedIngredients
      .filter((ingredient) => ingredient.checked)
      .map((ingredient) => ingredient);
    setSelectedIngredients(updatedSelectedIngredients);
  };

  return (
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <Header />
        <div className={styles.container}>
          <div className={styles.title}>
            <span className={styles.titleText}>Salmon Avocado Salad</span>
          </div>
          <div className={styles.about}>
            <span>
              Is a healthy salad recipe that’s big on nutrients and flavor. A
              moist, pan seared salmon is layered on top of spinach, avocado,
              tomatoes, and red onions. Then drizzled with a homemade lemon
              vinaigrette.
            </span>
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.button}>
              {" "}
              <AddFav />
            </button>
          </div>
          <div className={styles.cookingBox}>
            <Clock />
            <span className={styles.cookingTime}>20 min</span>
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
                <img src={defaultIngridient} alt="ingridientPicture" />
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
                  onChange={() => handleCheckboxChange(index)}
                  className={styles.check}
                />
                {ingredient.checked ? <Checked /> : <UnChecked />}
              </div>
            </div>
          </div>
        ))}

        <div></div>
      </div>

      <Footer />
    </div>
  );
}

export default Recipe;
