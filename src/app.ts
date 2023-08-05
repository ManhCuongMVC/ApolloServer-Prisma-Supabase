import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { productGraphql } from "./app/products/schema.graphql";
import { productResolver } from "./app/products/resolver.graphql";

// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [
    productGraphql
  ],
  resolvers: [
    productResolver
  ]
});

startStandaloneServer(server, {
  listen: { port: 8000 },
}).then((result) => {
  console.log(`🚀  Server ready at: ${result.url}`);
})