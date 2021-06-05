import { IIngredient } from "./Ingredient";

export interface Ingredients{
    id: string,
    recipeId: string,
    ingredients: IIngredient[]
}
  