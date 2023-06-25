"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, utils_1.createServer)();
const PORT = (process.env.PORT != null) ? process.env.PORT : 3000;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}..`);
});
