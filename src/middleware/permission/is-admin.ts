import { RequestHandler, Request } from "express";
import { BizCardsError } from "../../error/biz-cards-error";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { extractToken } from "../validate-token";

const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    const user = await User.findOne({ email });

    const isAdmin = user?.isAdmin;
    if (isAdmin) {
      return next();
    }
    return res.status(401).json({ message: "Must be admin" });
  } catch (err) {
    next(err);
  }
};

export { isAdmin };
