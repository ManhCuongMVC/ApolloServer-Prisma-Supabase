import { productGraphql } from "./modules/products/schema.graphql";
import { productResolver } from "./modules/products/resolver";
import { ApolloServer } from "@apollo/server";
import { MyContext } from "./configs/context.config";

export const server = new ApolloServer<MyContext>({
  typeDefs: [
    productGraphql
  ],
  resolvers: [
    productResolver
  ],
});
