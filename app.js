require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const protectedRouter = require("./routes/protected");
const uploadAudioRouter = require("./routes/uploadAudio");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

mongoose.set("strictQuery", true);
const connectToDatabase = async () => {
  try {
    mongoose.connect(process.env.MONGOOSE_ID);
    console.log("Connected To Database");
  } catch (error) {
    console.error("Error Connecting To Database");
  }
};

connectToDatabase();

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/protected", protectedRouter);
app.use("/uploadAudio", uploadAudioRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
