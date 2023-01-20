/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { RegisterAnimationService } from 'src/app/layout/material/animation/register-animation';
import { SnackBarService } from 'src/app/layout/material/snackbar/snackbar';
import { User } from 'src/app/model/user/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';

import * as fromAuthActions from './auth.action';
import { AuthActions } from './auth.action';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public registerAnimation: RegisterAnimationService,
    private actions: Actions,
    private authService: AuthService,
    private snackbarService: SnackBarService
  ) {}

  SignUp$: Observable<AuthActions> = createEffect(() =>
    this.actions.pipe(
      ofType<fromAuthActions.SignUp>(fromAuthActions.AuthActionsTypes.SIGNUP),
      switchMap(action =>
        this.authService.signup(action.payload).pipe(
          map((user: User) => {
            this.snackbarService.openSnackBar('User Created Successfully', 3);
            this.registerAnimation.toLoginForm();
            return new fromAuthActions.SignUpSuccess(user);
          }),
          catchError((err: string) => {
            this.snackbarService.openSnackBar('Authentication Error: Please retry again later!',5);
            return of(new fromAuthActions.SignUpError(err));
          })
        )
      )
    )
  );

}
