const express = require("express");
const router = express.Router();
require("dotenv").config();
const recipesControllers = require("../controllers/recipes");

router.post("/recipes/:id", recipesControllers.AddRecipe);

router.put("/recipes/:id/:recipeId/:ingId", recipesControllers.toggleChecked);
router.put("/recipes/:id/:recipeId", recipesControllers.toggleFavorite);
router.put("/recipes/:id", recipesControllers.updateFavorite);
router.put("/shopping-list/:id", recipesControllers.updateShoppingList);


router.get("/recipes/:id", recipesControllers.getRecipes);
router.get("/fav-recipes/:id", recipesControllers.getFavorites);
router.get("/shopping-list/:id", recipesControllers.getShoppingList);

router.get("/recipes/:id/:recipeId", recipesControllers.getIngredients);

router.delete("/recipes/:owner/:id", recipesControllers.removeRecipe);
router.delete("/fav-recipes/:owner/:id", recipesControllers.removeFav);


module.exports = router;
