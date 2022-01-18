import axios from "axios"
import { toast } from "react-toastify"
import {API_ENDPOINT} from "../utils/api"

export const orderAction = (token)=> dispatch=>{
    dispatch({
        type: "GET_ORDERS_REQUEST"
    })

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    axios.get(`${API_ENDPOINT}/orders/`, config).then(res =>{
        dispatch({
            type: "GET_ORDERS_REQUEST_SUCCESS",
            payload: res.data.orders
        })
    }).catch(err =>{
        toast.error(err.response.data.message)
        dispatch({
            type: "GET_ORDERS_REQUEST_FAILED"
        })
    })
}