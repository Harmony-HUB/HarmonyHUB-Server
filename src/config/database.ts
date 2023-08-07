import dotenv from "dotenv";
import mongoose from "mongoose";
import CONFIG from "./config";

dotenv.config();

mongoose.set("strictQuery", true);

const connectToDatabase = async () => {
  const { MONGOOSE_ID } = CONFIG;

  try {
    await mongoose.connect(MONGOOSE_ID!);
    console.log("Connected To Database");
  } catch (error) {
    console.error("Error Connecting To Database");
  }
};

export default connectToDatabase;
