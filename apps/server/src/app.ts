import cors from "cors";
import express from "express";
import morgan from "morgan";
import { env } from "./config/env";
import { corsOptions } from "./config/corsOptions";


const app = express();

// middlewares
const morganHandler = env.isProduction ? morgan("combined") : morgan("dev")
app.use(morganHandler)

app.use(cors(corsOptions))




// Routes

export { app }
