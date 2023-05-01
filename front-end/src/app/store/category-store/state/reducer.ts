import { categoryAdapter, initialCategoryState } from './state';
import { CategoryActions, CategoryActionsTypes } from './action';

export function categoryReducer(
  state = initialCategoryState,
  action: CategoryActions
) {
  switch (action.type) {
    case CategoryActionsTypes.GET_CATEGORIES_WITH_COURSES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CategoryActionsTypes.GET_CATEGORIES_WITH_COURSES_SUCCESS:
      return categoryAdapter.setOne(action.payload, {
        ...state,
        categoriesWithCourses: action.payload.result,
        loading: false,
        error: null,
      });
    case CategoryActionsTypes.GET_CATEGORIES_WITH_COURSES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
