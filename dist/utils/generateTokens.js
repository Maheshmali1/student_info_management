"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRefreshToken = exports.checkRefreshTokens = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = require("dotenv");
dotenv.config();
const services_1 = require("../services");
const generateAccessToken = (username) => {
    return jsonwebtoken_1.default.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};
exports.generateAccessToken = generateAccessToken;
// refreshTokens
let refreshTokens = [];
const generateRefreshToken = async (username) => {
    const refreshToken = jsonwebtoken_1.default.sign(username, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20m" });
    const result = await (0, services_1.saveToken)(refreshToken);
    if (!result.success) {
        return {
            success: false,
            message: "Database error while saving token."
        };
    }
    return {
        success: true,
        message: refreshToken
    };
};
exports.generateRefreshToken = generateRefreshToken;
const checkRefreshTokens = (token) => {
    if (!refreshTokens.includes(token)) {
        return false;
    }
    refreshTokens = refreshTokens.filter((tok) => tok != token);
};
exports.checkRefreshTokens = checkRefreshTokens;
const deleteRefreshToken = (token) => {
    refreshTokens = refreshTokens.filter((c) => c != token);
};
exports.deleteRefreshToken = deleteRefreshToken;
