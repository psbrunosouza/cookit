import { IIngredient } from "./Ingredient";

export interface Ingredients{
    id: string | number,
    recipeId: string,
    ingredients: IIngredient[]
}
  