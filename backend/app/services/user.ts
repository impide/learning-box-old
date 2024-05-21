import { PrismaClient, User } from '@prisma/client';
import { SignupModel } from '../models/user';

const prisma = new PrismaClient({ log: ['query', 'info'] });

export default {
    async findOneByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return result;
    },

    async createOne(user: SignupModel): Promise<User> {
        const result = await prisma.user.create({
            data: {
                pseudo: user.pseudo,
                email: user.email,
                password: user.password,
                avatarUrl: user.avatarUrl,
                role: user.role
            }
        });
        return result;
    }
}