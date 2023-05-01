import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICategory } from 'src/app/interfaces';
import { CategoryState } from './state';

export const getCategoryState = createFeatureSelector<CategoryState>('category');

// State Definition
export const categoriesWithCourses = (state: CategoryState): ICategory[] => state.categoriesWithCourses;
export const loading = (state: CategoryState): boolean => state.loading;
export const error = (state: CategoryState): string => state.error;

// Selector
export const selectCategoriesWithCourses = createSelector(getCategoryState, categoriesWithCourses);
export const selectLoading = createSelector(getCategoryState, loading);
export const selectError = createSelector(getCategoryState, error);

// Selector with Param
export const selectCurrentCategory = (categoryId: number) => createSelector(getCategoryState, (state: CategoryState): ICategory => {
  return state.categoriesWithCourses[categoryId];
});
