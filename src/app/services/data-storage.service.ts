import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from './recipes.service';
import { Recipe } from '../models/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) { }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    this.http.put(
      'https://angular-recipes-app-145d6.firebaseio.com/recipes.json',
      recipes
    ).subscribe(
      response=>{
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://angular-recipes-app-145d6.firebaseio.com/recipes.json'
    )
    .pipe(map(
      //map operator on observable is used create empty array ingredients property if ingredeients are not present 
      recipes=>{
        //map function of JS array which can traverse thru elements of an array
        return recipes.map(
          recipe=>{
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          }
        );
      }
    ), tap(recipes=>{
      this.recipesService.setRecipes(recipes);
    }));
  }


}