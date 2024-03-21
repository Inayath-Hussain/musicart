import { app } from "./app";
import { connectToDb } from "./config/db";
import { env } from "./config/env";




async function main() {
    // start server after being able to connect to db successfully.
    connectToDb().then(() => {
        app.listen(env.PORT, () => console.log(`server listening on port ${env.PORT} in ${process.env.NODE_ENV} environment`))
    })
}


main();


// linkedin