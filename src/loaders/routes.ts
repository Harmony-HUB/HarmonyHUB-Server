import { Express } from "express";
const indexRouter = require("../routes/index");
const userRouter = require("../routes/user");
const protectedRouter = require("../routes/protected");
const uploadAudioRouter = require("../routes/uploadAudio");
const songsRouter = require("../routes/songs");
const authRouter = require("../routes/auth");

const routesHandler = async (app: Express) => {
  app.use("/", indexRouter);
  app.use("/user", userRouter);
  app.use("/protected", protectedRouter);
  app.use("/uploadAudio", uploadAudioRouter);
  app.use("/songs", songsRouter);
  app.use("/auth", authRouter);
};

module.exports = routesHandler;
