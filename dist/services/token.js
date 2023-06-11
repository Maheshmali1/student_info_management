"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToken = exports.findbyToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = require("dotenv");
dotenv.config();
const config_1 = __importDefault(require("config"));
const models_1 = require("../models");
const ACCESS_TOKEN_EXPIRE = config_1.default.get("ACCESS_TOKEN_EXPIRE");
const REFRESH_TOKEN_EXPIRE = config_1.default.get("REFRESH_TOKEN_EXPIRE");
// generate access tokens
const generateAccessToken = async (username) => {
    const accessToken = await jsonwebtoken_1.default.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE });
    try {
        const newToken = new models_1.Token({ token: accessToken });
        await newToken.save();
        return {
            statusCode: 201,
            success: true,
            message: { data: accessToken }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error
        };
    }
};
exports.generateAccessToken = generateAccessToken;
// generate refreshTokens
const generateRefreshToken = async (username) => {
    const refreshToken = await jsonwebtoken_1.default.sign(username, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE });
    try {
        const newToken = new models_1.Token({ token: refreshToken });
        await newToken.save();
        return {
            statusCode: 201,
            success: true,
            message: { data: refreshToken }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error
        };
    }
};
exports.generateRefreshToken = generateRefreshToken;
// Find token 
const findbyToken = async (token) => {
    try {
        const result = await models_1.Token.findOne({ token: token });
        if (result === undefined) {
            return {
                statusCode: 404,
                success: false,
                message: "Invalid token",
            };
        }
        return {
            statusCode: 200,
            success: true,
            message: { data: result.token }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error
        };
    }
};
exports.findbyToken = findbyToken;
// delete token 
const removeToken = async (token) => {
    try {
        const result = await models_1.Token.findOneAndDelete({ token: token });
        if (result === null) {
            return {
                statusCode: 404,
                success: false,
                message: "could not find token with given token value."
            };
        }
        return {
            statusCode: 200,
            success: true,
            message: { data: result }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error
        };
    }
};
exports.removeToken = removeToken;
