import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { userLoginAction } from "../../actions/userActions";
import Loader from "../Loader/loader"
import {toast} from "react-toastify"
import "./login.css"

const Login = ()=>{
    const {user, loading} = useSelector(state => state.userLoginReducer) 
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const dispatch = useDispatch()
    const login = ()=>{
        if(!email || !password){
            toast.error("Please fill every field")
            return
        }
        const userReq = {email, password}
        dispatch(userLoginAction(userReq))
        setEmail("")
        setPassword("")
    }
    if(user){
        return <Redirect to="/" />
    }
    if(loading){
        return <Loader />
    }
    return (
        <section className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h2 style={{fontSize: "35px"}}>Login</h2>
                    <div>
                        <input type="text" placeholder = "Email" className="form-control" onChange={(e)=> setEmail(e.target.value)} />
                        <input type="password" placeholder = "Password" className="form-control" onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-danger"onClick={login} >Login</button>
                    <Link to="/forgotPassword"><button style={{marginLeft: "20px"}} className="btn btn-danger">Forgot Password</button></Link>
                    <Link to="/signup"><h1 style={{marginTop: "20px"}}>Click here to register</h1></Link>
                </div>
            </div>
        </section>
    )
}

export default Login;