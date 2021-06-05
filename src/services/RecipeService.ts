import { IRecipes } from "../models/Recipe";
import api from './api'

class RecipeService {
  create(recipe: IRecipes) {
    api.post('/recipes', recipe)
      .then((recipe) => {
        console.log(recipe)
      }).catch((err) => console.log(err))
  }
}

export { RecipeService };
