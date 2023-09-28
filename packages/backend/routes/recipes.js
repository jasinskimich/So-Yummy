const express = require("express");
const router = express.Router();
require("dotenv").config();
const recipesControllers = require("../controllers/recipes");

router.post("/recipes/:id", recipesControllers.AddRecipe);
router.get("/recipes/:id", recipesControllers.getRecipes);
router.get("/recipes/:id/:recipeId", recipesControllers.getIngredients);
router.delete("/recipes/:owner/:id", recipesControllers.removeRecipe);

module.exports = router;
