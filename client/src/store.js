import {combineReducers} from 'redux'

import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"

import {composeWithDevTools} from "redux-devtools-extension"

import { getAllPizzasReducer } from './reducers/pizzaReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'
import { paymentReducer } from './reducers/paymentReducer'
import {orderReducer} from "./reducers/orderReducers"
import {resetPasswordReducer} from "./reducers/resetPasswordReducer"
import {userReviewReducer} from './reducers/userReviewReducers'

const finalReducer = combineReducers({
    getAllPizzasReducer,
    cartReducer,
    userLoginReducer,
    paymentReducer,
    orderReducer,
    resetPasswordReducer,
    userReviewReducer
})

const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const initialState = {
    cartReducer: {
        cart
    },
    userLoginReducer: {
        user
    },
    userReviewReducer: {
        reviews: []
    }
}

const composeEnhancers = composeWithDevTools({})

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store