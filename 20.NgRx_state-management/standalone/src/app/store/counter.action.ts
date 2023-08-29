import { createAction, props } from '@ngrx/store';

export enum ActionType {
  INCREMENT = '[Counter] Increment',
  DECREMENT = '[Counter] Decrement',
}

export const increment = createAction(
  ActionType.INCREMENT,
  props<{ someValue: number }>()
);

export const decrement = createAction(
  ActionType.DECREMENT,
  props<{ decrementValue: number }>()
);
