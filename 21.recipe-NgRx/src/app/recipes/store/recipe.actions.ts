import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum ActionType {
  SET_RECIPES = '[Recipe] Set Recipes',
  FETCH_RECIPES = '[Recipe] Fetch Recipes',
  STORE_RECIPES = '[Recipe] Store Recipes',
  ADD_RECIPE = '[Recipe] Add Recipe',
  UPDATE_RECIPE = '[Recipe] Update Recipe',
  DELETE_RECIPE = '[Recipe] Delete Recipe',
}

export const setRecipes = createAction(
  ActionType.SET_RECIPES,
  props<{
    recipes: Recipe[];
  }>()
);

export const fetchRecipes = createAction(ActionType.FETCH_RECIPES);

export const storeRecipes = createAction(ActionType.STORE_RECIPES);

export const addRecipe = createAction(
  ActionType.ADD_RECIPE,
  props<{
    recipe: Recipe;
  }>()
);

export const updateRecipe = createAction(
  ActionType.UPDATE_RECIPE,
  props<{
    index: number;
    recipe: Recipe;
  }>()
);

export const deleteRecipe = createAction(
  ActionType.DELETE_RECIPE,
  props<{
    index: number;
  }>()
);
