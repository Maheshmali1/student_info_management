import express,{Request,Response,NextFunction} from 'express';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';
import { studentRouter } from '../routes';
import { DBconnection } from '.';


const swaggerDocs = yaml.load('./api.yaml');

// Function to creater server in express.
export const createServer= ()=>{
	const app = express();

	DBconnection();
	app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
	app.use(express.json());

	
	
	app.use('/student',studentRouter);
	app.use((err:Error,req:Request,res:Response)=>{
		res.status(500).send({success:false,message:err.message});
	});
	
	return app;
};



