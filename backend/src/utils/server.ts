import express, { type Request, type Response, type NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';
import { studentRouter, userRouter } from '../routes';
import { DBconnection, resSender } from '.';
import { validateToken } from '../middleware';
import cors = require("cors");


const swaggerDocs = yaml.load('./api.yaml');

// Function to creater server in express.
export const createServer = () => {
  const app = express();

  DBconnection();
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  app.use(cors<Request>());
  app.use(express.json());

  app.use('/user', userRouter);
  app.use('/student', validateToken, studentRouter);
  app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
    return resSender(res, next, 500, false, err.message);
  });
  
  return app;
};
