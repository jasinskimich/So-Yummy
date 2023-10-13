const ApiRecipes = require("../models/apiRecipes");


const getAllRecipes = async (req, res, next) => {
    try {
      const documents = await ApiRecipes.find({});
      if (!documents || documents.length === 0) {
        return res.status(404).json({ message: "No documents found" });
      }
      res.send({ status: "ok", recipes: documents });
    } catch (error) {
      next(error);
    }
  };
  const getAllCategories = async (req, res, next) => {
    try {
      const documents = await ApiRecipes.find({}, 'category');
      if (!documents || documents.length === 0) {
        return res.status(404).json({ message: "No documents found" });
      }
      const categories = [...new Set(documents.map(doc => doc.category))];
      res.send({ status: "ok", categories });
    } catch (error) {
      next(error);
    }
  };
  
const getRecipesByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const documents = await ApiRecipes.find({ category });
    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }
    res.send({ status: "ok", recipes: documents });
  } catch (error) {
    next(error);
  }
};

const getPopularRecipes = async (req, res, next) => {
  try {
    const documents = await ApiRecipes.find({ description: /popular/i });
    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }
    res.send({ status: "ok", recipes: documents });
  } catch (error) {
    next(error);
  }
};


module.exports = {
    getAllRecipes,
    getAllCategories,
    getRecipesByCategory,
    getPopularRecipes
  };