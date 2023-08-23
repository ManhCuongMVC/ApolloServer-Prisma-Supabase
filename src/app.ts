import { startStandaloneServer } from '@apollo/server/standalone';
import { server } from './server';
import { createContext } from './configs/context.config';

startStandaloneServer(server, {
  context: async ({ req, res }) => createContext({ req, res }),
  listen: { port: 8000 },
}).then((result) => {
  console.log(`🎉 Server ready at: ${result.url}`);
}).catch((error) => { console.error(error) });