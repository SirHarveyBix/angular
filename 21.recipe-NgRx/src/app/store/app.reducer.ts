import { ActionReducerMap } from '@ngrx/store';

import {
  shoppingListReducer,
  shoppingListState,
} from '../shopping-list/store/shoppping-list.reducer';
import { authReducer, AuthState } from '../auth/store/auth.reducer';
import { RecipesState, recipeReducer } from '../recipes/store/recipe.reducer';

export interface AppState {
  shoppingList: shoppingListState;
  auth: AuthState;
  recipes: RecipesState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipeReducer,
};
