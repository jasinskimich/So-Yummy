const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apiIngredientsSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    measure: {
        type: String,
    },
});

const apiRecipe = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    area: {
        type: String,
    },
    instructions: {
        type: String,
    },
    description: {
        type: String,
    },
    thumb: {
        type: String,
    },
    preview: {
        type: String,
    },
    time: {
        type: String,
    },
    favorites: { 
        type: [] 
    },
    tags: { 
        type: [] 
    },
    ingredients: { 
        type: [apiIngredientsSchema] 
    },
});

const apiRecipes = mongoose.model("apirecipes", apiRecipe);

module.exports = apiRecipes;