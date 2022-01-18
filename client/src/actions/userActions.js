import axios from "axios"
import { API_ENDPOINT } from "../utils/api"
import cookie from "js-cookie"
import { toast } from "react-toastify"
export const userLoginAction = (user)=> dispatch=>{
    dispatch({
        type: "USER_LOGIN_REQUEST"
    })
    axios.post(`${API_ENDPOINT}/users/login`, user).then(res => {
        dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: res.data.user
        })
        res.data.user._id = undefined
        res.data.user.__v = undefined
        res.data.user.isadmin = undefined
        localStorage.setItem("user", JSON.stringify(res.data.user))
        cookie.set("jwt", res.data.token)
    }).catch(err => {
        dispatch({
            type: "USER_LOGIN_FAILED",
        })
        toast.error(err.response.data.message)
    })
}
export const userLogOutAction = ()=> dispatch=>{
    dispatch({
        type: "USER_LOGOUT"
    })
    localStorage.removeItem('user')
    cookie.remove("jwt")
} 

export const userSignUpAction = (user) => dispatch=>{
    dispatch({
        type: "USER_SIGNUP_REQUEST"
    })
    axios.post(`${API_ENDPOINT}/users/signup`, user).then(()=>{
        toast.success("User Registered, please login with your registered email")
        dispatch({
            type: "USER_SIGNUP_SUCCESS"
        })
    }).catch(err =>{
        toast.error(err.response.data.message)
        dispatch({
            type: "USER_SIGNUP_FAILED"
        })
    })
    dispatch({
        type: "USER_SIGNUP_COMPLETED"
    })
}

export const userEditAction = (token, name, email)=> dispatch=>{
    dispatch({
        type: "USER_EDIT_REQUEST"
    })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.patch(`${API_ENDPOINT}/users/`, {name, email}, config).then((res)=>{
        toast.success("User data changed")
        dispatch({
            type: "USER_EDIT_REQUEST_SUCCESS",
            payload: res.data.user
        })
        res.data.user._id = undefined
        res.data.user.__v = undefined
        res.data.user.isadmin = undefined
        localStorage.setItem("user", JSON.stringify(res.data.user))
    }).catch(err=>{
        toast.error(err.response.data.message)
        dispatch({
            type: "USER_EDIT_REQUEST_FAILED"
        })
    })
}

export const changeUserPasswordAction = (token, oldPassword, newPassword)=> dispatch=>{
    dispatch({
        type: "USER_PASSWORD_CHANGE_REQUEST"
    })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.patch(`${API_ENDPOINT}/users/changepassword`, {oldPassword, newPassword}, config).then(()=>{
        toast.success("Password Changed Success")
        dispatch({
            type: "USER_PASSWORD_CHANGE_REQUEST_SUCCESS"
        })
    }).catch(err =>{
        toast.error(err.response.data.message)
        dispatch({
            type: "USER_PASSWORD_CHANGE_REQUEST_FAILED"
        })
    })
}