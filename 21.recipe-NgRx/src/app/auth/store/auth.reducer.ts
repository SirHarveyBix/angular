import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import {
  authenticateFail,
  authenticateSuccess,
  clearError,
  loginStart,
  logout,
  signupStart,
} from './auth.action';

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

export const _authReducer = createReducer(
  initialState,
  on(loginStart, signupStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(authenticateSuccess, (state, action) => ({
    ...state,
    authError: null,
    loading: false,
    user: new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    ),
  })),
  on(logout, (state) => ({ ...state, user: null, loading: false })),
  on(authenticateFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.error,
    loading: false,
  })),
  on(clearError, (state) => ({
    ...state,
    authError: null,
  }))
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
