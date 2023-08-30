import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addIngredient,
  deleteIngredient,
  stopEdit,
  updateIngredient,
} from '../store/shopping-list.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(updateIngredient({ ingredient: newIngredient }));
    } else {
      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
    this.store.dispatch(stopEdit());
  }

  onDelete() {
    this.store.dispatch(deleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(stopEdit());
  }
}
