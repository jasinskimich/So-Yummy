const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingridiensSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  amount: {
    type: String,
  },
  unit: {
    type: String,
  },
  unitShort: {
    type: String,
  },
  unitLong: {
    type: String,
  },
  category: {
    type: String,
  },
  comment: {
    type: String,
  },
  originalString: {
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
  receipes: {
    type: [recipesSchema],
  },
});

const Recipes = mongoose.model("recipes", userRecipes);

module.exports = Recipes;
