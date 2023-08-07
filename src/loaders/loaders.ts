import { Express } from "express";
import connectToDatabase from "../config/database";
import expressHandler from "./express";
import setupErrorHandlers from "./error";
import routesHandler from "./routes";

const loaders = async (app: Express) => {
  await connectToDatabase();
  await expressHandler(app);
  await routesHandler(app);
  await setupErrorHandlers(app);
};

export default loaders;
