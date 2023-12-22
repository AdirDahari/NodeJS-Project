import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { BizCardsError } from "../error/biz-cards-error";
import { Logger } from "../logs/logger";
import { auth } from "./auth-service";

const createUser = async (userData: IUser) => {
  try {
    const user = new User(userData);
    user.password = await auth.hashPassword(user.password);
    return user.save();
  } catch (err) {
    Logger.error("Something worng...", err);
    throw new BizCardsError("Create user failed...", 500);
  }
};

const validateUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new BizCardsError("Bad credentials", 401);
    }

    //check the password:
    const isPasswordValid = await auth.validatePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new BizCardsError("Bad credentials", 401);
    }

    const jwt = auth.generateJWT({ email });

    return { jwt };
  } catch (err) {
    Logger.error("Something worng...", err);
    throw new BizCardsError("Create user failed...", 500);
  }
};

export { createUser, validateUser };
