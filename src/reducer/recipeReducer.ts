const recipeReducer = (state: any = {} , action: any) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            return state = action.payload;

        case 'REMOVE_RECIPE':
            return state = {}

        default:
            return state
    }
}

export default recipeReducer;