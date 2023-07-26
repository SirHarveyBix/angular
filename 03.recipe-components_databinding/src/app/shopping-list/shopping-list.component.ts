import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.module';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomatoes', 7),
  ];

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
