import { Router } from "express";
import { isBusiness } from "../middleware/permission/is-business";
import { validateBizNumber, validateCard } from "../middleware/validation";
import { createCard, updateBizNumber } from "../service/card-service";
import { IBizNumber, ICard, ICardInput } from "../@types/card";
import { BizCardsError } from "../error/biz-cards-error";
import { Card } from "../database/model/card";
import { validateToken } from "../middleware/validate-token";
import { isCardUser } from "../middleware/permission/is-card-user";
import { isCardUserOrAdmin } from "../middleware/permission/is-card-user-or-admin";
import { Logger } from "../logs/logger";
import { isAdmin } from "../middleware/permission/is-admin";

const router = Router();

router.post("/", isBusiness, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      throw new BizCardsError("User must have an id", 401);
    }
    const savedCard = await createCard(req.body as ICardInput, userId);
    Logger.debug("Card saved");
    return res.status(201).json({ card: savedCard });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find();
    Logger.debug("Cards founds");
    return res.status(200).json(cards);
  } catch (err) {
    next(err);
  }
});

router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id!;

    const cards = await Card.find({ userId });
    Logger.debug("Card found");
    return res.status(200).json(cards);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);
    Logger.debug("Card found");
    return res.status(200).json(card);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validateCard, isCardUser, async (req, res, next) => {
  try {
    const updateCard = await Card.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    Logger.debug("Card updated");
    return res.status(200).json(updateCard);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", validateToken, async (req, res, next) => {
  try {
    const { likes, _id } = (await Card.findById(req.params.id)) as ICard;
    const indexId = likes.indexOf(req.user?._id!);

    if (indexId === -1) {
      console.log(likes);

      likes.push(req.user?._id!);
      const updatedLikes = (await Card.findByIdAndUpdate(
        { _id: _id },
        { likes: likes },
        { new: true }
      ).lean()) as ICard;
      Logger.debug("Card updated");
      return res.status(200).json(updatedLikes);
    }
    likes.splice(indexId, 1);
    const updatedLikes = (await Card.findByIdAndUpdate(
      { _id: _id },
      { likes: likes },
      { new: true }
    ).lean()) as ICard;
    Logger.debug("Card updated");
    return res.status(200).json(updatedLikes);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isCardUserOrAdmin, async (req, res, next) => {
  try {
    const deletedCard = (await Card.deleteOne({
      _id: req.params.id,
    }).lean()) as ICard;
    Logger.debug("deleted the card");
    res.status(200).json(deletedCard);
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/biz-number/:id",
  isAdmin,
  validateBizNumber,
  async (req, res, next) => {
    try {
      const { bizNumber } = req.body as IBizNumber;
      const updateBizNum = await updateBizNumber(bizNumber, req.params.id);
      if (!updateBizNum) {
        throw new BizCardsError("BizNumber already taken", 400);
      }
      Logger.debug("BizNumber updated");
      res.status(200).json(updateBizNum);
    } catch (err) {
      next(err);
    }
  }
);

export { router as cardsRouter };
