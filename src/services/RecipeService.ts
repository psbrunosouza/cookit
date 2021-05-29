import { IRecipes } from "../models/Recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStep } from "../models/Step";

class RecipeService {
  async create(id: string, recipe: IRecipes): Promise<void> {
    try {
      return await AsyncStorage.setItem(id, JSON.stringify(recipe));
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: string, recipe: IRecipes): Promise<void> {
    if(this.findById(id)){
      try {
        return await AsyncStorage.setItem(id, JSON.stringify(recipe));
      } catch (e) {
        console.log(e);
      }
    }
  }

  async findById(id: string): Promise<IRecipes> {
    let recipe: IRecipes = {} as IRecipes;

    try {
      if(await AsyncStorage.getItem(id) !== null){
        const object = await AsyncStorage.getItem(id);
        recipe = JSON.parse(object as string);
      }
    } catch (e) {
      console.log(e);
    }

    return recipe;
  }

  async replace(from: string, to: string): Promise<void>{
    const object: IRecipes = await this.findById(from);
    await this.create(to, object);
    await this.remove('@recipe');
  }

  async show(): Promise<IRecipes[]> {
    let object: IRecipes[] = [];

    if ((await AsyncStorage.getAllKeys()) !== null) {
      try {
        await AsyncStorage.getAllKeys().then(async (keys) => {
          if (keys[0] !== "@recipe") {
            await AsyncStorage.multiGet(keys).then((key) => {
              key.forEach((data) => {
                object.push(JSON.parse(data[1] as string)); //values
              });
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }

    return object;
  }

  async remove(id: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(id);
    } catch (e) {
      console.log(e);
    }
  }

  async getTimeToPrepare(id: string): Promise<number> {
    let recipe: IRecipes = {} as IRecipes;
    let time = 0;

    try {
      if(await AsyncStorage.getItem(id) !== null){
        const object = await AsyncStorage.getItem(id);
        recipe = JSON.parse(object as string);
      }
    } catch (e) {
      console.log(e);
    }

    recipe.steps?.map((step) => {
      time += step.timeToPrepare;
    });

    return time;
  } 
}
export { RecipeService };
