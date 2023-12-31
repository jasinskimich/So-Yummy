const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");
const usersRouter = require("./routes/users");
const recipesRouter = require("./routes/recipes");
const apiRecipesRouter = require("./routes/apiRecipes");
const apiIngredientsRouter = require("./routes/apiIngredients");
const bodyParser = require('body-parser');


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/uploads/", express.static("uploads"));
app.use(bodyParser.json());
require("./config/config-passport");

app.use("/api", usersRouter);
app.use("/api", uploadRoutes);
app.use("/api", recipesRouter);
app.use("/api", apiRecipesRouter);
app.use("/api", apiIngredientsRouter);


app.use((req, res) => {
  res.status(404).json({ message: "nie dziauaaa" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
app.use((req, res) => {
  res.status(200).json({ message: "pusto i test" });
});

module.exports = app;
