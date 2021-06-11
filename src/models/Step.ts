export interface IStep{
  id: string,
  step: number, // 1
  description: string,
  timeToPrepare: number, // '5min' | '10min' | '15min' | '20min' | '25min' |
  method: string, // 'bake' | 'fridge' | 'fry' | 'cut' | 'cook' | 'boil'
  temperature: string, // 'low' | 'medium' | 'high'
}

// IF METHOD IS !== BAKE, TEMPERATURE BLOCKED
