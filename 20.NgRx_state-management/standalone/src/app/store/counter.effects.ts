import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, init, set } from './counter.action';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}

  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');
        if (storedCounter != null) {
          return of(set({ value: Number(storedCounter) }));
        }
        return of(set({ value: 0 }));
      })
    )
  );

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
}
