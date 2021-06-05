import { IIngredient } from "../models/Ingredient";

const ingredientAddAction = (ingredient: IIngredient) => {
  return {type: "INSERT_INGREDIENT", payload: ingredient}
}

const ingredientCreateListAction = (ingredient: IIngredient[]) => {
  return {type: "CREATE_INGREDIENTS_LIST", payload: ingredient}
}

const ingredientRemoveAction = (id: string) => {
  return {type: "REMOVE_INGREDIENT", payload: id}
}

const ingredientClearAction = () => {
  return {type: "CLEAR"}
}

export { ingredientAddAction, ingredientRemoveAction, ingredientCreateListAction, ingredientClearAction };