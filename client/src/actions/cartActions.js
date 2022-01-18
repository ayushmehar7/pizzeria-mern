export const cartActions = (pizza, quantity, varient) => (dispatch, getState) =>{
    const cartItem = {
        name : pizza.name,
        id: pizza._id,
        quantity: quantity,
        varient: varient,
        prices: pizza.prices,
        price: pizza.prices[varient]*quantity,
        image: pizza.image
    }
    dispatch({
        type: "ADD_TO_CART",
        payload: cartItem
    })
    const {cart} = getState().cartReducer
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const deleteFromCartAction = (item) => (dispatch, getState) =>{
    dispatch({
        type: "DELETE_FROM_CART",
        payload: item
    })
    const {cart} = getState().cartReducer
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const emptyCartAction = ()=> (dispatch)=>{
    dispatch({
        type: "EMPTY_CART"
    })
    localStorage.setItem('cart', JSON.stringify([]))
}