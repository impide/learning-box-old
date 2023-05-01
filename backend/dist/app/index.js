"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const allowedOrigins = ['http://localhost:2000'];
const options = { origin: allowedOrigins };
app.use((0, cors_1.default)(options));
app.use('/images', express_1.default.static(path_1.default.join('../public/images')));
app.use('/files', express_1.default.static(path_1.default.join('../public/files')));
app.use(index_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map