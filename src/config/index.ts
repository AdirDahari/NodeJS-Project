import { config } from "dotenv";
import { Logger } from "../logs/logger";

const configDotEnv = () => {
  config({ path: "src/config/.env" });

  const mode = process.env.NODE_ENV;
  Logger.info(`App is running in ${mode} Mode`);
  Logger.info(`Config file: src/config/${mode}.env`);

  config({ path: `src/config/${mode}.env` });
};

export default configDotEnv;

export { configDotEnv };
