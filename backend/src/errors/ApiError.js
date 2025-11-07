export class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    // == Ошибка не валидного запрос ==
    static BaqRequestError(message = "не валидный запрос") {
        return new ApiError(message, 400);
    }

    // == Ошибка не авторизованного пользователя ==
    static UnAuthorizedError() {
        return new ApiError("не авторизованный пользователь", 401);
    }
}