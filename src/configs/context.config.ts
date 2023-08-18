import { BaseContext } from "@apollo/server";
import db from "./db.config";
import env from "./env.config"
import logger from "./logger.config";

export interface MyContext extends BaseContext {
  currentUser: any,
  logger: typeof logger,
  db: typeof db,
  env: any,
  redis: any
}

export const createContext = async ({ req, res }) => {
  return {
    currentUser: undefined,
    logger,
    db,
    env,
    redis: undefined
  }
}