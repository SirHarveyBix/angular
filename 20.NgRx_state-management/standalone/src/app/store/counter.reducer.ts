import { createReducer, on } from '@ngrx/store';
import { ActionType, decrement, increment } from './counter.action';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.someValue),
  on(decrement, (state, action) => state - action.decrementValue)
);

// old version it is working too !
export function counterOldReducer(
  state = initialState,
  action: /*CounterAction*/ any
) {
  if (action.type === ActionType.INCREMENT) {
    return state + action.anyValue;
  }
  if (action.type === ActionType.DECREMENT) {
    return state - action.decrementValue;
  }
  return state;
}
