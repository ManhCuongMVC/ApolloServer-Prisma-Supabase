import { BaseContext } from "@apollo/server";

export interface MyContext extends BaseContext {
  currentUser: any,
  logger: any,
  db: any,
  env: any
}

export const createContext = async () => ({
  currentUser: undefined,
  logger: undefined,
  db: undefined,
  env: undefined
})