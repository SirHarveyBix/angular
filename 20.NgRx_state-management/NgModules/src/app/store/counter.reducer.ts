import { createReducer, on } from '@ngrx/store';
import { ActionType, decrement, increment, init, set } from './counter.action';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(set, (_state, action) => action.value)
);

// old version it is working too !
export function counterOldReducer(
  state = initialState,
  action: /*CounterAction*/ any
) {
  if (action.type === ActionType.INCREMENT) {
    return state + action.value;
  }
  if (action.type === ActionType.DECREMENT) {
    return state - action.value;
  }
  return state;
}
