const jwt = require("jsonwebtoken");
const { accessSecret, refreshSecret } = require("../utils/tokens");
const User = require("../models/User");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    return jwt.verify(token, accessSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;

      return next();
    });
  }

  return res.sendStatus(401);
};

const refreshTokenMiddleware = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "No refresh token provided." });
  }

  try {
    const decodedRefreshToken = jwt.verify(refreshToken, refreshSecret);
    const user = await User.findById(decodedRefreshToken.id);

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    const newAccessToken = jwt.sign(
      { userId: user.id, email: user.email },
      accessSecret,
      { expiresIn: "15m" },
    );

    req.newAccessToken = newAccessToken;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid refresh token." });
  }
};

module.exports = {
  authenticateJWT,
  refreshTokenMiddleware,
};
