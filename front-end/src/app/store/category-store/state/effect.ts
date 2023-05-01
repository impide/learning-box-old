/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { ICategoryData } from './interface';
import { MaterialService } from '../../../utils/materials/material.service';

import * as fromCategoryActions from './action';
import { CategoryActions } from './action';
import { CategoryService } from '../services/category.service';

@Injectable({ providedIn: 'root' })
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private materialService: MaterialService
  ) { }

  GetCategoriesWithCourses$: Observable<CategoryActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCategoryActions.GetCategoriesWithCourses>(fromCategoryActions.CategoryActionsTypes.GET_CATEGORIES_WITH_COURSES),
      switchMap(() =>
        this.categoryService.getCategoriesWithCourses().pipe(
          map((categoryData: ICategoryData) => {
            return new fromCategoryActions.GetCategoriesWithCoursesSuccess(categoryData);
          }),
          catchError((err: string) => {
            this.showError("An Error has occured, please retry later!");
            return of(new fromCategoryActions.GetCategoriesWithCoursesError(err));
          })
        )
      )
    )
  );

  showError(errorMsg: string): void {
    this.materialService.openSnackBar(errorMsg, 5);
  }

}
