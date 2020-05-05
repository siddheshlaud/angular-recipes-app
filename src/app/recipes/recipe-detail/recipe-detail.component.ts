import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe:Recipe;
  id: number;

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(
      (params: Params)=>{
        this.id = + params['id'];
        this.selectedRecipe = this.recipesService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }
}
