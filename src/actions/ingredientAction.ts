import { IIngredient } from "../models/Ingredient";

const ingredientAddAction = (ingredient: IIngredient) => {
  return {type: "ADD_INGREDIENT", payload: ingredient}
}

const ingredientRemoveAction = (id: string) => {
  return {type: "REMOVE_INGREDIENT", payload: id}
}

export { ingredientAddAction, ingredientRemoveAction };