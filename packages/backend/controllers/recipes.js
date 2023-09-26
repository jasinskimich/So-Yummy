const Recipes = require("../models/recipes");

const AddRecipe = async (res, req, next) => {
  const owner = req.params.owner;
  const document = await Recipes.findOne({ owner });

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
};

module.exports = { AddRecipe };
