"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./app/helpers/loadEnv.js");
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
const index_1 = __importDefault(require("./app/index"));
const debugServer = (0, debug_1.default)('server');
process.on('unhandledRejection', (err) => {
    throw err;
});
process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
});
const port = process.env.PORT || 8080;
const server = http_1.default.createServer(index_1.default);
server.listen(port, () => {
    debugServer(`Launched at http://localhost:${port} (${process.env.NODE_ENV})`);
});
//# sourceMappingURL=index.js.map