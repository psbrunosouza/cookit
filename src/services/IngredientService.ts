import { IIngredient } from "../models/Ingredient";
import { Ingredients } from '../models/ingredients';
import api from './api';

class IngredientService {
  
  create(ingredients: Ingredients) {
    api.post("/ingredients", ingredients).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    })
  }
}

export { IngredientService }
