import mongoose from "mongoose";
import config from "../configs/index";
import logger from "../utils/logger";

let database;

const connect = async () => {
  const MONGODB_URL = config.DB_CONNECTION_STRING;
  if (database) return;
  console.log("MONGODB_URL:", process.env.MONGODB_URL);
  mongoose
    .connect(MONGODB_URL)
    .then((connection) => {
      database = connection;
      logger.info("Database are Synced");
    })
    .catch((err) => {
      logger.error(err.message);
    });
};
export { connect };
