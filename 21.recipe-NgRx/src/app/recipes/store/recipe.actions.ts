import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum ActionType {
  SET_RECIPES = '[Recipes] Set Recipes',
  FETCH_RECIPES = '[Recipes] Fetch Recipes',
  STORE_RECIPES = '[Recipe] Store Recipes',
}

export const setRecipes = createAction(
  ActionType.SET_RECIPES,
  props<{
    recipes: Recipe[];
  }>()
);

export const fetchRecipes = createAction(ActionType.FETCH_RECIPES);

export const storeRecipes = createAction(ActionType.STORE_RECIPES);
