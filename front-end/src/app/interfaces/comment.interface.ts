import { IUser } from "./user.interface";
import { ICourse } from "./course.interface";

export interface IComment {
  user: IUser;
  userId: number;
  comments: string[];
  course: ICourse[];
  courseId: number;
  created_at: Date;
  updated_at: Date;
}
