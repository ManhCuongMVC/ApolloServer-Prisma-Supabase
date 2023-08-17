const myPlugin = {
    async requestDidStart() {
        console.log("request did started");

        return {
            async parsingDidStart(requestContext) {
                console.log("Parsing started!");
                return async(err) => {
                    if (err) {
                        console.log("Parsing error: ", err);
                    }
                }
            },

            async validationDidStart(requestContext) {
                console.log("Validation started!");
                return async(errs) => {
                    if (errs) {
                        errs.forEach(err => console.log("Validation error: ", err));
                    }
                }
            },

            async executionDidStart() {
                return {
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