export const getAllPizzasReducer = (state={pizzas: []}, action)=>{
    switch(action.type){
        case 'GET_PIZZAS_REQUEST': return {
            ...state,
            loading: true,
            error: false
        }
        case 'GET_PIZZAS_SUCCESS': return {
            pizzas: action.payload,
            loading: false,
            error: false
        }
        case 'GET_PIZZAS_FAILED': return {
            error: true,
            message: action.payload.message
        }
        case 'FILTER_PIZZAS_REQUEST': return {
            ...state,
            loading: true
        }
        case 'FILTER_PIZZAS_REQUEST_SUCCESS': return {
            ...state,
            loading: false,
            filteredPizzas: action.payload
        }
        default : return state
    }
}