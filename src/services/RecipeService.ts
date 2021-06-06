import { IRecipes } from "../models/Recipe";
import api from './api'

class RecipeService {
  async create(recipe: IRecipes) {
  const createdRecipe =  await api.post('/recipes', recipe)
    return createdRecipe;
      // .then((recipe) => {
      //   console.log(recipe)
      // }).catch((err) => console.log(err))
  }

  async index() {
    const showAllRecipes = await api.get('/recipes')
    return showAllRecipes;
  }
}

export { RecipeService };
