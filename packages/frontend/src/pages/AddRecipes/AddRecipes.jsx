import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./AddRecipes.module.css";

function AddReceipes() {
  const [picture, setPicture] = useState(null);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", measurement: "", unit: "" },
  ]);
  const [preparation, setPreparation] = useState("");

  // Other functions and JSX components will be added here
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredient: "", measurement: "", unit: "" },
    ]);
  };

  // Function to remove an ingredient input at a specific index
  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <div>
      <div className={styles.pictureBox}>
        <input type="file" onChange={(e) => setPicture(e.target.files[0])} />
      </div>
      <div>
        <input
          type="text"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        <input
          type="text"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />
      </div>
      <div>
        <select
          value={dropdown1}
          onChange={(e) => setDropdown1(e.target.value)}
        >
          {/* Options for the dropdown */}
        </select>
        <select
          value={dropdown2}
          onChange={(e) => setDropdown2(e.target.value)}
        >
          {/* Options for the dropdown */}
        </select>
      </div>
      <div>
        <div>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient.ingredient}
                onChange={(e) => {
                  const updatedIngredients = [...ingredients];
                  updatedIngredients[index].ingredient = e.target.value;
                  setIngredients(updatedIngredients);
                }}
              />
              <input
                type="text"
                value={ingredient.measurement}
                onChange={(e) => {
                  const updatedIngredients = [...ingredients];
                  updatedIngredients[index].measurement = e.target.value;
                  setIngredients(updatedIngredients);
                }}
              />
              <select
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
              {index > 0 && (
                <button type="button" onClick={() => removeIngredient(index)}>
                  -
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            +
          </button>
        </div>
      </div>
      <div>
        <textarea
          value={preparation}
          onChange={(e) => setPreparation(e.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </div>
  );
}

export default AddReceipes;
