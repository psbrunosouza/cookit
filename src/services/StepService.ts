import { IStep } from "../models/Step";
import { Steps} from '../models/steps';
import api from './api';

class StepService {

  create(steps: Steps) {
    api.post("/ingredients", steps).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    })
  }
}

export { StepService }
