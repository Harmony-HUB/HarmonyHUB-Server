import { Express } from "express";
import createError from "http-errors";
import { ExpressMiddleware, ExpressErrorMiddleware } from "../types/types";

const notFoundMiddleware: ExpressMiddleware = (req, res, next) => {
  next(createError(404));
};

const errorHandler: ExpressErrorMiddleware = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const statusCode = err.status || 500;
  const errorMessage = statusCode === 500 ? "서버 오류" : err.message;

  res.status(500).json({ error: errorMessage });
};

const setupErrorHandlers = (app: Express) => {
  app.use(notFoundMiddleware);
  app.use(errorHandler);
};

export default setupErrorHandlers;
