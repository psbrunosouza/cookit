import { IStep } from "../models/Step";

const stepAddAction = (step: IStep) => {
  return {type: "ADD_STEP", payload: step}
}

const stepRemoveAction = (id: string) => {
  return {type: "REMOVE_STEP", payload: id}
}

const stepClearAction = () => {
  return {type: "CLEAR"}
}

export { stepAddAction, stepRemoveAction, stepClearAction };