import configDotEnv from "./config";
import express, { json } from "express";
import { notFound } from "./middleware/not-found";
import { usersRouter } from "./routes/users";
import { connect } from "./database/connection";
import { errorHandler } from "./middleware/error-handler";
import morgan from "morgan";
import cors from "cors";
import { cardsRouter } from "./routes/cards";
import { Logger } from "./logs/logger";

configDotEnv();
connect();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.static("public"));

app.use(json());
app.use(morgan("common"));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  Logger.info(`App is running: http://localhost:${PORT}`);
});
