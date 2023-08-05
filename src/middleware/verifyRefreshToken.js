const jwt = require("jsonwebtoken");
const { refreshSecret } = require("../utils/tokens");
const User = require("../models/User");
const { generateAccessToken } = require("../utils/tokens");

const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, refreshSecret, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const foundUser = await User.findById(user.id);

    if (foundUser && foundUser.refreshToken === refreshToken) {
      const accessToken = generateAccessToken(user);

      res.json({ access_token: accessToken });
      next();
    } else {
      res.status(403).json({ message: "새로고침 토큰이 유효하지 않습니다." });
    }
  });
};

module.exports = verifyRefreshToken;
