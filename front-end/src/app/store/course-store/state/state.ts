import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Course } from '../../../interfaces';
import { ICourseData } from './interface';

export interface CourseState extends EntityState<ICourseData> {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const courseAdapter: EntityAdapter<ICourseData> = createEntityAdapter<ICourseData>({
  selectId: (iCourseData: ICourseData) => iCourseData.result.id
});

const defaultCourse = {
  courses: [],
  loading: false,
  error: null,
};

export const initialCourseState: CourseState = courseAdapter.getInitialState(defaultCourse);
