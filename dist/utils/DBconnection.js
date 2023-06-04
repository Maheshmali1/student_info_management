"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnection = void 0;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DBconnection = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true
        };
        await mongoose.connect(process.env.DB_STRING, connectionParams);
        console.log("connected to database.");
    }
    catch (error) {
        console.log(error, "could not connect database.");
    }
};
exports.DBconnection = DBconnection;
// mongoose.connect("mongodb://localhost:27017/storeDB");
