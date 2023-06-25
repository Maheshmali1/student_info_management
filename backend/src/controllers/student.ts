import { type Request, type Response, type NextFunction } from 'express';
import { saveStudent, findByIdStudent, findAllStudent, updateStudent, removeStudent } from '../services';
import { studentValidationSchema, studentUpdateValidationSchema, type DBresult, type validatorResult, type student } from '../models';
import { resSender, validator } from '../utils';
let id = 111907001;

// creating a student
export const createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, phoneNo } = (req.body as { name: string, email: string, phoneNo: string });

  const validateResult: validatorResult = validator(req.body, studentValidationSchema);

  if (!validateResult.match) {
    resSender(res, next, 422, false, { schemaPath: validateResult.errors?.[0].schemaPath, message: validateResult.errors?.[0].message });
    return;
  }

  const uniqueId = id;
  id++;
  const newStudnet: student = {
    studentId: uniqueId,
    name: name,
    email: email,
    phoneNo: phoneNo

  }

  const result: DBresult = await saveStudent(newStudnet);

  if (result.success) {
    resSender(res, next, result.statusCode, true, result.message);
    return;
  }

  resSender(res, next, result.statusCode, false, result.message);
}

// Reading the student with given studentId
export const getStudentbyId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const studentId = parseInt(req.params.id);

  const result: DBresult = await findByIdStudent(studentId);

  if (result.success) {
    resSender(res, next, result.statusCode, true, result.message);
    return;
  }
  resSender(res, next, result.statusCode, false, result.message);
}

// Reading all student.
export const getAllStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result: DBresult = await findAllStudent();
  if (result.success) {
    resSender(res, next, result.statusCode, true, result.message);
    return;
  }
  resSender(res, next, result.statusCode, false, result.message);
}

// updating a student
export const updateStudentInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const studentId = parseInt(req.params.id);

  // Schema validation for incoming request
  const validateResult: validatorResult = validator(req.body, studentUpdateValidationSchema);

  if (!validateResult.match) {
    resSender(res, next, 422, false, { schemaPath: validateResult.errors?.[0].schemaPath, message: validateResult.errors?.[0].message })
    return;
  }

  const updateData = { ...req.body };

  const result: DBresult = await updateStudent(studentId, updateData);

  if (result.success) {
    resSender(res, next, result.statusCode, true, result.message);
    return;
  }
  resSender(res, next, result.statusCode, false, result.message);
}

// deleting a student
export const deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const studentId = parseInt(req.params.id);

  const result: DBresult = await removeStudent(studentId);

  if (result.success) {
    resSender(res, next, result.statusCode, true, result.message);
    return;
  }
  resSender(res, next, result.statusCode, false, result.message);
}
