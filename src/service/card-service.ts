import { Card } from "../database/model/card";
import { BizCardsError } from "../error/biz-cards-error";
import { ICardInput } from "./../@types/card.d";
const createCard = async (data: ICardInput, userId: string) => {
  try {
    const card = new Card(data);

    card.userId = userId;
    card.likes = [];

    while (true) {
      const random = Math.floor(Math.random() * 1_000_000);
      const dbRes = await Card.findOne({ bizNumber: random });
      if (!dbRes) {
        card.bizNumber = random;
        break;
      }
    }

    return card.save();
  } catch (err) {
    throw new BizCardsError("Create card failed...", 500);
  }
};

export { createCard };
