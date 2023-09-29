const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  amount: {
    type: String,
  },
  measurement: {
    type: String,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const recipesSchema = new Schema({
  id: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/dca6x5lvh/image/upload/v1695716637/defaultRecipe_tsfunv.png",
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  category: {
    type: String,
  },
  cookingTime: {
    type: String,
  },
  preparation: {
    type: String,
  },
  ingredients: { 
    type: [ingredientsSchema] 
  },
});

const userRecipes = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  shoppingList: {
    type: [ingredientsSchema],
  },
  recipes: {
    type: [recipesSchema],
  },
});

const Recipes = mongoose.model("recipes", userRecipes);

module.exports = Recipes;
