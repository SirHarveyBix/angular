import { createSelector } from '@ngrx/store';

// define the selector
export const selectCount = (state: { counter: number }) => state.counter;

export const selectDoubleCount = (state: { counter: number }) =>
  state.counter * 2;

export const selectorDoubleCount = createSelector(
  selectCount,
  (state: number) => state * 2
);
