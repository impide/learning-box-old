import { PrismaClient } from '@prisma/client';
import { CategoryModel } from '../models/category';

const prisma = new PrismaClient({ log: ['query', 'info'] });

export default {
    async findAll() {
        const result: CategoryModel[] = await prisma.category.findMany({
            select: {
                title: true,
                course: {
                    include: {
                        author: true
                    }
                }
            },
            where: {
                course: {
                    some: {
                        categoryId: {
                            gte: 0
                        }
                    }
                }
            },
        });
        return result;
    }
} 