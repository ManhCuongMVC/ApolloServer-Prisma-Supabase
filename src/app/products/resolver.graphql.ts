import { products } from "./schema.graphql";

export const productResolver = {
  Query: {
    products: () => products,
  },
  Mutation: {
    createProduct: (_parent: any, { input }: any, contextValue: any, info: any) => {
      products.push({ id: products.length + 1, ...input });
      return products[products.length - 1];
    }
  }
};