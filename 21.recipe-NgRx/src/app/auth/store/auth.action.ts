import { createAction, props } from '@ngrx/store';

export enum ActionType {
  LOGIN_START = '[Auth] Login Start',
  AUTHETICATE_SUCCESS = '[Auth] Login',
  AUTHETICATE_FAIL = '[Auth] Login Fail',
  SIGNUP_START = '[Auth] Signup Start',
  LOGOUT = '[Auth] Logout',
}

export const authenticateSuccess = createAction(
  ActionType.AUTHETICATE_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const loginStart = createAction(
  ActionType.LOGIN_START,
  props<{ email: string; password: string }>()
);

export const logout = createAction(ActionType.LOGOUT);

export const authenticateFail = createAction(
  ActionType.AUTHETICATE_FAIL,
  props<{ error: string }>()
);

export const signupStart = createAction(
  ActionType.SIGNUP_START,
  props<{ email: string; password: string }>()
);
