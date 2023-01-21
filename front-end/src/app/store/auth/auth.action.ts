import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user/user.model';
import { UserLogin } from 'src/app/model/user/userLogin.model';
import { UserSignup } from 'src/app/model/user/userSignup.model';

export enum AuthActionsTypes {
  SIGNUP = 'SIGNUP',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR'
}

// Signup
export class SignUp implements Action {
  readonly type = AuthActionsTypes.SIGNUP;
  constructor(public payload: UserSignup) {}
}

// Signup Success
export class SignUpSuccess implements Action {
  readonly type = AuthActionsTypes.SIGNUP_SUCCESS;
  constructor(public payload: UserSignup) {}
}

// Signup Error
export class SignUpError implements Action {
  readonly type = AuthActionsTypes.SIGNUP_ERROR;
  constructor(public payload: string) {}
}

// Login
export class Login implements Action {
  readonly type = AuthActionsTypes.LOGIN;
  constructor(public payload: UserLogin) {}
}

// Login Sucess
export class LoginSuccess implements Action {
  readonly type = AuthActionsTypes.LOGIN_SUCCESS;
  constructor(public payload: User | any) {}
}

// Login Error
export class LoginError implements Action {
  readonly type = AuthActionsTypes.LOGIN_ERROR;
  constructor(public payload: string) {}
}

export type AuthActions =
  | SignUp
  | SignUpSuccess
  | SignUpError
  | Login
  | LoginSuccess
  | LoginError;
