import { IStep } from "../models/Step";
import { Steps} from '../models/steps';
import api from './api';

class StepService {

  create(id: string, steps: Steps) {
    api.post(`/recipes/${id}/steps`, steps).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    })
  }
}

export { StepService }
