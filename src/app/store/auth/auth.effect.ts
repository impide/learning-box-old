/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { RegisterAnimationService } from 'src/app/layout/material/animation/register-animation';
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
  ) {}

  SignUp$: Observable<AuthActions> = createEffect(() =>
    this.actions.pipe(
      ofType<fromAuthActions.SignUp>(fromAuthActions.AuthActionsTypes.SIGNUP),
      switchMap(action =>
        this.authService.signup(action.payload).pipe(
          map((user: User) => {
            this.registerAnimation.toLoginForm();
            return new fromAuthActions.SignUpSuccess(user);
          }),
          catchError((err: string) => {
            return of(new fromAuthActions.SignUpError(err));
          })
        )
      )
    )
  );

}
