"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resSender = void 0;
// Response sender function.
const resSender = (res, next, statusCode, success, message) => {
    if (message instanceof Error) {
        // add logger here.
        return next(message);
    }
    res.status(statusCode).json({
        success: success,
        message: message
    });
};
exports.resSender = resSender;
