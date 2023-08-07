import express, { Express } from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: process.env.REACT_APP_API_URL,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const expressHandler = async (app: Express) => {
  app.use(cors(corsOptions));
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};

export default expressHandler;
