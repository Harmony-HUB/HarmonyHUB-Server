const connectToDatabase = require("../config/database");
const expressHandler = require("./express");
const errorHandler = require("./error");
const routesHandler = require("./routes");

const loaders = async app => {
  await connectToDatabase();
  await expressHandler(app);
  await routesHandler(app);
  await errorHandler(app);
};

module.exports = loaders;
