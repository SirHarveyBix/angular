import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
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

  getRecipes() {
    return this.recipes.slice();
  }
}
