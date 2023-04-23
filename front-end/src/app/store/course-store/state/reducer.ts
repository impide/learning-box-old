import { courseAdapter, initialCourseState } from './state';
import { CourseActions, CourseActionsTypes } from './action';

export function courseReducer(
  state = initialCourseState,
  action: CourseActions
) {
  switch (action.type) {
    case CourseActionsTypes.GET_COURSE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CourseActionsTypes.GET_COURSE_SUCCESS:
      return courseAdapter.setOne(action.payload, {
        ...state,
        courses: action.payload.result,
        loading: false,
        error: null,
      });
    case CourseActionsTypes.GET_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
