import { Express } from "express";
import createError from "http-errors";
import { ExpressMiddleware, ExpressErrorMiddleware } from "../types/types";

const notFoundMiddleware: ExpressMiddleware = (req, res, next) => {
  next(createError(404));
};

const errorHandler: ExpressErrorMiddleware = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
};

const setupErrorHandlers = (app: Express) => {
  app.use(notFoundMiddleware);
  app.use(errorHandler);
};

module.exports = setupErrorHandlers;
