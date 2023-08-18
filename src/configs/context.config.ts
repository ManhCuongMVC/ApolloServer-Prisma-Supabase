import { BaseContext } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import 'dotenv/config'
import db from "./db.config";

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
    env: process.env,
    redis: undefined
  }
}