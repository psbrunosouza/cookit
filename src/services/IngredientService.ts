import { Ingredients } from "../models/ingredients";
import api from "./api";

class IngredientService {
  async index() {
    const ingredients = api.get(`/ingredients`);
    return ingredients;
  }

  async create(ingredients: Ingredients) {
    api
      .post(`/ingredients`, ingredients)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async delete(ingredientId: string | number) {
    const deleteIngredients = await api.delete(`/ingredients/${ingredientId}`);
    return deleteIngredients;
  }

  async update(ingredientId: string | number, ingredients: Ingredients) {
    const updatedIngredients = await api.put(
      `/ingredients/${ingredientId}`,
      ingredients
    );
    return updatedIngredients;
  }
}

export { IngredientService };
