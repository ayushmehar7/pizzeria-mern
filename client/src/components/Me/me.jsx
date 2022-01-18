import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cookie from "js-cookie"
import { toast } from "react-toastify";
import { userEditAction, changeUserPasswordAction } from "../../actions/userActions";
import {Redirect} from "react-router-dom"
import Loader from "../Loader/loader"

const Me = ()=>{
    const {user, loading} = useSelector(state => state.userLoginReducer)
    const dispatch = useDispatch()
    useEffect(()=>{ 
        if(user){
            document.getElementById("name").value = user.name
            document.getElementById("email").value = user.email
        }
    }, [user])
    const token = cookie.get("jwt")
    const [name, setName] = useState(user ? user.name : "")
    const [email, setEmail] = useState(user ? user.email : "")
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const editUser = ()=>{
        if(!name || !email){
            toast.error("Name or Email cannot be empty")
            return
        }
        const initialName = user.name
        const initialEmail = user.email
        dispatch(userEditAction(token, name, email))
        document.getElementById("name").value = initialName
        document.getElementById("email").value = initialEmail
    }
    const changePassword = ()=>{
        if(!newPassword){   
            toast.error("New Password cannot be empty")
            return
        }
        if(newPassword.length < 8){
            toast.error("Password should be at least 8 characters")
            return
        }
        if(!oldPassword || oldPassword.length < 8){
            toast.error("Enter current password")
            return
        }
        if(newPassword !== confirmNewPassword){
            toast.error("Passwords do not match")
            return  
        }
        if(newPassword === oldPassword){
            toast.error("New Password is the same")
            return
        }
        dispatch(changeUserPasswordAction(token, oldPassword, newPassword))
        setOldPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
    }
    if(!user){
        return <Redirect to="/login" />
    }
    if(loading){
        return <Loader />
    }
    return (
        <section className="container">
            <div className="row justify-content-around">
                <div className="col-md-5">
                    <h2 style={{fontStyle: "35px",marginBottom: "20px"}}>About </h2>
                    <div className="form-group">
                        <label style={{fontSize: "20px"}}>Name</label>
                        <input type="text" placeholder = "Name" className="form-control" onChange={(e)=> setName(e.target.value)} id="name" />
                    </div>
                    <div className="form-group">
                        <label style={{fontSize: "20px"}}>Email</label>
                        <input type="text" placeholder = "Email" className="form-control" onChange={(e)=> setEmail(e.target.value)} id="email" />
                    </div>
                    <button className="btn btn-danger" onClick={editUser}>Save Changes</button>
                </div>
                <div className="col-md-5">
                    <h2 style={{fontStyle: "35px",marginBottom: "20px"}}>Change Password</h2>
                    <input type="password" placeholder="Password" className="form-control" onChange={(e)=> setOldPassword(e.target.value)} />
                    <input type="password" placeholder="New Password" className="form-control" onChange={(e)=> setNewPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm New Password" className="form-control" onChange={(e)=> setConfirmNewPassword(e.target.value)} />
                    <button className="btn btn-danger" onClick={changePassword} >Change Password</button>
                </div>
            </div>
        </section>
    )
}

export default Me