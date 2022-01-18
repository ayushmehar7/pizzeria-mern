import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPasswordAction, resetPasswordAction } from "../../actions/passwordResetActions";
import Loader from "../Loader/loader";

const ForgotPassword = ()=>{
    const {loading, mailSent, redirect} = useSelector(state => state.resetPasswordReducer)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [otp, setOTP] = useState("")
    const sendMail = ()=>{
        if(!email){
            toast.error("Enter a valid email")
            return
        }
        dispatch(forgotPasswordAction(email))
        setEmail("")
    }
    const resetPassword = ()=>{
        if(!newPassword || !otp){
            toast.error("Please enter the required fields")
            return
        }
        if(newPassword.length < 8){
            toast.error("Password should be at least 8 characters")
            return
        }
        dispatch(resetPasswordAction(newPassword, otp))
        setNewPassword("")
        setOTP("")
    }
    if(redirect){
        return <Redirect to="/login" />
    }
    if(loading){
        return <Loader />
    }
    return (
        <section className="container">
            <div className="row justify-content-center">
            <div className="col-md-5">
                {!mailSent ? 
                    (<div>
                        <h2 style={{fontSize: "35px"}}>Enter Your Email</h2>
                        <input type="text" onChange={(e)=> setEmail(e.target.value)} placeholder = "Email" className="form-control" />
                        <button className="btn btn-danger" onClick={sendMail}>Reset Password</button>
                    </div>) : (<div>
                        <input type="text" onChange={(e)=> setOTP(e.target.value)} placeholder="OTP" className="form-control" />
                        <input type="password" onChange={(e)=> setNewPassword(e.target.value)} placeholder = "New Password" className="form-control" />
                        <button className="btn btn-danger" onClick={resetPassword}>Reset Password</button>
                    </div>)
                }
            </div>
            </div>
        </section>
    )
}

export default ForgotPassword;