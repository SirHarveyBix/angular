import { createReducer, on } from '@ngrx/store';
import { decrement, increment } from './counter.action';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.someValue),
  on(decrement, (state) => state - 1)
);

// old version it is working too !
export function counterOldReducer(state = initialState) {
  return state;
}
