/* eslint-disable no-undef */
import { AuthState, authAdapter, initialState } from './auth.state';
import { AuthActions, AuthActionsTypes } from './auth.action';

export function authReducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionsTypes.SIGNUP:
      console.log("SIGNUP :", action.payload);
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
    default:
      return state;
  }
}
