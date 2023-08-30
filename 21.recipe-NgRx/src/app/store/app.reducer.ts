import { ActionReducerMap } from '@ngrx/store';

import {
  shoppingListReducer,
  State,
} from '../shopping-list/store/shoppping-list.reducer';
import { authReducer, AuthState } from '../auth/store/auth.reducer';

export interface AppState {
  shoppingList: State;
  auth: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
};
