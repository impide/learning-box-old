import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Course } from 'src/app/interfaces';
import { CourseState } from './state';

export const getCourseState = createFeatureSelector<CourseState>('course');

// State Definition
export const categories = (state: CourseState): Set<string> => {
  const courses = state.courses.slice();
  const categoriesTitles = courses.map((course: Course) => course.category_title);
  return new Set([...categoriesTitles]);
};
export const courses = (state: CourseState): Course[] => state.courses;
export const coursesByCategory = (state: CourseState): Array<Course[]> => {
  const coursesDivision: Array<Course[]> = [];

  const courses = state.courses.slice();
  const categoriesTitles = courses.map((course: Course) => course.category_title);
  const uniqueCategories = new Set([...categoriesTitles]);

  uniqueCategories.forEach((categoryTitle) => {
    const filteredCourses = courses.filter((course) => course.category_title === categoryTitle);
    coursesDivision.push(filteredCourses);
  })

  return coursesDivision;
}
export const loading = (state: CourseState): boolean => state.loading;
export const error = (state: CourseState): string => state.error;

// Selector
export const selectCategories = createSelector(getCourseState, categories);
export const selectCourses = createSelector(getCourseState, courses);
export const selectCoursesByCategory = createSelector(getCourseState, coursesByCategory);
export const selectLoading = createSelector(getCourseState, loading);
export const selectError = createSelector(getCourseState, error);

// Selector with Param
export const selectCurrentCourse = (courseId: number) => createSelector(getCourseState, (state: CourseState): Course => {
  return state.courses[courseId]
});
