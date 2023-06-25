"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnection = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const DBPath = config_1.default.get('DB_PATH');
const DBconnection = async () => {
    try {
        await mongoose_1.default.connect(DBPath);
        console.log('connected to database.');
    }
    catch (error) {
        console.log(error, 'could not connect database.');
    }
};
exports.DBconnection = DBconnection;
