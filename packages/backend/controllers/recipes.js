const Recipes = require("../models/recipes");

const AddRecipe = async (req, res, next) => {
  try {
    const id = req.params.id;
    const document = await Recipes.findOne({ owner: id });

    if (!document) {
      return res.json({
        status: "error",
        code: 400,
        data: "Bad request",
        message: "User not found",
      });
    }

    const recipe = req.body;
    document.recipes.push(recipe);
    await document.save();

    return res.json({
      status: "success",
      code: 200,
      data: recipe,
      message: "Recipe added successfully",
    });
  } catch (error) {
    return res.json({
      status: "error",
      code: 500,
      data: error.message,
      message: "Internal server error",
    });
  }
};
const AddShoppingItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const document = await Recipes.findOne({ owner: id });

    if (!document) {
      return res.json({
        status: "error",
        code: 400,
        data: "Bad request",
        message: "User not found",
      });
    }

    const item = req.body;
    document.shoppingList.push(item);
    await document.save();

    return res.json({
      status: "success",
      code: 200,
      data: item,
      message: "Recipe added successfully",
    });
  } catch (error) {
    return res.json({
      status: "error",
      code: 500,
      data: error.message,
      message: "Internal server error",
    });
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const id = req.params.id;
    const document = await Recipes.findOne({ owner: id });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.send({ status: "ok", recipes: document.recipes });
  } catch (error) {
    next(error);
  }
};
const getFavorites = async (req, res, next) => {
  try {
    const id = req.params.id;
    const document = await Recipes.findOne({ owner: id });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.send({ status: "ok", recipes: document.favorites });
  } catch (error) {
    next(error);
  }
};
const getShoppingList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const document = await Recipes.findOne({ owner: id });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.send({ status: "ok", shoppingList: document.shoppingList });
  } catch (error) {
    next(error);
  }
};

const getIngredients = async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const recipeid = req.params.recipeId;
    const document = await Recipes.findOne({ owner: ownerId });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    const recipe = document.recipes.find((r) => r._id.toString() === recipeid);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.send({
      status: "ok",
      ingredients: recipe.ingredients,
      recipe,
      shoppingList: document.shoppingList,
    });
  } catch (error) {
    next(error);
  }
};

const removeRecipe = async (req, res, next) => {
  try {
    const id = req.params.owner;
    const document = await Recipes.findOne({ owner: id });
    if (!document) {
      return res.status(404).json({ message: "Owner not found1" });
    }

    const recipe = document.recipes.find(
      (t) => t._id.toString() === req.params.id
    );
    if (!recipe) {
      return res.status(404).json({ message: "recipe not found" });
    }

    await Recipes.findOneAndUpdate(
      { owner: req.params.owner },
      {
        $pull: { recipes: { _id: req.params.id } },
      }
    );

    const updatedRecipes = await Recipes.findOne({ owner: req.params.owner });
    if (!updatedRecipes) {
      return res.status(404).json({ message: "Owner not found2" });
    }

    res.json({
      message: "Recipe deleted",
      deletedRecipe: recipe,
    });
  } catch (error) {
    next(error);
  }
};

const removeFav = async (req, res, next) => {
  try {
    const id = req.params.owner;
    const document = await Recipes.findOne({ owner: id });
    if (!document) {
      return res.status(404).json({ message: "Owner not found1" });
    }

    const recipe = document.favorites.find(
      (t) => t._id.toString() === req.params.id
    );
    if (!recipe) {
      return res.status(404).json({ message: "recipe not found" });
    }

    await Recipes.findOneAndUpdate(
      { owner: req.params.owner },
      {
        $pull: { favorites: { _id: req.params.id } },
      }
    );

    const updatedRecipes = await Recipes.findOne({ owner: req.params.owner });
    if (!updatedRecipes) {
      return res.status(404).json({ message: "Owner not found2" });
    }

    res.json({
      message: "Recipe deleted",
      deletedRecipe: recipe,
    });
  } catch (error) {
    next(error);
  }
};

const toggleFavorite = async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipeid = req.params.recipeId;
    const favorite = req.body.favorite;
    console.log(id);
    const document = await Recipes.findOne({ owner: id });
    if (!document) {
      return res.status(404).json({ message: "Owner not found" });
    }
    const recipe = document.recipes.find((r) => r._id.toString() === recipeid);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await Recipes.updateOne(
      { owner: id, "recipes._id": recipeid },
      { "recipes.$.favorite": favorite }
    );

    res.json({ recipe });
  } catch (error) {
    return res.json({
      status: "error",
      code: 500,
      data: error.message,
      message: "Internal server error",
    });
  }
};
const toggleChecked = async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipeid = req.params.recipeId;
    const ingid = req.params.ingId;

    const checked = req.body.checked;
    const document = await Recipes.findOne({ owner: id });
    if (!document) {
      return res.status(404).json({ message: "Owner not found" });
    }
    const recipe = document.recipes.find((r) => r._id.toString() === recipeid);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const ingredient = recipe.ingredients.find(
      (r) => r._id.toString() === ingid
    );
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    console.log(ingredient);
    if (!recipe.ingredients.length) {
      return res.status(404).json({ message: "Ingredients array is empty" });
    }

    // Update the checked property of the ingredient object
    ingredient.checked = checked;

    // Save the updated document back to the database
    await document.save();

    res.json({ ingredient });
  } catch (error) {
    return res.json({
      status: "error",
      code: 500,
      data: error.message,
      message: "Internal server error",
    });
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const id = req.params.id;
    const document = await Recipes.findOne({ owner: id });

    const newRecipe = req.body; // Assuming the new recipe is in the body of the request

    const index = document.favorites.findIndex(
      (recipe) => recipe.id === newRecipe.id
    );

    if (index !== -1) {
      // The recipe is already in the favorites array, so remove it
      document.favorites.splice(index, 1);
    } else {
      // The recipe is not in the favorites array, so add it
      document.favorites.push(newRecipe);
    }

    await document.save();

    res.status(200).json({ message: "Favorite updated successfully" });
  } catch (error) {
    next(error);
  }
};

const updateShoppingList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const document = await Recipes.findOne({ owner: id });

    const newIngredient = req.body; // Assuming the new recipe is in the body of the request

    const index = document.shoppingList.findIndex(
      (ingredient) => ingredient.id === newIngredient.id
    );

    if (index !== -1) {
      // The recipe is already in the favorites array, so remove it
      document.shoppingList.splice(index, 1);
    } else {
      // The recipe is not in the favorites array, so add it
      document.shoppingList.push(newIngredient);
    }

    await document.save();

    res.status(200).json({ message: "Shopping List updated succesfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddRecipe,
  getRecipes,
  removeRecipe,
  getIngredients,
  toggleFavorite,
  AddShoppingItem,
  toggleChecked,
  updateFavorite,
  getFavorites,
  removeFav,
  updateShoppingList,
  getShoppingList
};
