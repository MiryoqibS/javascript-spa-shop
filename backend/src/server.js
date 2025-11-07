import { app } from "./config/app.js";
import { ENV } from "./config/ENV.js";
import { connectDatabase } from "./config/database.js";
import { roleService } from "./services/role.service.js";

const server = async () => {
    try {
        await connectDatabase();
        const serverApplication = app.listen(ENV.PORT, () => {
            console.log(`Сервер запущен на порту: ${ENV.PORT}`);
        });
        return serverApplication;
    } catch (error) {
        console.log(`Не удалось запустить сервер: ${error.message}`);
    };
};

server();