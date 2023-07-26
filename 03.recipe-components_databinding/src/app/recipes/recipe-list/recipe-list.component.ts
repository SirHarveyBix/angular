import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'a Test Recipe',
      'this is a test',
      'https://static01.nyt.com/images/2022/09/29/dining/afg-ricotta-polpette/merlin_213671208_2553d655-4170-4155-acdf-5fca2ce34a06-articleLarge.jpg'
    ),
    new Recipe(
      'another Test Recipe',
      'this is a new test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
    ),
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
