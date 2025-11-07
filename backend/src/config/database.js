import { connect } from "mongoose";
import { ENV } from "./ENV.js";

export const connectDatabase = async () => {
    try {
        await connect(ENV.MONGO_URI);
    } catch (error) {
        console.log(`Не удалось подключиться к базе данных: ${error}`);
    };
};