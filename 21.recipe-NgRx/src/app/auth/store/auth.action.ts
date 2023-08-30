import { createAction, props } from '@ngrx/store';

export enum ActionType {
  LOGIN = '[Auth] Login',
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
