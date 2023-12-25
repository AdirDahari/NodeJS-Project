import { RequestHandler } from "express";
import { Logger } from "../logs/logger";

const notFound: RequestHandler = (req, res, next) => {
  Logger.debug("Not found");
  res.status(404).json({ message: "Not Found" });
};

export { notFound };
