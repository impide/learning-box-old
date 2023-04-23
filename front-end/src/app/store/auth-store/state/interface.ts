import { Course } from "../../../interfaces/index";

export interface IUserData {
  message: string;
  result: IUser;
  status: number;
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  pseudo: string;
  avatar: string;
  role: number;
  courses: Course;
  expirationDate: Date;
}
