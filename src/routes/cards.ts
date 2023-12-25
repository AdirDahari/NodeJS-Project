import { Router } from "express";
import { isBusiness } from "../middleware/permission/is-business";
import { validateCard } from "../middleware/validation";
import { createCard } from "../service/card-service";
import { ICard, ICardInput } from "../@types/card";
import { BizCardsError } from "../error/biz-cards-error";
import { Card } from "../database/model/card";
import { validateToken } from "../middleware/validate-token";
import { isCardUser } from "../middleware/permission/is-card-user";
import { isCardUserOrAdmin } from "../middleware/permission/is-card-user-or-admin";
import { Logger } from "../logs/logger";

const router = Router();

//POST Create card
router.post("/", isBusiness, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      throw new BizCardsError("User must have an id", 500);
    }
    const savedCard = await createCard(req.body as ICardInput, userId);
    Logger.debug("Card saved");
    return res.json({ card: savedCard });
  } catch (e) {
    next(e);
  }
});

//GET All cards
router.get("/", async (req, res, next) => {
  try {
    //move to service
    const cards = await Card.find();
    Logger.debug("Cards founds");
    return res.json(cards);
  } catch (e) {
    next(e);
  }
});

//GET My cards
router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id!;

    const cards = await Card.find({ userId });
    Logger.debug("Card found");
    return res.json(cards);
  } catch (e) {
    next(e);
  }
});

//GET Card by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);
    Logger.debug("Card found");
    return res.json(card);
  } catch (e) {
    next(e);
  }
});

//PUT Update user
router.put("/:id", validateCard, isCardUser, async (req, res, next) => {
  try {
    const updateCard = await Card.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    Logger.debug("Card updated");
    return res.json(updateCard);
  } catch (err) {
    next(err);
  }
});

//PATCH Update likes card
router.patch("/:id", validateToken, async (req, res, next) => {
  try {
    const { likes, _id } = (await Card.findById(req.params.id)) as ICard;
    const indexId = likes.indexOf(req.user?._id!);

    if (indexId === -1) {
      likes.push(req.user?._id!);
      const updatedLikes = (await Card.findByIdAndUpdate(
        { _id: _id },
        { likes: likes },
        { new: true }
      ).lean()) as ICard;
      Logger.debug("Card updated");
      return res.json(updatedLikes);
    }
    likes.splice(indexId, 1);
    const updatedLikes = (await Card.findByIdAndUpdate(
      { _id: _id },
      { likes: likes },
      { new: true }
    ).lean()) as ICard;
    Logger.debug("Card updated");
    return res.json(updatedLikes);
  } catch (err) {
    next(err);
  }
});

//DELETE Card by id
router.delete("/:id", isCardUserOrAdmin, async (req, res, next) => {
  try {
    const deletedCard = (await Card.deleteOne({
      _id: req.params.id,
    }).lean()) as ICard;
    Logger.debug("deleted the card");
    res.json(deletedCard);
  } catch (err) {
    next(err);
  }
});

export { router as cardsRouter };
