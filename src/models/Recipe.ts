import {Ingredient} from './Ingredient';
import {Step} from './Step';

export interface RecipesProps{
  id: string,
  title: string, 
  description: string,
  imagePath: string,
  ingredients: Ingredient[],
  steps: Step[]
}