import { AuthState } from './auth-store/state/state';
import { CourseState } from './course-store/state/state';
import { CategoryState } from './category-store/state/state';

export interface State {
  auth: AuthState;
  course: CourseState;
  category: CategoryState;
}
