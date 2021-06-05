import { IRecipes } from "../models/Recipe";
import { IIngredient } from "../models/Ingredient";
import AsyncStorage from "@react-native-async-storage/async-storage";

class IngredientService {

  async create(recipe: IRecipes, ingredients: IIngredient[]): Promise<void> {
    try{
      // const object = await AsyncStorage.getItem(recipeId) as string;
      // const recipe: IRecipes = JSON.parse(object);

      ingredients.forEach((ingredient) => {
        recipe.ingredients.push(ingredient);
      });

      await AsyncStorage.setItem(recipe.id, JSON.stringify(recipe));
    }catch(e){
      console.log(e);
    }
  }

  async update(recipeId: string, ingredients: IIngredient[] ): Promise<void> {
    try{
      const object = await AsyncStorage.getItem(recipeId) as string;
      const recipe: IRecipes = JSON.parse(object);

      recipe.ingredients = [];

      ingredients.forEach((ingredient) => {
        recipe.ingredients.push(ingredient);
      });

      await AsyncStorage.setItem(recipeId, JSON.stringify(recipe));
    }catch(e){
      console.log(e);
    }
  }
}

export { IngredientService }
