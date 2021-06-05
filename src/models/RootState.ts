import { IIngredient } from "./Ingredient";
import { IRecipes } from "./Recipe";


interface RootState{
    ingredientReducer: IIngredient[],
    recipeReducer: IRecipes,
  }

  export default RootState;