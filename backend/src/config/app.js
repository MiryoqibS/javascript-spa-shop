import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { productRoutes } from "../routes/product.routes.js";
import { userRoutes } from "../routes/user.routes.js";
import { errorsHandlerMiddleware } from "../middlewares/errorsHandler.middleware.js";
import { requestsLoggerMiddleware } from "../middlewares/requestsLogger.middleware.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// == Базовые мидлварки ==
app.use(json());
app.use(cookieParser());
app.use(cors());

// == Роутинг ==
app.use("/api", productRoutes);
app.use("/api", userRoutes);

// == Хранилище ==
app.use("/storage/avatars", express.static(path.resolve(__dirname, "../uploads/avatars")));

// == Кастомные мидлварки ==
app.use(requestsLoggerMiddleware);
app.use(errorsHandlerMiddleware);