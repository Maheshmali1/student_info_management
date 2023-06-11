import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import { saveUser, findByNameUser, generateAccessToken, generateRefreshToken, findbyToken, removeToken } from "../services";

import { resSender } from "../utils";


// API for user registration.
export const registerUser: RequestHandler = async (req, res, next) => {

    const { username, password } = (req.body as { username: string, password: string });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await saveUser({ username: username, password: hashedPassword });

    if (result.success) {
        return resSender(res, result.statusCode, true, result.message);
    }

    return resSender(res, result.statusCode, false, result.message);

}

// API for user login.
export const loginUser: RequestHandler = async (req, res, next) => {

    const { username, password } = (req.body as { username: string, password: string });

    const result = await findByNameUser(username);

    if (!result.success) {
        return resSender(res, result.statusCode, false, result.message);
    }

    const dbPassword = result.message.data.password;
    if (await bcrypt.compare(password, dbPassword)) {
        const accessTokenResult = await generateAccessToken({ user: username });
        const refreshTokenResult = await generateRefreshToken({ user: username });

        if (!accessTokenResult.success || !refreshTokenResult.success) {
            return resSender(res, result.statusCode, false, "Database error while generating tokens.");
        }

        return resSender(res, result.statusCode, true, { accessToken: accessTokenResult.message.data, refreshToken: refreshTokenResult.message.data });
    }
    else {
        return resSender(res, 401, false, "Password Incorrect!");
    }

}


// API to refresh token generating new accessToken and refreshTokens
export const refreshTokenGeneration: RequestHandler = async (req, res, next) => {

    const { username, token } = (req.body as { username: string, token: string });

    const result = await findbyToken(token);
    if (!result.success) {
        return resSender(res, result.statusCode, false, "Refresh token Invalid..");
    }

    const accessTokenResult = await generateAccessToken({ user: username });
    const refreshTokenResult = await generateRefreshToken({ user: username });

    if (!accessTokenResult.success || !refreshTokenResult.success) {
        return resSender(res, result.statusCode, false, "Database error while generating tokens.");
    }

    return resSender(res, result.statusCode, true, { accessToken: accessTokenResult.message.data, refreshToken: refreshTokenResult.message.data });

}

export const logoutUser: RequestHandler = async(req, res, next) => {
    const { token } = (req.body as { token: string });

    const result = await removeToken(token);
    if(!result.success){
        return resSender(res,result.statusCode,false,result.message);
    }
    return resSender(res, result.statusCode, true, "logged out user successfully.");
}