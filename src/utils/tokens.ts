import jwt from "jsonwebtoken";
require("dotenv").config();
import { UserType } from "../types/types";

export const accessSecret = `${process.env.ACCESS_SECRET}`;
export const refreshSecret = `${process.env.REFRESH_SECRET}`;

export const generateAccessToken = (user: UserType) => {
  return jwt.sign({ id: user.id }, accessSecret, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (user: UserType) => {
  return jwt.sign({ id: user.id }, refreshSecret, {
    expiresIn: "2d",
  });
};
