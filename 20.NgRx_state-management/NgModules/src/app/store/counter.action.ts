import { createAction, props } from '@ngrx/store';

export const increment = createAction(
  '[Counter] Increment',
  props<{ anyValue: number }>()
);
export const decrement = createAction('[Counter] Decrement');
