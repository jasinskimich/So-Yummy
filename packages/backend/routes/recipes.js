const express = require("express");
const router = express.Router();
require("dotenv").config();
const recipesControllers = require("../controllers/recipes")

router.post("/recipes/:id", recipesControllers.AddRecipe);

module.exports = router;
