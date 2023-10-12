const express = require("express");
const router = express.Router();
require("dotenv").config();
const apiRecipesControllers = require("../controllers/apiRecipes");

router.get("/all-recipes", apiRecipesControllers.getAllRecipes);
router.get("/all-categories", apiRecipesControllers.getAllCategories);
router.get("/api-recipes/:category", apiRecipesControllers.getRecipesByCategory);


module.exports = router;