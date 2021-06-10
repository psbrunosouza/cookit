import { Ingredients } from '../models/ingredients';
import api from './api';

class IngredientService {
  
  create(id: string, ingredients: Ingredients) {
    api.post(`/ingredients`, ingredients).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    })
  }
}

export { IngredientService }
