import { productGraphql } from "./modules/products/schema.graphql";
import { productResolver } from "./modules/products/resolver";
import { ApolloServer } from "@apollo/server";
import { MyContext } from "./configs/context.config";
import ApolloServerOperationRegistry from '@apollo/server-plugin-operation-registry';

export const server = new ApolloServer<MyContext>({
  typeDefs: [
    productGraphql
  ],
  resolvers: [
    productResolver
  ],
  plugins: [
    ApolloServerOperationRegistry({}),
    require("./configs/plugin.config"),
    {
      async serverWillStart(service) {
        console.log("Server starting up!")
      },
    }
  ]
});
