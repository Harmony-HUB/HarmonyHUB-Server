const express = require("express");
const createError = require("http-errors");

const app = express();

const errorHandler = async () => {
  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
  });
};

module.exports = errorHandler;
