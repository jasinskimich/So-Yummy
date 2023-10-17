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
    const documents = await ApiRecipes.find({}, "category");
    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }
    const categories = [...new Set(documents.map((doc) => doc.category))];
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
const getAutoComplete = async (req, res, next) => {
  try {
    const searchSentence = req.body.searchSentence;
    const searchRegex = new RegExp(searchSentence, "i");
    const query = {
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { area: searchRegex },
      ],
    };
    const documents = await ApiRecipes.find(query);
    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }

    // Split the search sentence into words
    const words = searchSentence.split(/\s+/);

    // Create an array to store the matching words
    let matchingWords = [];

    // Loop over the documents
    for (const doc of documents) {
      // Loop over the words in the search sentence
      for (const word of words) {
        // If the document's title, description, category, or area contains the word, add it to the matchingWords array
        if (
          doc.title.includes(word) ||
          doc.description.includes(word) ||
          doc.category.includes(word) ||
          doc.area.includes(word)
        ) {
          matchingWords.push(word);
        }
      }
    }

    // Remove duplicates from the matchingWords array
    matchingWords = [...new Set(matchingWords)];

    // If there are more than 15 matching words, slice the array to keep only the first 15
    if (matchingWords.length > 15) {
      matchingWords = matchingWords.slice(0, 15);
    }

    res.send({ status: "ok", matchingWords });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAutoComplete,
  getAllRecipes,
  getAllCategories,
  getRecipesByCategory,
  getPopularRecipes,
};
