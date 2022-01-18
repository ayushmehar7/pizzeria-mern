import React, {useState} from "react";
import "./signup.css"
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux"
import { userSignUpAction } from "../../actions/userActions";
import { Redirect } from "react-router-dom";
import Loader from "../Loader/loader"

const Signup = ()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch()
    const {loading, redirect} = useSelector(state => state.userLoginReducer)
    const sendData = ()=>{
        let empty = ""
        if(!name){
            empty = "Name"
        }else if(!email){
            empty = "Email"
        }else if(!password){
            empty = "Password"
        }
        if(empty){
            toast.error(`Please provide a ${empty}`)
            return
        }
        if(password !== confirmPassword){
            toast.error("Passwords do not match")
        }else{
            const user = {
                name,
                email,
                password
            }
            dispatch(userSignUpAction(user))
            setName("")
            setEmail("")
            setPassword("")
        }
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
                    <h2 style={{fontSize: "35px"}}>Sign Up</h2>
                    <div>
                        <input type="text" placeholder = "Name" className="form-control" onChange={(e)=> setName(e.target.value)} />
                        <input type="text" placeholder = "Email" className="form-control" onChange={(e)=> setEmail(e.target.value)} />
                        <input type="password" placeholder = "Password" className="form-control" onChange={(e)=> setPassword(e.target.value)} />
                        <input type="password" placeholder = "Confirm Password" className="form-control" onChange={(e)=> setConfirmPassword(e.target.value)} />
                    </div>
                    <button onClick={sendData} className="btn btn-danger">Register</button>
                </div>
            </div>
        </section>
    )
}

export default Signup;