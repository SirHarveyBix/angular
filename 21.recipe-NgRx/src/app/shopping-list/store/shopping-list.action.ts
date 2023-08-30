import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.module';

export enum ActionType {
  ADD_ONE = '[Shopping List] Add Ingredient',
  ADD_MANY = '[Shopping List] Add Ingredients',
  UPDATE = '[Shopping List] Update Ingredient',
  DELETE = '[Shopping List] Delete Ingredient',
  START_EDIT = '[Shopping List] Start Edit',
  STOP_EDIT = '[Shopping List] Stop Edit',
}

export const addIngredient = createAction(
  ActionType.ADD_ONE,
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  ActionType.ADD_MANY,
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredient = createAction(
  ActionType.UPDATE,
  props<{ ingredient: Ingredient }>()
);

export const deleteIngredient = createAction(ActionType.DELETE);

export const startEdit = createAction(
  ActionType.START_EDIT,
  props<{ index: number }>()
);

export const stopEdit = createAction(ActionType.STOP_EDIT);
