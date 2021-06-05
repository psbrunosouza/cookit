import { IStep } from "./Step";

export interface Steps{
    id: string,
    recipeId: string,
    steps: IStep[]
}