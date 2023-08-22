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
import { ApolloServerErrorCode } from '@apollo/server/errors';

export const server = new ApolloServer<MyContext>({
  typeDefs: [
    productGraphql
  ],
  resolvers: [
    productResolver
  ],
  status400ForVariableCoercionErrors: true,
  /* By default, Apollo Server omits the stacktrace field if the NODE_ENV === ( production || test ) */
  // includeStacktraceInErrorResponses: true, 
  formatError(formattedError, error) {
    if (
      formattedError?.extensions?.code ===
      ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
    ) {
      return {
        ...formattedError,
        message: "Your query doesn't match the schema. Try double-checking it!",
      }
    }

    if (
      formattedError.message.startsWith("Database Error: ")
    ) {
      return { message: "Internal Server Error" }
    }

    console.log("😱 An error occurred: ", formattedError);
    return formattedError;
  },
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
        await db.$connect().then(() => console.log("🔗 DB connected"));
        return {
          async drainServer() {
            console.log("\n🫠  Draining server!");
          },
          async serverWillStop() {
            console.log("🖐️  Server will stopping!")
            await db.$disconnect().then(() => console.log("🛑 DB disconnected!"));
          }
        }
      },
    }
  ]
});
