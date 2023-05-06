const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const generateRandomString = length => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString("hex");
};

const accessSecret = generateRandomString(64);
const refreshSecret = process.env.REFRESH_SECRET;

const generateAccessToken = user => {
  return jwt.sign({ id: user.id }, accessSecret, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = user => {
  return jwt.sign({ id: user.id }, refreshSecret, {
    expiresIn: "7d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  accessSecret,
  refreshSecret,
};
