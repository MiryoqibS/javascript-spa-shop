import jwt from "jsonwebtoken";
import { ENV } from "../config/ENV.js";
import { TokenModel } from "../models/Token.model.js";

class TokenService {
    // == создание токенов доступа и обновления ==
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m",
        });

        const refreshToken = jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
            expiresIn: "30d",
        });

        return { accessToken, refreshToken };
    }

    // == сохранение/обновление токена обновления в базе данных ==
    async saveToken(userId, refreshToken) {
        const candidate = await TokenModel.findOne({ userId });
        
        if (candidate) {
            candidate.refreshToken = refreshToken;
            await candidate.save();
            return candidate.toObject();
        };

        const tokenData = await TokenModel.create({
            userId,
            refreshToken,
        }).then(t => t.toObject());

        return tokenData;
    } 
}

export const tokenService = new TokenService();