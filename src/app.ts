import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { productGraphql } from "./app/products/schema.graphql";
import { productResolver } from "./app/products/resolver.graphql";

interface MyContext {
  currentUser: any,
  logger: any,
  db: any,
}

// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs: [
    productGraphql
  ],
  resolvers: [
    productResolver
  ]
});

startStandaloneServer(server, {
  context: async ({ req, res }) => ({
    currentUser: undefined,
    logger: undefined,
    db: undefined,
  }),
  listen: { port: 8000 },
}).then((result) => {
  console.log(`🚀  Server ready at: ${result.url}`);
}).catch((error) => { console.error(error) });