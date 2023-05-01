import { Course, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info'] });

export default {
    async findAll(): Promise<Course[]> {
        const result: Course[] = await prisma.course.findMany({
            include: {
                author: true,
                category: true
            }
        });
        return result;
    },

    async findOneById(courseId: number): Promise<Course> {
        const result: Course = await prisma.course.findUniqueOrThrow({
            where: {
                id: courseId
            }
        });
        return result;
    }
} 