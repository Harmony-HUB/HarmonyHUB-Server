require("dotenv").config();
const express = require("express");
const loaders = require("./src/loaders/loaders");

const expressApp = express();

loaders(expressApp);

module.exports = expressApp;
