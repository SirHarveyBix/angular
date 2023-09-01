import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.module';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { startEdit } from './store/shopping-list.action';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(startEdit({ index }));
  }
}
