import { productGraphql } from "./modules/products/schema.graphql";
import { productResolver } from "./modules/products/resolver";
import { ApolloServer } from "@apollo/server";
import { MyContext } from "./configs/context.config";
import db from "./configs/db.config";
import myPlugin from "./configs/plugin.config";

export const server = new ApolloServer<MyContext>({
  typeDefs: [
    productGraphql
  ],
  resolvers: [
    productResolver
  ],
  plugins: [
    myPlugin,
    {
      async serverWillStart() {
        console.log("🚀 Server starting up!")
        return {
          async drainServer() {
            console.log("\n🫠  Draining server!");
          },
          async serverWillStop() {
            console.log("😵 Server will stopping!")
            db.$disconnect().then(() => console.log("🖐️  DB disconnected!"));
          }
        }
      },
    }
  ]
});
