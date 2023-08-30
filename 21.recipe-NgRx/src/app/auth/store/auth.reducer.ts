import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import { login, loginFail, loginStart, logout } from './auth.action';

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    );
    return { ...state, user };
  }),
  on(logout, (state) => ({ ...state, user: null })),
  on(loginStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),
  on(loginFail, (state, action) => {
    return {
      ...state,
      user: null,
      authError: action.error,
      loading: false,
    };
  })
);
