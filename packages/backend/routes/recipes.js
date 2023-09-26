const express = require("express");
const router = express.Router();
require("dotenv").config();
const userRecipes = require("../controllers/recipes")

router.post("/recipes/:id", userRecipes.addRecipe);