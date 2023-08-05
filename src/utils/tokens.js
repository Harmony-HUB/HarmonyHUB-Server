const jwt = require("jsonwebtoken");
require("dotenv").config();

const accessSecret = `${process.env.ACCESS_SECRET}`;
const refreshSecret = `${process.env.REFRESH_SECRET}`;

const generateAccessToken = user => {
  return jwt.sign({ id: user.id }, accessSecret, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = user => {
  return jwt.sign({ id: user.id }, refreshSecret, {
    expiresIn: "2d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  accessSecret,
  refreshSecret,
};
