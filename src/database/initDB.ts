import { ICardInput } from "../@types/card";
import { IUser } from "../@types/user";
import { Logger } from "../logs/logger";
import { createCard } from "../service/card-service";
import { cardsData } from "./cards-data";
import { User } from "./model/user";
import { usersData } from "./users-data";

const initDB = async () => {
  try {
    const usersCount = await User.countDocuments();
    if (usersCount != 0) return;

    for (let user of usersData) {
      const saved = await new User(user).save();
      Logger.verbose("Added user: ", saved);
    }
    const { _id } = (await User.findOne({ isAdmin: true })) as IUser;
    for (let card of cardsData) {
      const savedCard = await createCard(card as ICardInput, _id!);
      Logger.verbose("Added card: ", savedCard);
    }
  } catch (err) {
    Logger.error("Error Connecting to database", err);
  }
};

export { initDB };
