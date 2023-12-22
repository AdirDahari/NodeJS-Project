import { RequestHandler } from "express";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { BizCardsError } from "../../error/biz-cards-error";
import { IUser } from "../../@types/user";
import { extractToken } from "../validate-token";

const isUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    const user = (await User.findOne({ email }).lean()) as IUser;

    if (!user) throw new BizCardsError("User does not exist", 401);

    req.user = user;

    if (id == user?._id) return next();

    throw new BizCardsError("The id must belong to the user", 401);
  } catch (e) {
    next(e);
  }
};

export { isUser };
