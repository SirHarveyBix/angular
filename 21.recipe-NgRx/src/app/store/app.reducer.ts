import { shoppingListState } from '../shopping-list/store/shoppping-list.reducer';
import { AuthState } from '../auth/store/auth.reducer';
import { RecipesState } from '../recipes/store/recipe.reducer';

export interface AppState {
  shoppingList: shoppingListState;
  auth: AuthState;
  recipes: RecipesState;
}
