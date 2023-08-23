import { GraphQLRequestContext, GraphQLRequestListener } from "@apollo/server";
import { MyContext } from "./context.config";

// Request lifecycle events
const myPlugin = {
    async requestDidStart( requestContext: GraphQLRequestContext<MyContext>): Promise<GraphQLRequestListener<MyContext>> {

        return {
            async parsingDidStart() {
                return async(err) => {
                    if (err) {
                        console.log("Parsing error: ", err);
                    }
                }
            },

            async validationDidStart() {
                return async(errs) => {
                    if (errs) {
                        errs.forEach(err => console.log("Validation error: ", err));
                    }
                }
            },

            async executionDidStart() {
                return {
                    willResolveField({ source, args, contextValue, info }){
                        return (error, result) => {
                            if (error) {
                                console.log(`It failed with ${error}`);
                              }
                        }
                    },
                    async executionDidEnd(err) {
                        if (err) {
                            console.log("Execution did end error: ", err);
                        }
                    }
                }
            }
        }
    }
}

export default myPlugin;