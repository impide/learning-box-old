import { Action } from '@ngrx/store';
import { ICourseData } from './interface';

export enum CourseActionsTypes {
  GET_COURSES = 'GET_COURSES',
  GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS',
  GET_COURSES_ERROR = 'GET_COURSES_ERROR',

  GET_COURSE = 'GET_COURSE',
  GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS',
  GET_COURSE_ERROR = 'GET_COURSE_ERROR'
}

// Get Courses
export class GetCourses implements Action {
  readonly type = CourseActionsTypes.GET_COURSES;
}

// Get Courses Success
export class GetCoursesSuccess implements Action {
  readonly type = CourseActionsTypes.GET_COURSES_SUCCESS;
  constructor(public payload: ICourseData) { }
}

// Get Courses Error
export class GetCoursesError implements Action {
  readonly type = CourseActionsTypes.GET_COURSES_ERROR;
  constructor(public payload: string) { }
}

// Get Course
export class GetCourse implements Action {
  readonly type = CourseActionsTypes.GET_COURSE;
  constructor(public payload: number) { }
}

// Get Course Success
export class GetCourseSuccess implements Action {
  readonly type = CourseActionsTypes.GET_COURSE_SUCCESS;
  constructor(public payload: ICourseData) { }
}

// Get Course Error
export class GetCourseError implements Action {
  readonly type = CourseActionsTypes.GET_COURSE_ERROR;
  constructor(public payload: string) { }
}

export type CourseActions =
  | GetCourses
  | GetCoursesSuccess
  | GetCoursesError
  | GetCourse
  | GetCourseSuccess
  | GetCourseError
