export const orderReducer = (state={orders: []},action)=>{
    switch(action.type){
        case "GET_ORDERS_REQUEST":return {
            ...state,
            loading: true
        }
        case "GET_ORDERS_REQUEST_SUCCESS":return{
            ...state,
            loading: false,
            orders: action.payload
        }
        case "GET_ORDERS_REQUEST_FAILED":return{
            ...state,
            loading: false,
            error: true
        }
        default: return state;
    }
}