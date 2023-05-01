import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ICourse } from '../../../interfaces';
import { ICourseData } from './interface';

export interface CourseState extends EntityState<ICourseData> {
  courses: ICourse[];
  course: ICourse;
  loading: boolean;
  error: string | null;
}

export const courseAdapter: EntityAdapter<ICourseData> = createEntityAdapter<ICourseData>({
  selectId: (iCourseData: ICourseData) => iCourseData.result.id
});

const defaultCourse = {
  courses: [],
  course: null,
  loading: false,
  error: null,
};

export const initialCourseState: CourseState = courseAdapter.getInitialState(defaultCourse);
