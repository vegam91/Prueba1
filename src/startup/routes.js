const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(compression());

  app.use("/api/users", require("../routes/user"));
  app.use("/api/movies", require("../routes/movies"));

  app.get("/health", async (req, res) => {
    try {
      await mongoose.connection.db.admin().ping();
      res.json({ status: "OK", message: "Health check passed" });
    } catch (err) {
      res.status(500).json({
        status: "MongoDB Connection Error",
        message: "Unable to connect to MongoDB",
      });
    }
  });

  app.use(require("../middleware/errors"));
};
