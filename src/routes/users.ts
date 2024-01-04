import { Router } from "express";
import { IIsBusiness, ILogin, IUser } from "../@types/user";
import { User } from "../database/model/user";
import {
  validateIsBusiness,
  validateLogin,
  validateRegistration,
  validateUpdateUser,
} from "../middleware/validation";
import { createUser, validateUser } from "../service/user-service";
import { isAdmin } from "../middleware/permission/is-admin";
import { isAdminOrUser } from "../middleware/permission/is-admin-or-user";
import { isUser } from "../middleware/permission/is-user";
import { Logger } from "../logs/logger";
import { BizCardsError } from "../error/biz-cards-error";

const router = Router();

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    Logger.debug("Users found");
    res.status(200).json(allUsers);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", isUser, validateUpdateUser, async (req, res, next) => {
  try {
    const savedUser = (await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).lean()) as IUser;
    if (!savedUser) {
      throw new BizCardsError("User does not update", 401);
    }
    const { password, ...rest } = savedUser;
    Logger.debug("User updated");
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new BizCardsError("User does not exist", 401);
    }
    const { password, ...rest } = req.user;
    Logger.debug("User found");
    return res.status(200).json(rest);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = (await User.findOneAndDelete({
      _id: id,
    }).lean()) as IUser;
    const { password, ...rest } = deleteUser;
    Logger.debug("User deleted");
    return res.status(200).json(rest);
  } catch (e) {
    next(e);
  }
});

router.post("/", validateRegistration, async (req, res, next) => {
  try {
    const saved = await createUser(req.body as IUser);
    const { password, ...rest } = saved._doc!;
    Logger.debug("User created");
    res.status(201).json({ message: "Saved", user: rest });
  } catch (err) {
    next(err);
  }
});

router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin;
    const jwt = await validateUser(email, password);
    Logger.debug("User logged in");
    res.status(200).json(jwt);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", validateIsBusiness, isUser, async (req, res, next) => {
  try {
    const { isBusiness } = req.body as IIsBusiness;
    const updateUser = (await User.findByIdAndUpdate(
      { _id: req.params.id },
      { isBusiness: isBusiness },
      { new: true }
    ).lean()) as IUser;
    if (!updateUser) {
      throw new BizCardsError("User does not update", 401);
    }
    const { isBusiness: isBiz } = updateUser;
    Logger.debug("User updated");
    res.status(200).json({ isBusiness: isBiz });
  } catch (err) {
    next(err);
  }
});

export { router as usersRouter };
