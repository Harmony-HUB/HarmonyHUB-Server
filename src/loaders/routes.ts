import { Express } from "express";
import indexRouter from "../routes/index";
import userRouter from "../routes/user";
import protectedRouter from "../routes/protected";
import uploadAudioRouter from "../routes/uploadAudio";
import musicsRouter from "../routes/musics";
import authRouter from "../routes/auth";

const routesHandler = async (app: Express) => {
  app.use("/", indexRouter);
  app.use("/user", userRouter);
  app.use("/protected", protectedRouter);
  app.use("/uploadAudio", uploadAudioRouter);
  app.use("/musics", musicsRouter);
  app.use("/auth", authRouter);
};

export default routesHandler;
