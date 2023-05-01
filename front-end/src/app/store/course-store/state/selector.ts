import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICourse } from 'src/app/interfaces';
import { CourseState } from './state';

export const getCourseState = createFeatureSelector<CourseState>('course');

// State Definition
export const courses = (state: CourseState): ICourse[] => state.courses;
export const course = (state: CourseState): ICourse => state.course;
export const loading = (state: CourseState): boolean => state.loading;
export const error = (state: CourseState): string => state.error;

// Selector
export const selectCourses = createSelector(getCourseState, courses);
export const selectCourse = createSelector(getCourseState, course);
export const selectLoading = createSelector(getCourseState, loading);
export const selectError = createSelector(getCourseState, error);
