import { authAdapter, initialAuthState } from './state';
import { AuthActions, AuthActionsTypes } from './action';

export function authReducer(
  state = initialAuthState,
  action: AuthActions
) {
  switch (action.type) {
    case AuthActionsTypes.SIGNUP:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionsTypes.SIGNUP_SUCCESS:
      return authAdapter.addOne(action.payload, {
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
    case AuthActionsTypes.LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionsTypes.LOGIN_SUCCESS:
      return authAdapter.addOne(action.payload, {
        ...state,
        currentUser: action.payload.result,
        isAuth: true,
        loading: false,
        error: null,
      });
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
