import React, { useState } from "react";
import cookie from "js-cookie"
import {useDispatch, useSelector} from "react-redux"
import Loader from "../Loader/loader"
import Error from "../Error/error"
import {orderAction} from "../../actions/orderActions"
import { useEffect } from "react";
import "./order.css"
import {Modal} from "react-bootstrap"
import { Redirect } from "react-router-dom";
import OrderDetail from "../OrderDetail/orderDetail";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"]


const Order = ()=>{
    const dispatch = useDispatch()
    const token = cookie.get("jwt")
    const {user} = useSelector(state => state.userLoginReducer)
    const {orders, error, loading} = useSelector(state => state.orderReducer)
    const [showModal, setShowModal] = useState(false)
    const [currItem, setCurrItem] = useState([])
    useEffect(()=>{
        if(user){
            dispatch(orderAction(token))
        }
    }, [])
    if(!user){
        return <Redirect to="/login" />
    }
    if(error){
        return <Error />
    }
    if(loading){
        return <Loader />
    }
    const showDate = (d)=>{
        const date = new Date(d)
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0'+minutes : minutes;
        const time = hours + ':' + minutes + ' ' + ampm;
        const r = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} ${time}`
        return r
    }
    return (
        <React.Fragment>
        <div className="section">
            <div className="container">
                <h2 style={{fontSize: "35px"}}>My Orders</h2>
                <div className="row">
                    {orders.map((order, i) => (
                        <div key={i} className="order-container" style={{cursor: "pointer"}} onClick={()=> {
                            setShowModal(true)
                            setCurrItem(order.items)
                            }}>
                            <div className="col-md-4">
                                <h1>Items</h1>
                                {order.items.map(({name, varient, quantity}, i)=> <p key={i}>{`${name} (${varient}) - ${quantity}`}</p>)}
                            </div>
                            <div className="col-md-4">
                                <h1>Address</h1>
                                <p>{order.address.addressLine1}</p>
                                {order.address.addressLine2 ? <p>{order.address.addressLine2}</p> : <></>}
                                <p>{order.address.city}</p>
                                <p>{order.address.state}</p>
                                <p>{order.address.pincode}</p>
                            </div>
                            <div className="col-md-4">
                                <h1>Order Info</h1>
                                <p>Amount: ₹{order.price}</p>
                                <p>Date: {showDate(order.createdAt)} </p>
                                <p>Order ID: {order._id}</p>
                                <p>Transaction ID: {order.transactionID}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <OrderDetail currItem={currItem} show={showModal} handleClose={()=> setShowModal(false)} handleButton = {()=> setShowModal(false)} />
        </React.Fragment>
    )
}

export default Order