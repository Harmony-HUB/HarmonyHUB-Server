import express from "express";
import loaders from "./loaders/loaders";

const expressApp = express();

loaders(expressApp);

export default expressApp;
