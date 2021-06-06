import { IStep } from "./Step";

export interface Steps{
    id: string | number,
    recipeId: string,
    steps: IStep[]
}