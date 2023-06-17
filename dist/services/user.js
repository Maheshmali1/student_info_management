"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByNameUser = exports.saveUser = void 0;
const models_1 = require("../models");
const saveUser = async (userData) => {
    const newUser = new models_1.User(userData);
    try {
        await newUser.save();
        return {
            statusCode: 201,
            success: true,
            message: 'User added successfully.'
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
exports.saveUser = saveUser;
const findByNameUser = async (username) => {
    try {
        const foundUser = await models_1.User.findOne({ username });
        if (foundUser === null) {
            return {
                statusCode: 404,
                success: false,
                message: 'could not find User with given username.'
            };
        }
        return {
            statusCode: 200,
            success: true,
            message: { data: foundUser }
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
exports.findByNameUser = findByNameUser;
