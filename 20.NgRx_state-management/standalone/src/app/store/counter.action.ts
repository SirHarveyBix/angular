import { createAction, props } from '@ngrx/store';

export enum ActionType {
  INCREMENT = '[Counter] Increment',
  DECREMENT = '[Counter] Decrement',
  INIT = '[Counter] Init',
  SET = '[Counter] Set',
}

export const init = createAction(ActionType.INIT);

export const set = createAction(ActionType.SET, props<{ value: number }>());

export const increment = createAction(
  ActionType.INCREMENT,
  props<{ value: number }>()
);

export const decrement = createAction(
  ActionType.DECREMENT,
  props<{ value: number }>()
);
