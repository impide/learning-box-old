import { IUser } from "./user.interface";
import { IComment } from "./comment.interface";
import { Lang } from "../enums/langs";
import { ICategory } from "./category.interface";

export interface ICourse {
  id: number;
  label: string;
  course_description: string;
  poster: string;
  author: IUser;
  authorId: number;
  language: Lang;
  note: number[];
  comment: IComment[];
  price: number;
  video: string;
  PDF: string;
  category: ICategory;
  categoryId: number;
  created_at: Date;
  updated_at: Date;
}
