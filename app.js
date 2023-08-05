require("dotenv").config();
const express = require("express");
const loaders = require("./src/loaders/loaders");

const app = express();

loaders(app);

module.exports = app;
