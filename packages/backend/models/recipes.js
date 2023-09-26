const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingridiensSchema = new Schema({
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
});

const recipesSchema = new Schema({
  id: {
    type: String,
  },
  date: {
    type: String,
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
  coockingTime: {
    type: Number,
    default: 0,
  },
  preparation: {
    type: String,
  },
  ingridiens: { type: [ingridiensSchema] },
});

const userRecipes = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  sum: {
    type: Number,
    default: 0,
  },
  recipes: {
    type: [recipesSchema],
  },
});

const Recipes = mongoose.model("recipes", userRecipes);

module.exports = Recipes;
