import { IRecipes } from "../models/Recipe";
import api from './api'

class RecipeService {
  async create(recipe: IRecipes) {
  const createdRecipe =  await api.post('/recipes', recipe)
    return createdRecipe;
  }

  async index() {
    const showAllRecipes = await api.get('/recipes')
    return showAllRecipes;
  }

  async show(id: string | number) {
    const showRecipe = await api.get(`/recipes/${id}`)
    return showRecipe;
  }

  async remove(id: string | number) {
    const removeRecipe = await api.delete(`/recipes/${id}`)
    return removeRecipe;
  }

  async put(id: string | number,  data: IRecipes) {
    const uptadeRecipe = await api.put(`/recipes/${id}`, data)
    return uptadeRecipe;
  }
}

export { RecipeService };
