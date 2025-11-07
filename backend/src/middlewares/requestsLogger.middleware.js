export const requestsLoggerMiddleware = (req, res, next) => {
    res.on("finish", () => {
        console.group();
        console.log("-============================-");
        console.log(`Время: ${new Date().toISOString()}`);
        console.log(`Метод: ${req.method}`);
        console.log(`Статус: ${res.statusCode}`);
        console.log(`Ip: ${req.ip}`);
        console.log("-============================-");
        console.groupEnd();
    });

    next();
};