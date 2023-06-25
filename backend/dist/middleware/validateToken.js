"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
const validateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
        (0, utils_1.resSender)(res, next, 400, false, 'Token not present');
        return;
    }
    const token = authHeader.split(' ')[1];
    if (token === null) {
        (0, utils_1.resSender)(res, next, 400, false, 'Token not present');
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        const result = await (0, services_1.findbyToken)(token);
        if (!result.success || (err != null)) {
            (0, utils_1.resSender)(res, next, 403, false, 'Token invalid');
            return;
        }
        next();
    });
};
exports.validateToken = validateToken;
