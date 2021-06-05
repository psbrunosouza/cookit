
const ingredientReducer = (state: any = [], action: any) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return [...state, action.payload];

    case "REMOVE_INGREDIENT":
      return state.filter((state: any) => state.id !== action.payload);

    case "CLEAR": 
      return state = []

    default:
      return state
  }
};

export default ingredientReducer;
