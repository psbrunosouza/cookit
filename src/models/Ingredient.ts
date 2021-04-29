export interface IIngredient{
  id: string,
  name: string,
  quantity: number,
  unitMeasurement: string,
  withoutLactose: boolean,
  withoutGluten: boolean,
  recipeId: string
}
