import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { of, Observable } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { fetchRecipes, setRecipes } from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class recipeResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> {
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => {
        return recipesState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(fetchRecipes());
          return this.actions$.pipe(
            ofType(setRecipes),
            take(1),
            map(() => recipes) // ?
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
