import { RequestHandler, Request } from "express";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { BizCardsError } from "../../error/biz-cards-error";
import { IUser } from "../../@types/user";
import { extractToken } from "../validate-token";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    //get user from database:
    const user = (await User.findOne({ email }).lean()) as IUser;
    req.user = user;

    if (!user) throw new BizCardsError("User does not exist", 401);

    if (id == user._id) return next();

    if (user.isAdmin) return next();

    res
      .status(401)
      .json({ message: "Only admin/The id must belong to the user" });
  } catch (e) {
    next(e);
  }
};

export { isAdminOrUser };
