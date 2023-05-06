const express = require("express");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
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

module.exports = router;
