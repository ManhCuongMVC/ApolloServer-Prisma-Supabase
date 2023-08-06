import { startStandaloneServer } from '@apollo/server/standalone';
import { server } from './server';
import { createContext } from './configs/context.config';

startStandaloneServer(server, {
  context: createContext,
  listen: { port: 8000 },
}).then((result) => {
  console.log(`🚀  Server ready at: ${result.url}`);
}).catch((error) => { console.error(error) });