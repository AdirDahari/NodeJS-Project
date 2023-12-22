import { Request } from "express";
import { IUser } from "./user";
import { ICard } from "./card";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
