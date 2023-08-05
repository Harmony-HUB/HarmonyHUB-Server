import { Express } from "express";
const connectToDatabase = require("../config/database");
const expressHandler = require("./express.ts");
const setupErrorHandlers = require("./error.ts");
const routesHandler = require("./routes");

const loaders = async (app: Express) => {
  await connectToDatabase();
  await expressHandler(app);
  await routesHandler(app);
  await setupErrorHandlers(app);
};

module.exports = loaders;
