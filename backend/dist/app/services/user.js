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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: ['query', 'info'] });
exports.default = {
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            return result;
        });
    },
    createOne(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.user.create({
                data: {
                    pseudo: user.pseudo,
                    email: user.email,
                    password: user.password,
                    avatarUrl: user.avatarUrl,
                    role: user.role
                }
            });
            return result;
        });
    }
};
//# sourceMappingURL=user.js.map