import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService implements OnInit{

  private recipes: Recipe[] = [
    new Recipe(
      'Gajar Ka Halwa', 
      'A Desert recipe', 
      'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg',
      [
        new Ingredient('Carrot', 5),
        new Ingredient('Milk', 2),
        new Ingredient('Sugar', 2),
        new Ingredient('Khoya', 1),
        new Ingredient('Dry Fruits', 3)
      ]),
    new Recipe(
      'Walnut Salad', 
      'Light and healthy', 
      'https://images.pexels.com/photos/1646711/pexels-photo-1646711.jpeg',
      [
        new Ingredient('Wanuts',20),
        new Ingredient('Cheery Tomatoes',10),
        new Ingredient('Spinach',5),
      ])
  ];
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

}