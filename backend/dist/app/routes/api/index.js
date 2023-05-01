"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const course_1 = __importDefault(require("./course"));
const category_1 = __importDefault(require("./category"));
const errorHandler_1 = __importDefault(require("../../helpers/errorHandler"));
const router = express_1.default.Router();
router.use('/users', user_1.default);
router.use('/courses', course_1.default);
router.use('/categories', category_1.default);
router.use((0, errorHandler_1.default)('json'));
exports.default = router;
//# sourceMappingURL=index.js.map