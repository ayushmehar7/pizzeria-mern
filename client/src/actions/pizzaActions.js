import {API_ENDPOINT} from "../utils/api"
import axios from "axios"
export const getAllPizzas =()=> dispatch=>{
    dispatch({
        type: "GET_PIZZAS_REQUEST"
    })
    axios.get(`${API_ENDPOINT}/pizzas`).then(res => {
        dispatch({
            type: "GET_PIZZAS_SUCCESS",
            payload: res.data.pizzas
        })
    }).catch(err => {
        dispatch({
            type: "GET_PIZZAS_FAILED",
            payload: err.response.data
        })
    })
}

export const filterPizzasAction = (name, category)=> (dispatch, getState)=>{
    dispatch({
        type: "FILTER_PIZZAS_REQUEST"
    })

    const {pizzas} = getState().getAllPizzasReducer
    let filteredPizzas = pizzas
    if(category !== 'all'){
        filteredPizzas = filteredPizzas.filter(pizza => pizza.category === category)
    }
    if(name){
        filteredPizzas = filteredPizzas.filter(pizza=> pizza.name.toLowerCase().indexOf(name) > -1)
    }
    dispatch({
        type: "FILTER_PIZZAS_REQUEST_SUCCESS",
        payload: filteredPizzas
    })

}