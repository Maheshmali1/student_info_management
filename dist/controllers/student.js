"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudentInfo = exports.getAllStudent = exports.getStudentbyId = exports.createStudent = void 0;
const services_1 = require("../services");
const models_1 = require("../models");
const utils_1 = require("../utils");
let id = 111907001;
// creating a student
const createStudent = async (req, res, next) => {
    var _a, _b;
    const { name, email, phoneNo } = req.body;
    const validateResult = (0, utils_1.validator)(req.body, models_1.studentValidationSchema);
    if (!validateResult.match) {
        (0, utils_1.resSender)(res, next, 422, false, { schemaPath: (_a = validateResult.errors) === null || _a === void 0 ? void 0 : _a[0].schemaPath, message: (_b = validateResult.errors) === null || _b === void 0 ? void 0 : _b[0].message });
        return;
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
        (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
        return;
    }
    (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.createStudent = createStudent;
// Reading the student with given studentId
const getStudentbyId = async (req, res, next) => {
    const studentId = parseInt(req.params.id);
    const result = await (0, services_1.findByIdStudent)(studentId);
    if (result.success) {
        (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
        return;
    }
    (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.getStudentbyId = getStudentbyId;
// Reading all student.
const getAllStudent = async (req, res, next) => {
    const result = await (0, services_1.findAllStudent)();
    if (result.success) {
        (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
        return;
    }
    (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.getAllStudent = getAllStudent;
// updating a student
const updateStudentInfo = async (req, res, next) => {
    var _a, _b;
    const studentId = parseInt(req.params.id);
    // Schema validation for incoming request
    const validateResult = (0, utils_1.validator)(req.body, models_1.studentUpdateValidationSchema);
    if (!validateResult.match) {
        (0, utils_1.resSender)(res, next, 422, false, { schemaPath: (_a = validateResult.errors) === null || _a === void 0 ? void 0 : _a[0].schemaPath, message: (_b = validateResult.errors) === null || _b === void 0 ? void 0 : _b[0].message });
        return;
    }
    const updateData = { ...req.body };
    const result = await (0, services_1.updateStudent)(studentId, updateData);
    if (result.success) {
        (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
        return;
    }
    (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.updateStudentInfo = updateStudentInfo;
// deleting a student
const deleteStudent = async (req, res, next) => {
    const studentId = parseInt(req.params.id);
    const result = await (0, services_1.removeStudent)(studentId);
    if (result.success) {
        (0, utils_1.resSender)(res, next, result.statusCode, true, result.message);
        return;
    }
    (0, utils_1.resSender)(res, next, result.statusCode, false, result.message);
};
exports.deleteStudent = deleteStudent;
