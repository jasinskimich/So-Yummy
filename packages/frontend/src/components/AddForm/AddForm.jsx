import React, { useState, useRef, useEffect } from "react";
// import Dropdown from "react-bootstrap/Dropdown";
import styles from "./AddForm.module.css";
import { ReactComponent as Minus } from "../../images/Minus.svg";
import { ReactComponent as Plus } from "../../images/IngPlus.svg";
import { ReactComponent as Close } from "../../images/close.svg";
import { ReactComponent as Add } from "../../images/addBtn.svg";

function AddForm() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [picture, setPicture] = useState(
    "https://res.cloudinary.com/dca6x5lvh/image/upload/v1695716637/defaultRecipe_tsfunv.png"
  );
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", measurement: "", unit: "" },
  ]);
  const [preparation, setPreparation] = useState("");
  const [ingredientCount, setIngredientCount] = useState(1);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_UPLOAPRESET,
      },
      function (error, result) {
        if (result.event === "success") {
          setPicture(result.info.secure_url);
        }
      }
    );
  }, []);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredient: "", measurement: "", unit: "" },
    ]);
    setIngredientCount(ingredientCount + 1);
  };
  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    if (ingredientCount > 0) {
      setIngredientCount(ingredientCount - 1);
    }
  };
  const timeOptions = [
    { label: "5 min", value: 5 },
    { label: "10 min", value: 10 },
    { label: "15 min", value: 15 },
    { label: "20 min", value: 20 },
    { label: "25 min", value: 25 },
    { label: "30 min", value: 30 },
    { label: "35 min", value: 35 },
    { label: "40 min", value: 40 },
    { label: "45 min", value: 45 },
    { label: "50 min", value: 50 },
    { label: "55 min", value: 55 },
    { label: "1 hr", value: 60 },
    { label: "1 hr 5 min", value: 65 },
    { label: "1 hr 10 min", value: 70 },
    { label: "1 hr 15 min", value: 75 },
    { label: "1 hr 20 min", value: 80 },
    { label: "1 hr 25 min", value: 85 },
    { label: "1 hr 30 min", value: 90 },
    { label: "1 hr 35 min", value: 95 },
    { label: "1 hr 40 min", value: 100 },
    { label: "1 hr 45 min", value: 105 },
    { label: "1 hr 50 min", value: 110 },
    { label: "1 hr 55 min", value: 115 },
    { label: "2 hr", value: 120 },
    { label: "2 hr 5 min", value: 125 },
    { label: "2 hr 10 min", value: 130 },
    { label: "2 hr 15 min", value: 135 },
    { label: "2 hr 20 min", value: 140 },
    { label: "2 hr 25 min", value: 145 },
    { label: "2 hr 30 min", value: 150 },
    { label: "2 hr 35 min", value: 155 },
    { label: "2 hr 40 min", value: 160 },
    { label: "2 hr 45 min", value: 165 },
    { label: "2 hr 50 min", value: 170 },
    { label: "2 hr 55 min", value: 175 },
    { label: "3 hr", value: 180 },
    { label: "3 hr 5 min", value: 185 },
    { label: "3 hr 10 min", value: 190 },
    { label: "3 hr 15 min", value: 195 },
    { label: "3 hr 20 min", value: 200 },
    { label: "3 hr 25 min", value: 205 },
    { label: "3 hr 30 min", value: 210 },
    { label: "3 hr 35 min", value: 215 },
    { label: "3 hr 40 min", value: 220 },
    { label: "3 hr 45 min", value: 225 },
    { label: "3 hr 50 min", value: 230 },
    { label: "3 hr 55 min", value: 235 },
    { label: "4 hr", value: 240 },
    { label: "4 hr 5 min", value: 245 },
    { label: "4 hr 10 min", value: 250 },
    { label: "4 hr 15 min", value: 255 },
    { label: "4 hr 20 min", value: 260 },
    { label: "4 hr 25 min", value: 265 },
    { label: "4 hr 30 min", value: 270 },
    { label: "4 hr 35 min", value: 275 },
    { label: "4 hr 40 min", value: 280 },
    { label: "4 hr 45 min", value: 285 },
    { label: "4 hr 50 min", value: 290 },
    { label: "4 hr 55 min", value: 295 },
    { label: "5 hr", value: 300 },
  ];

  return (
    <form>
      <div className={styles.form}>
        <div className={styles.firstContainter}>
          <div className={styles.pictureBox}>
            <button
              className={styles.pictureBox}
              onClick={() => widgetRef.current.open()}
            >
              <img
                src={picture}
                alt="recipeImage"
                className={styles.avatarPic}
              />
            </button>
          </div>
          <div className={styles.firstInsideContainter}>
            <div className={styles.secondInsideContainter}>
              <input
                className={styles.inputText}
                placeholder="Enter item title"
                type="text"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
              />

              <input
                className={styles.inputText}
                placeholder="About recipe"
                type="text"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
              />
            </div>
            <div className={styles.secondInsideContainter}>
              <select
                className={styles.minimal}
                value={dropdown1}
                onChange={(e) => setDropdown1(e.target.value)}
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="American">American</option>
                <option value="Barbecue">Barbecue</option>
                <option value="Asian">Asian</option>
              </select>
              <select
                className={styles.minimal}
                value={dropdown2}
                onChange={(e) => setDropdown2(e.target.value)}
              >
                <option value="" disabled>
                  Cooking time
                </option>
                {timeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.ingredientContainer}>
          <div className={styles.ingridientsTitle}>
            <span className={styles.ingridientsTitleText}>Ingredients</span>
            <div className={styles.buttonsBox}>
              <button
                type="button"
                onClick={removeIngredient}
                className={styles.minus}
              >
                <Minus />
              </button>
              <span className={styles.count}>{ingredientCount}</span>
              <button
                type="button"
                onClick={addIngredient}
                className={styles.minus}
              >
                <Plus />
              </button>
            </div>
          </div>
          <div>
            {ingredients.map((ingredient, index) => (
              <div key={index} className={styles.ingridientsItem}>
                <input
                  className={styles.ingredientText}
                  placeholder="Ingredient name"
                  type="text"
                  value={ingredient.ingredient}
                  onChange={(e) => {
                    const updatedIngredients = [...ingredients];
                    updatedIngredients[index].ingredient = e.target.value;
                    setIngredients(updatedIngredients);
                  }}
                />
                <div className={styles.measurement}>
                  <input
                    className={styles.measurementText}
                    type="text"
                    placeholder="Quantity"
                    value={ingredient.measurement}
                    onChange={(e) => {
                      const updatedIngredients = [...ingredients];
                      updatedIngredients[index].measurement = e.target.value;
                      setIngredients(updatedIngredients);
                    }}
                  />
                  <select
                    className={styles.minimal2}
                    value={ingredient.unit}
                    onChange={(e) => {
                      const updatedIngredients = [...ingredients];
                      updatedIngredients[index].unit = e.target.value;
                      setIngredients(updatedIngredients);
                    }}
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="tbs">tbs</option>
                    <option value="tsp">tsp</option>
                  </select>
                </div>
                {index > 0 && (
                  <button
                    className={styles.minus}
                    type="button"
                    onClick={() => removeIngredient(index)}
                  >
                    <Close />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <span className={styles.bottomContainerTitle}>
            Recipe Preparation
          </span>
          <textarea
            placeholder="Please insert seteps of the recipe. 
        1. 
        2.
        3."
            className={styles.textArea}
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.add}>
          <Add />
        </button>
      </div>
    </form>
  );
}

export default AddForm;
