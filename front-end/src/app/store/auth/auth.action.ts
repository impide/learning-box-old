import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user/user.model';

export enum AuthActionsTypes {
  SIGNUP = 'SIGNUP',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_ERROR = 'SIGNUP_ERROR'
}

// Signup
export class SignUp implements Action {
  readonly type = AuthActionsTypes.SIGNUP;
  constructor(public payload: User) {}
}

// Signup Success
export class SignUpSuccess implements Action {
  readonly type = AuthActionsTypes.SIGNUP_SUCCESS;
  constructor(public payload: User) {}
}

// Signup Error
export class SignUpError implements Action {
  readonly type = AuthActionsTypes.SIGNUP_ERROR;
  constructor(public payload: string) {}
}

export type AuthActions =
  | SignUp
  | SignUpSuccess
  | SignUpError;
