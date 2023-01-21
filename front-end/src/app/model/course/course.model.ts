export class Course {
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

export class Note {
  note: number;
  userId: number;
}

export class Comment {
  userId: number;
  comment: string;
}
