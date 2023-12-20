import { Router } from "express";
import { IIsBusiness, ILogin, IUser } from "../@types/user";
import { User } from "../database/model/user";
import {
  validateIsBusiness,
  validateLogin,
  validateRegistration,
} from "../middleware/validation";
import { createUser, validateUser } from "../service/user-service";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { isUser } from "../middleware/is-user";
import { auth } from "../service/auth-service";
import { Logger } from "../logs/logger";
import { BizCardsError } from "../error/biz-cards-error";

const router = Router();

//GET all users
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (e) {
    next(e);
  }
});

//PUT update user
router.put("/:id", isUser, validateRegistration, async (req, res, next) => {
  try {
    req.body.password = await auth.hashPassword(req.body.password);

    const savedUser = (await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).lean()) as IUser;
    if (!savedUser) {
      throw new BizCardsError("User does not update", 401);
    }
    const { password, ...rest } = savedUser;
    res.json(rest);
  } catch (err) {
    next(err);
  }
});

//GET user by id
router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new BizCardsError("User does not exist", 401);
    }
    const { password, ...rest } = req.user;
    return res.json(rest);
  } catch (e) {
    next(e);
  }
});

//DELETE user
router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = (await User.findOneAndDelete({
      _id: id,
    }).lean()) as IUser;
    Logger.verbose("deleted the user");
    const { password, ...rest } = deleteUser;
    return res.json(rest);
  } catch (e) {
    next(e);
  }
});

//POST new user
router.post("/", validateRegistration, async (req, res, next) => {
  try {
    const saved = await createUser(req.body as IUser);
    res.status(201).json({ message: "Saved", user: saved });
  } catch (err) {
    next(err);
  }
});

//POST login
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin;
    const jwt = await validateUser(email, password);
    res.json(jwt);
  } catch (e) {
    next(e);
  }
});

//PATCH update user isBusiness status
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
    const { password, ...rest } = updateUser;
    res.json(rest);
  } catch (err) {
    next(err);
  }
});

export { router as usersRouter };
