import { RequestHandler } from "express";
import { extractToken } from "../validate-token";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { BizCardsError } from "../../error/biz-cards-error";
import { Card } from "../../database/model/card";
import { ICard } from "../../@types/card";

const isCardUserOrAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = await User.findOne({ email });
    if (!user) {
      throw new BizCardsError("User does not exist", 401);
    }
    const { id: cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      throw new BizCardsError("Card does not exist", 401);
    }

    if (user.isAdmin && card?.userId === user?.id) {
      req.card = card as ICard;
      return next();
    }
    throw new BizCardsError(
      "Only user who create the card can delete or admin",
      401
    );
  } catch (err) {
    next(err);
  }
};
export { isCardUserOrAdmin };
