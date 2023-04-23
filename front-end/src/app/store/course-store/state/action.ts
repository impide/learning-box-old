import { Action } from '@ngrx/store';
import { ICourseData } from './interface';

export enum CourseActionsTypes {
  GET_COURSE = 'GET_COURSE',
  GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS',
  GET_COURSE_ERROR = 'GET_COURSE_ERROR',
}

// Get Course
export class GetCourse implements Action {
  readonly type = CourseActionsTypes.GET_COURSE;
}

// Get Course Success
export class GetCourseSuccess implements Action {
  readonly type = CourseActionsTypes.GET_COURSE_SUCCESS;
  constructor(public payload: ICourseData) {}
}

// Get Course Error
export class GetCourseError implements Action {
  readonly type = CourseActionsTypes.GET_COURSE_ERROR;
  constructor(public payload: string) {}
}

export type CourseActions =
  | GetCourse
  | GetCourseSuccess
  | GetCourseError
