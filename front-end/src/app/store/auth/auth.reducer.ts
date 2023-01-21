import { authAdapter, AuthState, initialAuthState, initialLoginState, initialSignupState, loginAdapter, LoginState, signupAdapter, SignupState } from './auth.state';
import { AuthActions, AuthActionsTypes } from './auth.action';

export function signupReducer(
  state = initialSignupState,
  action: AuthActions
): SignupState {
  switch (action.type) {
    case AuthActionsTypes.SIGNUP:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionsTypes.SIGNUP_SUCCESS:
      return signupAdapter.addOne(action.payload, {
        ...state,
        loading: false,
        error: null,
      });
    case AuthActionsTypes.SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function loginReducer(
  state = initialLoginState,
  action: AuthActions
): LoginState {
  switch (action.type) {
    case AuthActionsTypes.LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionsTypes.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function authReducer(
  state = initialAuthState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionsTypes.LOGIN_SUCCESS:
      return authAdapter.addOne(action.payload, {
        ...state,
        currentUser: action.payload.result,
        loading: false,
        error: null,
      });
    default:
      return state;
  }
}
