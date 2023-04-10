const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateRandomString = length => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString("hex");
};

const accessSecret = generateRandomString(64);
const refreshSecret = generateRandomString(64);

const generateAccessToken = user => {
  return jwt.sign({ id: user.id }, accessSecret, {
    expiresIn: "15m",
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
