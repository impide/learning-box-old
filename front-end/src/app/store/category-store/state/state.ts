import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ICategory } from '../../../interfaces';
import { ICategoryData } from './interface';

export interface CategoryState extends EntityState<ICategoryData> {
  categoriesWithCourses: ICategory[];
  loading: boolean;
  error: string | null;
}

export const categoryAdapter: EntityAdapter<ICategoryData> = createEntityAdapter<ICategoryData>({
  selectId: (iCategoryData: ICategoryData) => iCategoryData.result.id
});

const defaultCategory = {
  categoriesWithCourses: [],
  loading: false,
  error: null,
};

export const initialCategoryState: CategoryState = categoryAdapter.getInitialState(defaultCategory);
