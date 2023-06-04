"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
// Function to validate the employee against schema.
const validator = (data, schema) => {
    const validate = ajv.compile(schema);
    const match = validate(data);
    const errors = (!match) ? validate.errors : [];
    return {
        match,
        errors
    };
};
exports.validator = validator;
