import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserType } from "../types/types";
import CONFIG from "../config/config";

dotenv.config();
const { ACCESS_SECRET, REFRESH_SECRET } = CONFIG;

export const accessSecret = `${ACCESS_SECRET}`;
export const refreshSecret = `${REFRESH_SECRET}`;

export const generateAccessToken = (user: Partial<UserType>) => {
  return jwt.sign({ id: user.id }, accessSecret, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (user: Partial<UserType>) => {
  return jwt.sign({ id: user.id }, refreshSecret, {
    expiresIn: "2d",
  });
};
