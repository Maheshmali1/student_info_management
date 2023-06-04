"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resSender = void 0;
const resSender = (res, statusCode, success, message) => {
    res.status(statusCode).json({
        success: success,
        message: message
    });
};
exports.resSender = resSender;
