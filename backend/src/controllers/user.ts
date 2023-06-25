import { type Request, type Response, type NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { saveUser, findByNameUser, generateAccessToken, generateRefreshToken, findbyToken, removeToken } from '../services';

import { resSender } from '../utils';

// API for user registration.
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = (req.body as { username: string, password: string });

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await saveUser({ username: username, password: hashedPassword });

  if (result.success) {
    resSender(res, next, result.statusCode, true, result.message);
    return;
  }

  resSender(res, next, result.statusCode, false, result.message);
}

// API for user login.
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = (req.body as { username: string, password: string });

  const result = await findByNameUser(username);

  if (!result.success) {
    resSender(res, next, result.statusCode, false, result.message);
    return;
  }

  const dbPassword = result.message.data.password;
  if (await bcrypt.compare(password, dbPassword)) {
    const accessTokenResult = await generateAccessToken({ user: username });
    const refreshTokenResult = await generateRefreshToken({ user: username });

    if (!accessTokenResult.success) {
      resSender(res, next, accessTokenResult.statusCode, false, accessTokenResult.message);
      return;
    }

    if (!refreshTokenResult.success) {
      resSender(res, next, refreshTokenResult.statusCode, false, refreshTokenResult.message);
      return;
    }

    resSender(res, next, result.statusCode, true, { accessToken: accessTokenResult.message.data, refreshToken: refreshTokenResult.message.data });
  } else {
    resSender(res, next, 401, false, 'Password Incorrect!');
  }
}

// API to refresh token generating new accessToken and refreshTokens
export const refreshTokenGeneration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, token } = (req.body as { username: string, token: string });

  const result = await findbyToken(token);
  if (!result.success) {
    resSender(res, next, result.statusCode, false, 'Refresh token Invalid..');
    return;
  }

  const accessTokenResult = await generateAccessToken({ user: username });
  const refreshTokenResult = await generateRefreshToken({ user: username });

  if (!accessTokenResult.success) {
    resSender(res, next, accessTokenResult.statusCode, false, accessTokenResult.message);
    return;
  }

  if (!refreshTokenResult.success) {
    resSender(res, next, refreshTokenResult.statusCode, false, refreshTokenResult.message);
    return;
  }

  resSender(res, next, refreshTokenResult.statusCode, true, { accessToken: accessTokenResult.message.data, refreshToken: refreshTokenResult.message.data });
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { accessToken, refreshToken } = (req.body as { accessToken: string, refreshToken: string });

  if (accessToken === undefined || refreshToken === undefined) {
    resSender(res, next, 400, false, 'accessToken and refreshToken both should be present');
    return;
  }

  const refreshTokenCheck = await findbyToken(refreshToken);

  if (!refreshTokenCheck.success) {
    resSender(res, next, 400, false, 'Invalid refreshToken provided');
    return;
  }

  const accessTokenCheck = await findbyToken(accessToken);
  if (!accessTokenCheck.success) {
    resSender(res, next, 400, false, 'Invalid accessToken provided');
    return;
  }

  const refreshTokenResult = await removeToken(refreshToken);
  if (!refreshTokenResult.success) {
    resSender(res, next, refreshTokenResult.statusCode, false, refreshTokenResult.message);
    return;
  }

  const accessTokenResult = await removeToken(accessToken);
  if (!accessTokenResult.success) {
    resSender(res, next, accessTokenResult.statusCode, false, accessTokenResult.message);
    return;
  }

  resSender(res, next, accessTokenResult.statusCode, true, 'Logged out user successfully');
}
