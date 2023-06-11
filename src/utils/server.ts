import express,{Request,Response,NextFunction} from 'express';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';
import { studentRouter,userRouter } from '../routes';
import { DBconnection,resSender } from '.';
import { validateToken } from '../middleware';



const swaggerDocs = yaml.load('./api.yaml');

// Function to creater server in express.
export const createServer= ()=>{
	const app = express();

	DBconnection();
	app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
	app.use(express.json());

	
	app.use('/user',userRouter);
	app.use('/student',validateToken,studentRouter);
	// app.use((err:Error,req:Request,res:Response)=>{
	// 	resSender(res,500,false,err.message);
	// });
	
	return app;
};



