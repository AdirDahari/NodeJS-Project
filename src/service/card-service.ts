import { Card } from "../database/model/card";
import { Logger } from "../logs/logger";
import { ICardInput } from "./../@types/card.d";
const createCard = async (data: ICardInput, userId: string) => {
  try {
    //bizNumber, userId
    const card = new Card(data);

    card.userId = userId;
    card.likes = [];
    //random number that does not exist in the database:
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
    Logger.error("Something worng...", err);
  }
};

export { createCard };
