import { userService } from "../services/user.service.js";

class UserController {
    // == Получение списка пользователей ==
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();

            return res.json({
                success: true,
                users,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Регистрация пользователя ==
    async register(req, res, next) {
        try {
            const { user, accessToken, refreshToken } = await userService.register(req.body);

            res.cookie("refreshToken", refreshToken, {
                maxAge: 3_600_000 * 24 * 30, // 30 дней
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
            })

            return res.status(201).json({
                success: true,
                user,
                accessToken,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Авторизация пользователя ==
    async login(req, res, next) {
        try {
            const { user, accessToken, refreshToken } = await userService.login(req.body);

            res.cookie("refreshToken", refreshToken, {
                maxAge: 3_600_000 * 24 * 30, // 30 дней
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
            })

            return res.status(201).json({
                success: true,
                user,
                accessToken,
            });
        } catch (error) {
            next(error);
        }
    }
};

export const userController = new UserController();