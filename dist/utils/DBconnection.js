"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnection = void 0;
const mongoose = require("mongoose");
const config_1 = __importDefault(require("config"));
const DBPath = config_1.default.get('DB_PATH');
const DBconnection = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true
        };
        await mongoose.connect(DBPath, connectionParams);
        console.log("connected to database.");
    }
    catch (error) {
        console.log(error, "could not connect database.");
    }
};
exports.DBconnection = DBconnection;
// mongoose.connect("mongodb://localhost:27017/storeDB");
