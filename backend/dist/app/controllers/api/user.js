"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roles_js_1 = require("../../enums/roles.js");
const user_1 = __importDefault(require("../../services/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = req.body;
            const user = yield user_1.default.findOneByEmail(email);
            if (user)
                throw new Error('Cette adresse e-mail est déjà associée à un compte');
            if (role !== roles_js_1.Role.USER)
                throw new Error('Non autorisé(e)');
            const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = Object.assign(Object.assign({}, req.body), { password: encryptedPassword });
            const createdUser = yield user_1.default.createOne(newUser);
            return res.status(200).json({
                status: 200,
                result: createdUser,
            });
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield user_1.default.findOneByEmail(email);
            if (user === null)
                throw new Error('Cet utilisateur n\'existe pas');
            const encryptedPassword = yield bcrypt_1.default.hash(user.password, 10);
            const comparePassword = yield bcrypt_1.default.compare(password, encryptedPassword);
            if (!comparePassword)
                throw new Error('Non autorisé(e)');
            delete user.password;
            const { SECRET } = process.env;
            return res.status(200).json({
                status: 200,
                message: 'Utilisateur connecté avec succès !',
                result: user,
                token: jsonwebtoken_1.default.sign({ userId: user.id }, SECRET, { expiresIn: '1h' }),
            });
        });
    }
};
//# sourceMappingURL=user.js.map