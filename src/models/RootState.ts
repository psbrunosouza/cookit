import { IIngredient } from "./Ingredient";
import { IRecipes } from "./Recipe";
import { IStep } from "./Step";


interface RootState{
    recipeReducer: IRecipes,
    ingredientReducer: IIngredient[],
    stepReducer: IStep[],
  }

  export default RootState;