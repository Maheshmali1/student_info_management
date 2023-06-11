"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStudent = exports.updateStudent = exports.findAllStudent = exports.findByIdStudent = exports.saveStudent = void 0;
const models_1 = require("../models");
// Adding student to database.
const saveStudent = async function (studentData) {
    const newStudent = new models_1.Student(studentData);
    try {
        await newStudent.save();
        return {
            statusCode: 201,
            success: true,
            message: "student added successfully."
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error
        };
    }
};
exports.saveStudent = saveStudent;
// Finding the student with given studentId.
const findByIdStudent = async (id) => {
    try {
        const foundStudent = await models_1.Student.findOne({ studentId: id });
        if (foundStudent === null) {
            return {
                statusCode: 404,
                success: false,
                message: "could not find studnet with given studentId."
            };
        }
        return {
            statusCode: 200,
            success: true,
            message: { data: foundStudent }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error
        };
    }
};
exports.findByIdStudent = findByIdStudent;
// Getting all present students in the system.
const findAllStudent = async () => {
    try {
        const foundStudents = await models_1.Student.find({});
        return {
            statusCode: 200,
            success: true,
            message: { data: foundStudents }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error
        };
    }
};
exports.findAllStudent = findAllStudent;
// Updating the particular student by studentId
const updateStudent = async (id, updateData) => {
    try {
        const updatedData = await models_1.Student.findOneAndUpdate({ studentId: id }, { $set: updateData }, { returnOriginal: false });
        if (updatedData === null) {
            return {
                statusCode: 404,
                success: false,
                message: "could not find student with given studentId."
            };
        }
        return {
            statusCode: 204,
            success: true,
            message: { data: updatedData }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error
        };
    }
};
exports.updateStudent = updateStudent;
// deleting the particular student given by studentId.
const removeStudent = async (id) => {
    try {
        const result = await models_1.Student.findOneAndDelete({ studentId: id });
        if (result === null) {
            return {
                statusCode: 404,
                success: false,
                message: "could not find student with given studentId."
            };
        }
        return {
            statusCode: 204,
            success: true,
            message: { data: result }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error
        };
    }
};
exports.removeStudent = removeStudent;
