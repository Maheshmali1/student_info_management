import { type Request, type Response, type NextFunction } from 'express';
import { resSender } from '../utils';
import jwt from 'jsonwebtoken';
import { findbyToken } from '../services';

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    resSender(res, next, 400, false, 'Token not present');
    return;
  }
  const token = authHeader.split(' ')[1];
  if (token === null) {
    resSender(res, next, 400, false, 'Token not present'); return;
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, async (err, user) => {
    const result = await findbyToken(token);

    if (!result.success || (err != null)) {
      resSender(res, next, 403, false, 'Token invalid'); return;
    }
    next();
  })
}
