import jwt, { VerifyErrors } from "jsonwebtoken";
import { ExpressMiddleware, UserType } from "../types/types";
import { accessSecret } from "../utils/tokens";

const authenticateJWT: ExpressMiddleware = (req, res, next): object | void => {
  const authHeader: string | undefined = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessSecret, (err: VerifyErrors | null, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user as UserType;

      return next();
    });
  }

  return res.sendStatus(401);
};

export default authenticateJWT;
