import { Action, createReducer, on } from '@ngrx/store';
import {
  updateIngredient,
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
} from './shopping-list.action';
import { Ingredient } from 'src/app/shared/ingredient.module';

export interface shoppingListState {
  ingredients: Ingredient[];
  editIndex: number;
}

const initialState: shoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editIndex: -1,
};

const _shoppingListReducer = createReducer(
  initialState,

  on(addIngredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(action.ingredient),
  })),
  on(addIngredients, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(...action.ingredients),
  })),
  on(updateIngredient, (state, action) => ({
    ...state,
    editIndex: -1,
    ingredients: state.ingredients.map((ingredient, index) =>
      index === state.editIndex ? { ...action.ingredient } : ingredient
    ),
  })),

  on(deleteIngredient, (state) => ({
    ...state,
    editIndex: -1,
    ingredients: state.ingredients.filter(
      (_, index) => index !== state.editIndex
    ),
  })),

  on(startEdit, (state, action) => ({
    ...state,
    editIndex: action.index,
  })),

  on(stopEdit, (state) => ({
    ...state,
    editIndex: -1,
  }))
);

export function shoppingListReducer(state: shoppingListState, action: Action) {
  return _shoppingListReducer(state, action);
}
