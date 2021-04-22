import { RecipesProps } from '../models/Recipe'
import AsyncStorage from '@react-native-async-storage/async-storage';

class RecipeService {


    async create(recipe: RecipesProps): Promise<void> {
        await AsyncStorage.setItem(recipe.id, JSON.stringify(recipe))

    }

    async show(): Promise<any> {
        // const keys = await AsyncStorage.getAllKeys();
        // const result = await AsyncStorage.multiGet(keys);
        // return result

        // const keys = await AsyncStorage.getAllKeys()
        // const itemsArray = await AsyncStorage.multiGet(keys)
        // let object[] = []
        // itemsArray.map(item => {
        //     object.push(item[1])
        // })
        // return object

        // const result: any = {};
        // const keys = await AsyncStorage.getAllKeys();
        // for (const key of keys) {
        //     const val = await AsyncStorage.getItem(key);
        //     result[key] = val;
        // }
        // return JSON.stringify(result);

       
    }
}
export { RecipeService }