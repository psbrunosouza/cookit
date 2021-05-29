import {IIngredient} from './Ingredient';
import {IStep} from './Step';

export interface IRecipes{
  id: string,
  title: string,
  description: string,
  imagePath: string,
  portions: number, // 5
  favorite: boolean, // flag: true | false
  timeToPrepare: number,
  category: string, // vegan | brazilian
  mealCategory: string,
  ingredients: IIngredient[],
  steps: IStep[]
}

// TIME TO PREPARE SHOULD BE CALCULATED BASED ON STEPS TIME
// IF FAVORITED SORT RECIPES BY FAVORITE
