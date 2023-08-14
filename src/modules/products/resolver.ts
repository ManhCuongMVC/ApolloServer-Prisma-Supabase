import { PrismaClient } from "@prisma/client";
import { products } from "./schema.graphql";

const prisma = new PrismaClient()
export const productResolver = {
  Query: {
    products: (_parent: any, { input }: any, contextValue: any, info: any) => {
      return prisma.product.findMany();
    },
  },
  Mutation: {
    createProduct: (_parent: any, { input }: any, contextValue: any, info: any) => {
      return prisma.product.create({
        data: input
      });
    }
  }
};