import { IRecipes } from "../models/Recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStep } from "../models/Step";

class StepService {

  async create(recipeId: string, steps: IStep[] ): Promise<void> {
    try{
      const object = await AsyncStorage.getItem(recipeId) as string;
      const recipe: IRecipes = JSON.parse(object);

      steps.forEach((step) => {
        recipe.steps.push(step)
      });

      await AsyncStorage.setItem(recipeId, JSON.stringify(recipe));
    }catch(e){
      console.log(e);
    }
  }

  async update(recipeId: string, steps: IStep[] ): Promise<void> {
    try{
      const object = await AsyncStorage.getItem(recipeId) as string;
      const recipe: IRecipes = JSON.parse(object);

      recipe.steps = [];

      steps.forEach((step) => {
        recipe.steps.push(step)
      });

      await AsyncStorage.setItem(recipeId, JSON.stringify(recipe));
    }catch(e){
      console.log(e);
    }
  }
}

export { StepService }
