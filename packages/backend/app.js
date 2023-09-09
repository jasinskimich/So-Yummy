const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");

const usersRouter = require("./routes/users");
// const financesRouter = require("./routes/finances");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/uploads/", express.static("uploads"));

require("./config/config-passport");

app.use("/api", usersRouter);
app.use("/api", uploadRoutes);

// app.use("/api", financesRouter);

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
