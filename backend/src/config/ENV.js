import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, ".env") });

export const ENV = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: Number(process.env.PORT) || 8080,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
    API_URL: process.env.API_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
};