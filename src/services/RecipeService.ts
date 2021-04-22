import { RecipesProps } from '../models/Recipe'
import AsyncStorage from '@react-native-async-storage/async-storage';

class RecipeService {

    async create(recipe: RecipesProps): Promise<void> {
        try {
            await AsyncStorage.setItem(recipe.id, JSON.stringify(recipe));
        } catch (e) {
            console.log(e);
        }
    }

    async show(): Promise<RecipesProps[]> {
        let object: RecipesProps[] = [];

        try {
            await AsyncStorage.getAllKeys().then(async keys => {
                await AsyncStorage.multiGet(keys).then(key => {
                    key.forEach(data => {
                        object.push(JSON.parse(data[1] as string)); //values
                    });
                });
            });
        } catch (e) {
            console.log(e);
        }

        return object;
    }
}
export { RecipeService }