import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import config from 'config';

import { type DBresult, Token } from '../models';

const ACCESS_TOKEN_EXPIRE: string = config.get('ACCESS_TOKEN_EXPIRE');
const REFRESH_TOKEN_EXPIRE: string = config.get('REFRESH_TOKEN_EXPIRE');

// generate access tokens
export const generateAccessToken = async (username: any): Promise<DBresult> => {
  const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: ACCESS_TOKEN_EXPIRE })
  try {
    const newToken = new Token({ token: accessToken });
    await newToken.save();
    return {
      statusCode: 201,
      success: true,
      message: { data: accessToken }
    }
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error
    }
  }
}

// generate refreshTokens
export const generateRefreshToken = async (username: any): Promise<DBresult> => {
  const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: REFRESH_TOKEN_EXPIRE })

  try {
    const newToken = new Token({ token: refreshToken });
    await newToken.save();
    return {
      statusCode: 201,
      success: true,
      message: { data: refreshToken }
    }
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error
    }
  }
}

// Find token
export const findbyToken = async (token: string): Promise<DBresult> => {
  try {
    const result = await Token.findOne({ token });
    if (result === undefined) {
      return {
        statusCode: 404,
        success: false,
        message: 'Invalid token'
      }
    }

    return {
      statusCode: 200,
      success: true,
      message: { data: result!.token }
    }
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error
    }
  }
}

// delete token
export const removeToken = async (token: string): Promise<DBresult> => {
  try {
    const result = await Token.findOneAndDelete({ token });

    if (result === null) {
      return {
        statusCode: 404,
        success: false,
        message: 'could not find token with given token value.'
      }
    }
    return {
      statusCode: 200,
      success: true,
      message: { data: result }
    }
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error
    }
  }
}
