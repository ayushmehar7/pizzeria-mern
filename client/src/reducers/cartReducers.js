export const cartReducer = (state = {cart : []}, action) =>{
    switch(action.type){
        case "ADD_TO_CART" :{ 
        
        const filteredCart = state.cart.filter(item => item.id === action.payload.id)
        if(filteredCart.length){
            const originalItem = action.payload
            const ind = state.cart.findIndex(item=> item.id === action.payload.id)
            const newCart = [...state.cart]
            newCart[ind] = originalItem
            return {
                ...state,
                cart: newCart
            }
        }
        return {
            ...state,
            cart: [...state.cart, action.payload]
        }}
        case "DELETE_FROM_CART" : 
            const filteredCart = state.cart.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                cart: filteredCart
            }
        case "EMPTY_CART" : return {
            ...state,
            cart: []
        }
        default : return state
    }
}
