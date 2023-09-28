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

module.exports = { AddRecipe, getRecipes, removeRecipe };