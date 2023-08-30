import { createAction, props } from '@ngrx/store';

export enum ActionType {
  LOGIN = '[Auth] Login',
  LOGIN_START = '[Auth] Login Start',
  LOGIN_FAIL = '[Auth] Login Fail',
  LOGOUT = '[Auth] Logout',
}

export const login = createAction(
  ActionType.LOGIN,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const logout = createAction(ActionType.LOGOUT);

export const loginStart = createAction(
  ActionType.LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>()
);
