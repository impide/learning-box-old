import { Course, User } from "@prisma/client";

export interface CategoryModel {
    title: string;
    course: (Course & { author: User })[];
}