import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserType } from "../types/types";

dotenv.config();

export const accessSecret = `${process.env.ACCESS_SECRET}`;
export const refreshSecret = `${process.env.REFRESH_SECRET}`;

export const generateAccessToken = (user: Partial<UserType>) => {
  return jwt.sign({ id: user.id }, accessSecret, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (user: Partial<UserType>) => {
  return jwt.sign({ id: user.id }, refreshSecret, {
    expiresIn: "2d",
  });
};
