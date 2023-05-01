import { ICourse } from "./course.interface";

export interface ICategory {
  id: number;
  title: string;
  description: string;
  parent?: number;
  course: ICourse[];
  created_at: Date;
  updated_at: Date;
}
