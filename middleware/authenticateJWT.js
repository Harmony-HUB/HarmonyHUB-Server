const jwt = require("jsonwebtoken");
const { accessSecret } = require("../src/utils/tokens");

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

module.exports = {
  authenticateJWT,
};
