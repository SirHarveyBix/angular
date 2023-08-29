import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment } from './counter.action';
import { tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  /* 
  // older versions :
  @Effect({ dispatch: false })
    saveCount = this.actions$.pipe(
  */
  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)), // get latest value
        // tap(action)=> {
        tap(([action, counter]) => {
          console.log(action);
          localStorage.setItem('count', String(counter));
        })
      ),
    { dispatch: false } // does not dispatch a new action once it is done
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}
}
