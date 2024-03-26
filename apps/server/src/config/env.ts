import { config } from "dotenv";
import { cleanEnv, port, str } from "envalid";

config();

export const env = cleanEnv(process.env, {
    PORT: port({ default: 8080 }),
    MONGODB_URI: str(),
    COOKIE_PARSER_SECRET: str(),
    JWT_ACCESS_TOKEN_SECRET: str(),
    JWT_REFRESH_TOKEN_SECRET: str(),
    FIREBASE_STORAGE_BUCKET: str(),
    FIREBASE_PROJECT_ID: str(),
    FIREBASE_PRIVATE_KEY: str(),
    FIREBASE_CLIENT_EMAIL: str(),
})