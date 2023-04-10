const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  refreshSecret,
} = require("../utils/tokens");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ result: "user" });
});

router.post("/", async (req, res) => {
  const { email, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name });
    }

    user.refreshToken = generateRefreshToken(user);

    await user.save();

    const accessToken = generateAccessToken(user);

    res.json({ refreshToken: user.refreshToken, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).send("RefreshToken is required");

  try {
    const decoded = jwt.verify(refreshToken, refreshSecret);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).send("Invalid refresh token");
    }

    const newAccecssToken = generateAccessToken(user);

    return res.json({ accessToken: newAccecssToken });
  } catch (error) {
    console.error(error);

    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
