import { type NextFunction, type Response } from 'express';

// Response sender function.
export const resSender = (res: Response, next: NextFunction, statusCode: number, success: boolean, message: any): any => {
  if (message instanceof Error) {
    // add logger here.
    next(message); return;
  }

  res.status(statusCode).json({
    success,
    message
  })
}
