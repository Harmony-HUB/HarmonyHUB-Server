import User from "../../models/User";
import { generateRefreshToken, generateAccessToken } from "../../utils/tokens";
import { ExpressMiddleware } from "../../types/types";

export const registerUser: ExpressMiddleware = async (req, res, next) => {
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
};

export const getUserInfo: ExpressMiddleware = async (req, res, next) => {
  const { id } = req.user;
  try {
    const userData = await User.findById(id);
    const { name, email } = userData;

    res.json({ name, email });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
