import { Action } from '@ngrx/store';
import { IUserData } from './interface';

export enum AuthActionsTypes {
  SIGNUP = 'SIGNUP',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  AUTO_LOGIN = 'AUTO_LOGIN'
}

// Signup
export class SignUp implements Action {
  readonly type = AuthActionsTypes.SIGNUP;
  constructor(public payload: any) {}
}

// Signup Success
export class SignUpSuccess implements Action {
  readonly type = AuthActionsTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

// Signup Error
export class SignUpError implements Action {
  readonly type = AuthActionsTypes.SIGNUP_ERROR;
  constructor(public payload: string) {}
}

// Login
export class Login implements Action {
  readonly type = AuthActionsTypes.LOGIN;
  constructor(public payload: any) {}
}

// Login Success
export class LoginSuccess implements Action {
  readonly type = AuthActionsTypes.LOGIN_SUCCESS;
  constructor(public payload: IUserData) {}
}

// Login Error
export class LoginError implements Action {
  readonly type = AuthActionsTypes.LOGIN_ERROR;
  constructor(public payload: string) {}
}

// Auto Login
export class AutoLogin implements Action {
  readonly type = AuthActionsTypes.AUTO_LOGIN;
}

export type AuthActions =
  | SignUp
  | SignUpSuccess
  | SignUpError
  | Login
  | LoginSuccess
  | LoginError
  | AutoLogin;
