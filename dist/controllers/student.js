"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getAllStudent = exports.getStudentbyId = exports.createStudent = void 0;
const services_1 = require("../services");
const models_1 = require("../models");
const utils_1 = require("../utils");
let id = 111907001;
// creating a student
const createStudent = async (req, res, next) => {
    const { name, email, phoneNo } = req.body;
    const validateResult = (0, utils_1.validator)(req.body, models_1.studentValidationSchema);
    if (!validateResult.match) {
        return (0, utils_1.resSender)(res, 422, false, { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message });
    }
    const uniqueId = id;
    id++;
    const newStudnet = {
        studentId: uniqueId,
        name: name,
        email: email,
        phoneNo: phoneNo
    };
    const result = await (0, services_1.add)(newStudnet);
    if (result.success) {
        return (0, utils_1.resSender)(res, 201, true, result.message);
    }
    return (0, utils_1.resSender)(res, 500, false, result.message);
};
exports.createStudent = createStudent;
// Reading the student with given studentId
const getStudentbyId = async (req, res, next) => {
    const studentId = req.params.id;
    const result = await (0, services_1.findById)(studentId);
    if (result.success) {
        return (0, utils_1.resSender)(res, 200, true, result.message);
    }
    return (0, utils_1.resSender)(res, 500, false, result.message);
};
exports.getStudentbyId = getStudentbyId;
// Reading all student.
const getAllStudent = async (req, res, next) => {
    const result = await (0, services_1.getAll)();
    if (result.success) {
        return (0, utils_1.resSender)(res, 200, true, result.message);
    }
    return (0, utils_1.resSender)(res, 500, false, result.message);
};
exports.getAllStudent = getAllStudent;
//updating a student
const updateStudent = async (req, res, next) => {
    const studentId = req.params.id;
    // Schema validation for incoming request
    const validateResult = (0, utils_1.validator)(req.body, models_1.studentUpdateValidationSchema);
    if (!validateResult.match) {
        return (0, utils_1.resSender)(res, 422, false, { schemaPath: validateResult.errors[0].schemaPath, message: validateResult.errors[0].message });
    }
    const updateData = { ...req.body };
    const result = await (0, services_1.update)(studentId, updateData);
    if (result.success) {
        return (0, utils_1.resSender)(res, 200, true, result.message);
    }
    return (0, utils_1.resSender)(res, 500, false, result.message);
};
exports.updateStudent = updateStudent;
// deleting a student
const deleteStudent = async (req, res, next) => {
    const studentId = req.params.id;
    const result = await (0, services_1.remove)(studentId);
    if (result.success) {
        return (0, utils_1.resSender)(res, 200, true, result.message);
    }
    return (0, utils_1.resSender)(res, 500, false, result.message);
};
exports.deleteStudent = deleteStudent;
