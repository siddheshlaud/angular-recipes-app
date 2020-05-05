import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    this.shoppingListService.addItemToShoppingList(new Ingredient(nameInput.value, amountInput.valueAsNumber));
  }

}
