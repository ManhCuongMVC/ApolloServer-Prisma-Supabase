import { productGraphql } from "./modules/products/schema.graphql";
import { productResolver } from "./modules/products/resolver";
import { ApolloServer } from "@apollo/server";
import { MyContext } from "./configs/context.config";
import db from "./configs/db.config";
import myPlugin from "./configs/plugin.config";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import env from "./configs/env.config";

export const server = new ApolloServer<MyContext>({
  typeDefs: [
    productGraphql
  ],
  resolvers: [
    productResolver
  ],
  plugins: [
    /* Server error */
    {
      async unexpectedErrorProcessingRequest({ requestContext, error }) {
        console.log(`Something went wrong ${error}`)
      },
    },
  
    /* Plugin Request lifecycle. */
    myPlugin,

    /* Plugin landing page. */
    env.NODE_ENV === 'production'
    ? ApolloServerPluginLandingPageProductionDefault()
    : ApolloServerPluginLandingPageLocalDefault({ embed: false }),

    /* Plugin server. */
    {
      async serverWillStart() {
        await db.$connect().then(() => console.log("🚀 DB connected"));
        return {
          async drainServer() {
            console.log("\n🫠  Draining server!");
          },
          async serverWillStop() {
            console.log("😵 Server will stopping!")
            await db.$disconnect().then(() => console.log("🖐️  DB disconnected!"));
          }
        }
      },
    }
  ]
});
