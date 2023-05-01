"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../controllers/api/index");
const controllerWrapper_1 = __importDefault(require("../../helpers/controllerWrapper"));
const router = express_1.default.Router();
router.get('/', (0, controllerWrapper_1.default)(index_1.courseController.getAll));
router.get('/:courseId', (0, controllerWrapper_1.default)(index_1.courseController.getOne));
exports.default = router;
//# sourceMappingURL=course.js.map