import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.set("strictQuery", true);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_ID!);
    console.log("Connected To Database");
  } catch (error) {
    console.error("Error Connecting To Database");
  }
};

export default connectToDatabase;
