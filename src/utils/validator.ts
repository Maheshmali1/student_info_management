import { validatorResult } from '../models';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();
addFormats(ajv);


// Function to validate the employee against schema.
export const validator = (data:any,schema:any):validatorResult=>{
    const validate = ajv.compile(schema);
    const match = validate(data);
	const errors = (!match)? validate.errors : [];
	return {
		match,
		errors
	};
};
