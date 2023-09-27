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

module.exports = { AddRecipe };
