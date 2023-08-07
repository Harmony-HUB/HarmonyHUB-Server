import jwt, { VerifyErrors } from "jsonwebtoken";
import { refreshSecret } from "../../utils/tokens";
import User from "../../models/User";
import { generateAccessToken } from "../../utils/tokens";
import { ExpressMiddleware, UserType } from "../../types/types";

const verifyRefreshToken: ExpressMiddleware = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(
    refreshToken,
    refreshSecret,
    async (err: VerifyErrors | null, user: UserType) => {
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
    },
  );
};

export default verifyRefreshToken;
