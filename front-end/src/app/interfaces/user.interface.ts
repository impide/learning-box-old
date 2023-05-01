import { Role } from "../enums/roles";
import { IComment } from "./comment.interface";
import { ICourse } from "./course.interface";

export interface IUser {
  id: number;
  email: string;
  pseudo: string;
  avatarUrl: string;
  role: Role;
  courses: ICourse;
  created_at: Date;
  updated_at: Date;
  expiration_at?: Date;
  Comment?: IComment;
}
