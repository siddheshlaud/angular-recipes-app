import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingListUpdatedEvent: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addItemToShoppingList(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.shoppingListUpdatedEvent.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); //Spread operator
    this.shoppingListUpdatedEvent.next(this.ingredients.slice());
  }
}
