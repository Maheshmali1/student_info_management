"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudentInfo = exports.getAllStudent = exports.getStudentbyId = exports.createStudent = void 0;
const services_1 = require("../services");
const models_1 = require("../models");
const utils_1 = require("../utils");
let id = 111907001;
// creating a student
const createStudent = async (req, res, next) => {
    const { name, email, phoneNo } = req.body;
    const validateResult = (0, utils_1.validator)(req.body, models_1.studentValidationSchema);
    if (!validateResult.match) {
        return (0, utils_1.resSender)(res, next, 422, false, { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message });
    }
    const uniqueId = id;
    id++;
    const newStudnet = {
        studentId: uniqueId,
        name: name,
        email: email,
        phoneNo: phoneNo
    };
    const result = await (0, services_1.saveStudent)(newStudnet);
    if (result.success) {
        return (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
    }
    return (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.createStudent = createStudent;
// Reading the student with given studentId
const getStudentbyId = async (req, res, next) => {
    const studentId = req.params.id;
    const result = await (0, services_1.findByIdStudent)(studentId);
    if (result.success) {
        return (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
    }
    return (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.getStudentbyId = getStudentbyId;
// Reading all student.
const getAllStudent = async (req, res, next) => {
    const result = await (0, services_1.findAllStudent)();
    if (result.success) {
        return (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
    }
    return (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.getAllStudent = getAllStudent;
//updating a student
const updateStudentInfo = async (req, res, next) => {
    const studentId = req.params.id;
    // Schema validation for incoming request
    const validateResult = (0, utils_1.validator)(req.body, models_1.studentUpdateValidationSchema);
    if (!validateResult.match) {
        return (0, utils_1.resSender)(res, next, 422, false, { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message });
    }
    const updateData = { ...req.body };
    const result = await (0, services_1.updateStudent)(studentId, updateData);
    if (result.success) {
        return (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
    }
    return (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.updateStudentInfo = updateStudentInfo;
// deleting a student
const deleteStudent = async (req, res, next) => {
    const studentId = req.params.id;
    const result = await (0, services_1.removeStudent)(studentId);
    if (result.success) {
        return (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
    }
    return (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.deleteStudent = deleteStudent;
