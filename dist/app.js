"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const app = (0, utils_1.createServer)();
app.listen(3000, () => {
    console.log('server listening on port 3000..');
});
