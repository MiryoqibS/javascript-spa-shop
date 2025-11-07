import { ENV } from "../config/ENV.js";
import { ApiError } from "../errors/ApiError.js";
import { UserModel } from "../models/User.model.js";
import bcrypt from "bcrypt";
import { v4 as verificationCodeGenerator } from "uuid";
import { tokenService } from "./token.service.js";
import { UserDto } from "../dtos/user.object.js";
import { mailService } from "./mail.service.js";
import { roleService } from "./role.service.js";

class UserService {
    // == Получение списка пользователей ==
    async getUsers() {
        const users = await UserModel.find();
        return users;
    }

    // == Регистрация ==
    async register({ password, email, username }) {
        if (!password) throw ApiError.BaqRequestError("не валидный пароль");
        if (!email) throw ApiError.BaqRequestError("не валидная электронная почта");
        if (!username) throw ApiError.BaqRequestError("не валидное имя пользователя");

        // проверка на уникальность почты
        const candidate = await UserModel.findOne({ email });
        if (candidate) throw ApiError.BaqRequestError("пользователь с такой почтой уже зарегистрирован");
        // хеширование пароля
        const hashedPassword = await bcrypt.hash(password, ENV.SALT_ROUNDS);
        // создание ссылки подтверждения
        const verificationCode = await verificationCodeGenerator();
        const verificationLink = `${ENV.API_URL}/api/verify/${verificationCode}`;
        // роли
        const userRole = await roleService.getUser("user");
        const roles = [userRole];

        // отправление письма с ссылкой подтверждения
        await mailService.sendVerificationLink({
            email,
            username,
            link: verificationLink,
        });

        // создание модели пользователя в базе
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            verificationCode,
            verificationLink,
            roles,
        });

        // генерация ключей доступа и обновления
        const userDto = new UserDto(user);
        const { accessToken, refreshToken } = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, refreshToken);

        return { user: userDto, accessToken, refreshToken };
    }

    // == Авторизация ==
    async login({ password, email }) {
        const candidate = await UserModel.findOne({ email });
        if (!candidate) throw ApiError.BaqRequestError("пользователя с такой электронной почтой не существует");
        const isMatch = await bcrypt.compare(password, candidate.password);
        if (!isMatch) throw ApiError.UnAuthorizedError();
        const isVerified = candidate.isVerified;
        if (!isVerified) throw ApiError.BaqRequestError("пользователь не подтвердил аккаунт");

        // генерация ключей доступа и обновления
        const userDto = new UserDto(candidate);
        const { accessToken, refreshToken } = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, refreshToken);

        return { user: userDto, accessToken, refreshToken };
    }
}

export const userService = new UserService();