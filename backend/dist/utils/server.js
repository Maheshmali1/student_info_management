"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const routes_1 = require("../routes");
const _1 = require(".");
const middleware_1 = require("../middleware");
const cors = require("cors");
const swaggerDocs = yamljs_1.default.load('./api.yaml');
// Function to creater server in express.
const createServer = () => {
    const app = (0, express_1.default)();
    (0, _1.DBconnection)();
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    app.use(cors());
    app.use(express_1.default.json());
    app.use('/user', routes_1.userRouter);
    app.use('/student', middleware_1.validateToken, routes_1.studentRouter);
    app.use((err, req, res, next) => {
        return (0, _1.resSender)(res, next, 500, false, err.message);
    });
    return app;
};
exports.createServer = createServer;
