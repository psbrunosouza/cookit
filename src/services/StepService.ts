import { Steps} from '../models/steps';
import api from './api';

class StepService {

  async index(){
    const steps = api.get(`/steps`);
    return steps;
  }
  
  async create(steps: Steps) {
    api.post(`/steps`, steps).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    })
  }

  async delete(id: string | number){
    const deletedStep = await api.delete(`/steps/${id}`);
    return deletedStep;
  }
}

export { StepService }
