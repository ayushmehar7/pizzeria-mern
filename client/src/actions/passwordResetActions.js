import axios from "axios"
import { toast } from "react-toastify"
import {API_ENDPOINT} from "../utils/api"
export const forgotPasswordAction = (email) => dispatch =>{
    dispatch({
        type: "FORGOT_PASSWORD_REQUEST"
    })
    axios.post(`${API_ENDPOINT}/users/forgotpassword`, {
        email
    }).then(res => {
        toast.info(res.data.message)
        dispatch({
            type: "FORGOT_PASSWORD_REQUEST_SUCCESS"
        })
    }).catch(err=>{
        toast.error(err.response.data.message)
        dispatch({
            type: "FORGOT_PASSWORD_REQUEST_FAILED"
        })
    })
}

export const resetPasswordAction = (newPassword, otp) => dispatch=>{
    dispatch({
        type: "RESET_PASSWORD_REQUEST"
    })
    axios.post(`${API_ENDPOINT}/users/resetpassword`, {newPassword, OTP:otp}).then(data =>{
        toast.success("Login using your new password")
        dispatch({
            type: "RESET_PASSWORD_REQUEST_SUCCESS"
        })
    }).catch(err=>{
        toast.error(err.response.data.message)
        dispatch({
            type: "RESET_PASSWORD_REQUEST_FAILED"
        })
    })
    dispatch({type: "RESET_PASSWORD_REQUEST_COMPLETED"})
}