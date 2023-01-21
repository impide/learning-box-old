import { Course } from "../course/course.model";

export class User {
  id: number;
  email: string;
  pseudo: string;
  avatar: string;
  role: number;
  courses: Course;
}
