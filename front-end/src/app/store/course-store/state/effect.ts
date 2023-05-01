/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { ICourseData } from './interface';
import { MaterialService } from '../../../utils/materials/material.service';

import * as fromCourseActions from './action';
import { CourseActions } from './action';
import { CourseService } from '../services/course.service';

@Injectable({ providedIn: 'root' })
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private materialService: MaterialService
  ) { }

  GetCourses$: Observable<CourseActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCourseActions.GetCourses>(fromCourseActions.CourseActionsTypes.GET_COURSES),
      switchMap(() =>
        this.courseService.getAllCourses().pipe(
          map((courseData: ICourseData) => {
            return new fromCourseActions.GetCoursesSuccess(courseData);
          }),
          catchError((err: string) => {
            this.showError("An Error has occured, please retry later!");
            return of(new fromCourseActions.GetCoursesError(err));
          })
        )
      )
    )
  );

  GetCourse$: Observable<CourseActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<fromCourseActions.GetCourse>(fromCourseActions.CourseActionsTypes.GET_COURSE),
      switchMap(action =>
        this.courseService.getOneCourse(action.payload).pipe(
          map((courseData: ICourseData) => {
            return new fromCourseActions.GetCourseSuccess(courseData);
          }),
          catchError((err: string) => {
            this.showError("An Error has occured, please retry later!");
            return of(new fromCourseActions.GetCourseError(err));
          })
        )
      )
    )
  );

  showError(errorMsg: string): void {
    this.materialService.openSnackBar(errorMsg, 5);
  }

}
