"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.refreshTokenGeneration = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const services_1 = require("../services");
const utils_1 = require("../utils");
// API for user registration.
const registerUser = async (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const result = await (0, services_1.saveUser)({ username: username, password: hashedPassword });
    if (result.success) {
        return (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
    }
    return (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.registerUser = registerUser;
// API for user login.
const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    const result = await (0, services_1.findByNameUser)(username);
    if (!result.success) {
        return (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
    }
    const dbPassword = result.message.data.password;
    if (await bcrypt_1.default.compare(password, dbPassword)) {
        const accessTokenResult = await (0, services_1.generateAccessToken)({ user: username });
        const refreshTokenResult = await (0, services_1.generateRefreshToken)({ user: username });
        if (!accessTokenResult.success) {
            return (0, utils_1.resSender)(res, next, accessTokenResult.statusCode, false, accessTokenResult.message);
        }
        if (!refreshTokenResult.success) {
            return (0, utils_1.resSender)(res, next, refreshTokenResult.statusCode, false, refreshTokenResult.message);
        }
        return (0, utils_1.resSender)(res, next, result.statusCode, true, { accessToken: accessTokenResult.message.data, refreshToken: refreshTokenResult.message.data });
    }
    else {
        return (0, utils_1.resSender)(res, next, 401, false, "Password Incorrect!");
    }
};
exports.loginUser = loginUser;
// API to refresh token generating new accessToken and refreshTokens
const refreshTokenGeneration = async (req, res, next) => {
    const { username, token } = req.body;
    const result = await (0, services_1.findbyToken)(token);
    if (!result.success) {
        return (0, utils_1.resSender)(res, next, result.statusCode, false, "Refresh token Invalid..");
    }
    const accessTokenResult = await (0, services_1.generateAccessToken)({ user: username });
    const refreshTokenResult = await (0, services_1.generateRefreshToken)({ user: username });
    if (!accessTokenResult.success) {
        return (0, utils_1.resSender)(res, next, accessTokenResult.statusCode, false, accessTokenResult.message);
    }
    if (!refreshTokenResult.success) {
        return (0, utils_1.resSender)(res, next, refreshTokenResult.statusCode, false, refreshTokenResult.message);
    }
    return (0, utils_1.resSender)(res, next, refreshTokenResult.statusCode, true, { accessToken: accessTokenResult.message.data, refreshToken: refreshTokenResult.message.data });
};
exports.refreshTokenGeneration = refreshTokenGeneration;
const logoutUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.body;
    if (accessToken === undefined || refreshToken === undefined) {
        return (0, utils_1.resSender)(res, next, 400, false, "accessToken and refreshToken both should be present");
    }
    const refreshTokenCheck = await (0, services_1.findbyToken)(refreshToken);
    if (!refreshTokenCheck.success) {
        return (0, utils_1.resSender)(res, next, 400, false, "Invalid refreshToken provided");
    }
    const accessTokenCheck = await (0, services_1.findbyToken)(accessToken);
    if (!accessTokenCheck.success) {
        return (0, utils_1.resSender)(res, next, 400, false, "Invalid accessToken provided");
    }
    const refreshTokenResult = await (0, services_1.removeToken)(refreshToken);
    if (!refreshTokenResult.success) {
        return (0, utils_1.resSender)(res, next, refreshTokenResult.statusCode, false, refreshTokenResult.message);
    }
    const accessTokenResult = await (0, services_1.removeToken)(accessToken);
    if (!accessTokenResult.success) {
        return (0, utils_1.resSender)(res, next, accessTokenResult.statusCode, false, accessTokenResult.message);
    }
    return (0, utils_1.resSender)(res, next, accessTokenResult.statusCode, true, "Logged out user successfully");
};
exports.logoutUser = logoutUser;
