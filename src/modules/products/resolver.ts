import { PrismaClient } from "@prisma/client";
import { products } from "./schema.graphql";
import { MyContext } from "../../configs/context.config";

export const productResolver = {
  Query: {
    products: (_parent: any, { input }: any, { db }: MyContext, info: any) => {
      return db.product.findMany();
    },
  },
  Mutation: {
    createProduct: (_parent: any, { input }: any, { db }: MyContext, info: any) => {
      return db.product.create({
        data: input
      });
    }
  }
};