import { RequestHandler } from "express";
import { saveStudent, findByIdStudent, findAllStudent, updateStudent, removeStudent } from "../services";
import { studentValidationSchema, studentUpdateValidationSchema, DBresult, validatorResult, student } from "../models";
import { resSender,validator } from "../utils";
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

    const result: DBresult = await saveStudent(newStudnet);

    if (result.success) {
        return resSender(res, result.statusCode, true, result.message);
    }

    return resSender(res, result.statusCode, false, result.message);


}

// Reading the student with given studentId
export const getStudentbyId: RequestHandler<{ id: number }> = async (req, res, next) => {
    const studentId = req.params.id as number;

    const result:DBresult = await findByIdStudent(studentId);

    if (result.success) {
        return resSender(res, result.statusCode, true, result.message);
    }
    return resSender(res, result.statusCode, false, result.message);

}

// Reading all student.
export const getAllStudent: RequestHandler = async(req, res, next) => {
    const result:DBresult =await findAllStudent();
    if(result.success){
        return resSender(res,result.statusCode,true,result.message);
    }
    return resSender(res,result.statusCode,false,result.message);
}

//updating a student
export const updateStudentInfo: RequestHandler<{id:number}> =async (req, res, next) => {
    const studentId= req.params.id as number;

    // Schema validation for incoming request
    const validateResult: validatorResult = validator(req.body,studentUpdateValidationSchema);

	if (!validateResult.match) {
        return resSender(res,422,false,{ schemaPath: validateResult.errors![0].schemaPath, message: validateResult.errors![0].message } )
	}

    const updateData = {...req.body};


    const result:DBresult = await updateStudent(studentId,updateData);

    if(result.success){
        return resSender(res,result.statusCode,true,result.message);
    }
    return resSender(res, result.statusCode, false, result.message);
    
}

// deleting a student
export const deleteStudent: RequestHandler<{id:number}> =async (req, res, next) => {
    const studentId= req.params.id as number;
    
    const result:DBresult = await removeStudent(studentId);

    if(result.success){
        return resSender(res,result.statusCode,true,result.message);
    }
    return resSender(res, result.statusCode, false, result.message);
}

