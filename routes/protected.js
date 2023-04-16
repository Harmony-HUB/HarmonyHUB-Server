const express = require("express");
const jwt = require("jsonwebtoken");
const { accessSecret } = require("../utils/tokens");

const router = express.Router();

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

router.get("/", authenticateJWT, (req, res) => {
  res.json({ message: "Protected route accessed" });
});

module.exports = router;
