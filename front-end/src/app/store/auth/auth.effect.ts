/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { RegisterAnimationService } from 'src/app/layout/material/animation/register-animation';
import { SnackBarService } from 'src/app/layout/material/snackbar/snackbar';
import { User } from 'src/app/model/user/user.model';
import { UserSignup } from 'src/app/model/user/userSignup.model';
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
          map((user: UserSignup) => {
            this.isRegistered();
            return new fromAuthActions.SignUpSuccess(user);
          }),
          catchError((err: string) => {
            this.showError("An Error has occured, please retry later!");
            return of(new fromAuthActions.SignUpError(err));
          })
        )
      )
    )
  );

  Login$: Observable<AuthActions> = createEffect(() =>
  this.actions.pipe(
    ofType<fromAuthActions.Login>(fromAuthActions.AuthActionsTypes.LOGIN),
    switchMap(action =>
      this.authService.login(action.payload).pipe(
        map((user: User | any) => {
          this.isLogged(user);
          return new fromAuthActions.LoginSuccess(user);
        }),
        catchError((err: string) => {
          this.showError("Error Authentication");
          return of(new fromAuthActions.LoginError(err));
        })
      )
    )
  )
);

  isRegistered(): void {
    this.snackbarService.openSnackBar('User Created Successfully', 3);
    this.registerAnimation.toLoginForm();
  }

  isLogged(data: User | any): void {
    this.snackbarService.openSnackBar('You are now Connected', 3);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(data));
    }
    this.authService.isAuth$.next(true);
    this.dialog.closeAll();
    this.router.navigate([`/home`]);
  }

  showError(errorMsg: string): void {
    this.snackbarService.openSnackBar(errorMsg,5);
  }

}
