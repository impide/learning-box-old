import { AuthState } from './auth-store/state/state';
import { CourseState } from './course-store/state/state';

export interface State {
  auth: AuthState;
  course: CourseState
}
