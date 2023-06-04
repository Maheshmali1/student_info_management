import { RequestHandler } from "express";
import { add, findById, getAll, update, remove } from "../services";
import { Student,studentValidationSchema, studentUpdateValidationSchema, DBresult, validatorResult, student } from "../models";
import { resSender,validator } from "../utils";
import { v4 as uuidv4 } from 'uuid';
let id = 111907001;


// creating a student
export const createStudent: RequestHandler = async (req, res, next) => {

    const { name,email,phoneNo } = (req.body as {name:string,email:string,phoneNo:string});
    

    const validateResult: validatorResult = validator(req.body,studentValidationSchema);

	if (!validateResult.match) {
        return resSender(res,422,false,{ schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } )
	}

    const uniqueId = id;
    id++;
    const newStudnet:student = {
        studentId:uniqueId,
        name:name,
        email:email,
        phoneNo:phoneNo

    }

    const result: DBresult = await add(newStudnet);

    if (result.success) {
        return resSender(res, 201, true, result.message);
    }

    return resSender(res, 500, false, result.message);


}

// Reading the student with given studentId
export const getStudentbyId: RequestHandler<{ id: number }> = async (req, res, next) => {
    const studentId = req.params.id as number;

    const result:DBresult = await findById(studentId);

    if (result.success) {
        return resSender(res, 200, true, result.message);
    }
    return resSender(res, 500, false, result.message);

}

// Reading all student.
export const getAllStudent: RequestHandler = async(req, res, next) => {
    const result:DBresult =await getAll();
    if(result.success){
        return resSender(res,200,true,result.message);
    }
    return resSender(res,500,false,result.message);
}

//updating a student
export const updateStudent: RequestHandler<{id:number}> =async (req, res, next) => {
    const studentId= req.params.id as number;

    // Schema validation for incoming request
    const validateResult: validatorResult = validator(req.body,studentUpdateValidationSchema);

	if (!validateResult.match) {
        return resSender(res,422,false,{ schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } )
	}

    const updateData = {...req.body};


    const result:DBresult = await update(studentId,updateData);

    if(result.success){
        return resSender(res,200,true,result.message);
    }
    return resSender(res, 500, false, result.message);
    
}

// deleting a student
export const deleteStudent: RequestHandler<{id:number}> =async (req, res, next) => {
    const studentId= req.params.id as number;
    
    const result:DBresult = await remove(studentId);

    if(result.success){
        return resSender(res,200,true,result.message);
    }
    return resSender(res, 500, false, result.message);
}

