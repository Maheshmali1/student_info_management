"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getAll = exports.findById = exports.add = void 0;
const models_1 = require("../models");
// Adding student to database.
const add = async function (studentData) {
    const newStudent = new models_1.Student(studentData);
    try {
        await newStudent.save();
        return {
            success: true,
            message: "student added successfully."
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    }
};
exports.add = add;
// Finding the student with given studentId.
const findById = async (id) => {
    try {
        const foundStudent = await models_1.Student.findOne({ studentId: id });
        if (foundStudent === null) {
            return {
                success: false,
                message: "could not find studnet with given studentId."
            };
        }
        return {
            success: true,
            message: { data: foundStudent }
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    }
};
exports.findById = findById;
// Getting all present students in the system.
const getAll = async () => {
    try {
        const foundStudents = await models_1.Student.find({});
        return {
            success: true,
            message: { data: foundStudents }
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    }
};
exports.getAll = getAll;
// Updating the particular student by studentId
const update = async (id, updateData) => {
    try {
        const updatedData = await models_1.Student.findOneAndUpdate({ studentId: id }, { $set: updateData }, { returnOriginal: false });
        if (updatedData === null) {
            return {
                success: false,
                message: "could not find student with given studentId."
            };
        }
        return {
            success: true,
            message: { data: updatedData }
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    }
};
exports.update = update;
// deleting the particular student given by studentId.
const remove = async (id) => {
    try {
        const result = await models_1.Student.findOneAndDelete({ studentId: id });
        if (result === null) {
            return {
                success: false,
                message: "could not find student with given studentId."
            };
        }
        return {
            success: true,
            message: { data: result }
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    }
};
exports.remove = remove;
