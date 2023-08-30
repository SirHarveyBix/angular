import { createReducer, on } from '@ngrx/store';
import { addIngredient } from './shoppint-list-action';
import { Ingredient } from 'src/app/shared/ingredient.module';

const initialState = {
  ingredients: [new Ingredient('Apples', 10), new Ingredient('Tomatoes', 10)],
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient],
    };
  })
);
