import { Action } from '@ngrx/store';
import { ICategoryData } from './interface';

export enum CategoryActionsTypes {
  GET_CATEGORIES_WITH_COURSES = 'GET_CATEGORIES_WITH_COURSES',
  GET_CATEGORIES_WITH_COURSES_SUCCESS = 'GET_CATEGORIES_WITH_COURSES_SUCCESS',
  GET_CATEGORIES_WITH_COURSES_ERROR = 'GET_CATEGORIES_WITH_COURSES_ERROR',
}

// Get Categories
export class GetCategoriesWithCourses implements Action {
  readonly type = CategoryActionsTypes.GET_CATEGORIES_WITH_COURSES;
}

// Get Categories Success
export class GetCategoriesWithCoursesSuccess implements Action {
  readonly type = CategoryActionsTypes.GET_CATEGORIES_WITH_COURSES_SUCCESS;
  constructor(public payload: ICategoryData) { }
}

// Get Categories Error
export class GetCategoriesWithCoursesError implements Action {
  readonly type = CategoryActionsTypes.GET_CATEGORIES_WITH_COURSES_ERROR;
  constructor(public payload: string) { }
}

export type CategoryActions =
  | GetCategoriesWithCourses
  | GetCategoriesWithCoursesSuccess
  | GetCategoriesWithCoursesError
