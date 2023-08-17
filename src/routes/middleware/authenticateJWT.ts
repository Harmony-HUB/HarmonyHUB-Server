import jwt, { VerifyErrors } from "jsonwebtoken";
import { ExpressMiddleware } from "../../types/types";
import { accessSecret } from "../../utils/tokens";

const authenticateJWT: ExpressMiddleware = (req, res, next) => {
  const authHeader: string | undefined = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    return jwt.verify(token, accessSecret, (err: VerifyErrors | null, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.body.user = user;

      return next();
    });
  }

  return res.sendStatus(401);
};

export default authenticateJWT;
