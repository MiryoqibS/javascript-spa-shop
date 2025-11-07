import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRoutes = Router();

/*
GET /users - получение списка пользователей
POST /login - авторизация пользователя
POST /register - регистрация пользователя
GET /verify/:code - подтверждения аккаунта пользователя
GET /profile - получения профиля авторизированного пользователя
POST /refresh - обновление токена авторизированного пользователя
*/

userRoutes.get("/users", userController.getUsers);
userRoutes.post("/register", userController.register);