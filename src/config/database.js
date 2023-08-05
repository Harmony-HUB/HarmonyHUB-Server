require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_ID);
    console.log("Connected To Database");
  } catch (error) {
    console.error("Error Connecting To Database");
  }
};

module.exports = connectToDatabase;
