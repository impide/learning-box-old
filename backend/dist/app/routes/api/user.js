"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../controllers/api/index");
const controllerWrapper_1 = __importDefault(require("../../helpers/controllerWrapper"));
const router = express_1.default.Router();
router.post('/signup', (0, controllerWrapper_1.default)(index_1.userController.signup));
router.post('/login', (0, controllerWrapper_1.default)(index_1.userController.login));
exports.default = router;
//# sourceMappingURL=user.js.map