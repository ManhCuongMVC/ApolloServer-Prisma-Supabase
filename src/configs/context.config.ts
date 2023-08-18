import { BaseContext } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import db from "./db.config";
import env from "./env.config"

export interface MyContext extends BaseContext {
  currentUser: any,
  logger: any,
  db: PrismaClient,
  env: any,
  redis: any
}

export const createContext = async ({ req, res }) => {
  return {
    currentUser: undefined,
    logger: undefined,
    db,
    env,
    redis: undefined
  }
}