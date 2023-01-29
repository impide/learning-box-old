export interface Course {
  id: number;
  label: string;
  course_description: string;
  author: string;
  language: string;
  note: Note[];
  price: number;
  comment: Comment[];
  video: string;
  PDF: string;
  category_title: string;
  category_description: string;
}

export interface Note {
  note: number;
  userId: number;
}

export interface Comment {
  userId: number;
  comment: string;
}
