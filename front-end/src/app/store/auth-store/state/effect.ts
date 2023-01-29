/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { IUserData } from './interface';
import { RegisterAnimationService } from '../../../utils/animations/index';
import { MaterialService } from '../../../utils/materials/material.service';
import { AuthService } from '../services/auth.service';

import * as fromAuthActions from './action';
import { AuthActions } from './action';
import { SignupModel } from '../../../models/index';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private router: Router,
    private registerAnimation: RegisterAnimationService,
    private actions$: Actions,
    private authService: AuthService,
    private materialService: MaterialService
  ) {}

  SignUp$: Observable<AuthActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.SignUp>(fromAuthActions.AuthActionsTypes.SIGNUP),
      switchMap(action =>
        this.authService.signup(action.payload).pipe(
          map((user: SignupModel) => {
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
    this.actions$.pipe(
      ofType<fromAuthActions.Login>(fromAuthActions.AuthActionsTypes.LOGIN),
      switchMap(action =>
        this.authService.login(action.payload).pipe(
          map((userData: IUserData | any) => {
            this.isLogged(userData);
            return new fromAuthActions.LoginSuccess(userData);
          }),
          catchError((err: string) => {
            this.showError("Error Authentication");
            return of(new fromAuthActions.LoginError(err));
          })
        )
      )
    )
  );

  AutoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.AutoLogin>(fromAuthActions.AuthActionsTypes.AUTO_LOGIN),
      map(() => {
        const userData = JSON.parse(localStorage.getItem('auth'));
        return new fromAuthActions.LoginSuccess(this.handleUserStorage(userData));
      })
    )
  )

  Logout$: Observable<AuthActions> = createEffect(
    () =>
      this.actions$.pipe(
        ofType<fromAuthActions.Logout>(fromAuthActions.AuthActionsTypes.LOGOUT),
        tap(() => {
          return this.handleUserLogout();
        })
      ),
    { dispatch: false }
  );

  isRegistered(): void {
    this.materialService.openSnackBar('User Created Successfully', 3);
    this.registerAnimation.toLoginForm();
  }

  isLogged(userData: IUserData): void {
    this.materialService.openSnackBar('You are now Connected', 3);
    localStorage.setItem('auth', JSON.stringify(this.handleUserStorage(userData)));

    this.materialService.closeDialog();
    this.router.navigate([`/catalog`]);
  }

  handleUserStorage(userData: IUserData) {
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    userData.result.expirationDate = expirationDate;
    return userData;
  }

  handleUserLogout() {
    if (localStorage.getItem('auth')) {
      localStorage.removeItem('auth');
    }

    this.router.navigate([`/`]);
  }

  showError(errorMsg: string): void {
    this.materialService.openSnackBar(errorMsg,5);
  }

}
