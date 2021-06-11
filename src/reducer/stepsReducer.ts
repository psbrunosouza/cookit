
const stepReducer = (state: any = [], action: any) => {
    switch (action.type) {
      case "ADD_STEP":
        return [...state, action.payload];

      case "CREATE_STEP_LIST":
        return state = action.payload;
  
      case "REMOVE_STEP":
        return state.filter((state: any) => state.id !== action.payload);
  
      case "CLEAR": 
        return state = []
  
      default:
        return state
    }
  };
  
  export default stepReducer;
  