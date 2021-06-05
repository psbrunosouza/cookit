import { IRecipes} from '../models/Recipe';

const createRecipeActions = (Recipe: IRecipes ) => {
    return {type: 'ADD_RECIPE', payload: Recipe}
}

const removeRecipeActions = () => {
    return {type: 'REMOVE_RECIPE'}
}
export { createRecipeActions, removeRecipeActions };