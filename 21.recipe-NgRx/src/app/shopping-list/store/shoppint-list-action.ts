import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.module';

export enum ActionType {
  ADD_INGREDIENT = '[Ingredient] ADD_INGREDIENT',
}

export const addIngredient = createAction(
  ActionType.ADD_INGREDIENT,
  props<{ ingredient: Ingredient }>()
);
