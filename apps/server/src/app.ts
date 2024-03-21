import cors from "cors";
import cookieparser from "cookie-parser"
import express from "express";
import morgan from "morgan";
import { env } from "./config/env";
import { corsOptions } from "./config/corsOptions";
import { mainRouter } from "./routes";
import { errorHandler } from "./utilities/requestHandlers/errorHandler";


const app = express();

// middlewares
const morganHandler = env.isProduction ? morgan("combined") : morgan("dev")
app.use(morganHandler)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieparser(env.COOKIE_PARSER_SECRET))




// Routes
app.use("/api", mainRouter)


app.use(errorHandler)

export { app }
