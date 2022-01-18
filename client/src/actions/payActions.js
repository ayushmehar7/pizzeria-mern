import { loadScript } from "../utils/loadScript"
import {API_ENDPOINT} from "../utils/api"
import axios from "axios"
import { toast } from "react-toastify"

export const payActions = (token, price) => async dispatch=>{
    dispatch({
        type: "RAZORPAY_REQUEST"
    })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    let rpInstance;
    try{
        rpInstance = await axios.post(`${API_ENDPOINT}/orders/pay`, {
            amount: price
        }, config)   
    }catch(err){
        toast.error(err.response.data.message)
        dispatch({
            type: "RAZORPAY_REQUEST_FAILED"
        })
    }
    if(!res || !rpInstance){
        toast.error("Error contacting payment gateway, try again!")
        dispatch({
            type: "RAZORPAY_REQUEST_FAILED"
        })
    }   
    dispatch({
        type: "RAZORPAY_REQUEST_SUCCESS",
        payload: rpInstance.data.order
    })
    dispatch({
        type: "RAZORPAY_REQUEST_COMPLETE",
    })
}

export const verifyPaymentAction  = (token, order, rpData)=> dispatch=>{
    dispatch({
        type: "PAYMENT_VERIFICATION_REQUEST"
    })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.post(`${API_ENDPOINT}/orders/verify`, {
        order,
        rpData
    },config).then(data => {
        toast.success("Payment Success")
        dispatch({
            type: "PAYMENT_VERIFICATION_SUCCESS"
        })
    }).catch(err => {
        toast.error(err.response.data.message)
        dispatch({
            type: "PAYMENT_VERIFICATION_FAILED"
        })
    })
}