import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import { deleteFromCartAction, cartActions, emptyCartAction } from "../../actions/cartActions";
import { payActions, verifyPaymentAction} from "../../actions/payActions";
import {Modal} from "react-bootstrap"
import {toast} from "react-toastify"
import "./cart.css"
import { Link } from "react-router-dom"
import Loader from "../Loader/loader"
import logo from "../../utils/logo.png"
import cookie from "js-cookie"

const Cart = ()=>{
    const [line1, setLine1] = useState("")
    const [line2, setLine2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("")
    const [showModal, setShowModal] = useState(false)
    const {cart} = useSelector(state => state.cartReducer)
    const {user} = useSelector(state => state.userLoginReducer)
    const {loading, rpInstance} = useSelector(state => state.paymentReducer)
    const token = cookie.get("jwt")
    const dispatch = useDispatch()
    const deleteFromCart = (item)=>{
        dispatch(deleteFromCartAction(item))
    }
    const getTotal = ()=>{
        const prices = cart.map(item => item.price)
        let price = 0
        prices.forEach(item => {
            price+= item
        });
        return price
    }
    const checkout = ()=>{
        if(cart.length === 0){
            toast.info("Cart is empty")
            return
        }
        if(!line1 || !city || !state || !pincode){
            toast.error("Please fill the complete address")
            return
        }
        setShowModal(false)
        dispatch(payActions(token, getTotal()))
    }

    const loadRP = ()=> {
        const {amount, currency, id: order_id} = rpInstance;
        const options = {
            key: "rzp_test_t6IxG9qrc35Jk1",
            amount: amount.toString(),
            currency,
            name: "Pizzeria",
            description: "Best Pizzas delivered to you instantly",
            image: logo,
            order_id,
            handler: function(response){
                const order = {
                    items: cart,
                    price: getTotal(),
                    address: {
                        addressLine1: line1,
                        addressLine2 : line2? line2 : undefined,
                        city,
                        state,
                        pincode
                    },
                }
                const rpData = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                }
                dispatch(verifyPaymentAction(token, order, rpData))
                dispatch(emptyCartAction())
                setLine1("")
                setLine2("")
                setCity("")
                setState("")
                setPincode("")
            },  
            theme: {
                color: "#DD4145"
            }
        }
        const paymentWindow = new window.Razorpay(options)
        paymentWindow.open()
    }

    if(rpInstance){
        loadRP()
    }
    if(loading){
        return <Loader />
    }
    return(
        <React.Fragment>
            <section className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 style={{fontSize: "40px"}}>My Cart</h2>
                        {cart.map((item, i) => (
                            <div className="d-flex justify-content-between shadow-sm p-3 mb-5 bg-white rounded" key={i}>
                                <div className="d-flex flex-column">
                                    <div>
                                        <h1>{item.name} {`[${item.varient}]`}</h1>
                                    </div>
                                    <div>
                                        <h1>Price : ₹ {item.price}</h1>
                                    </div>
                                    <div>
                                        <h1>Quantity : <i onClick={()=>{
                                            item._id = item.id
                                            if(item.quantity +1 > 10){
                                                toast.error("Cannot add more than 10 items!")
                                            }else{
                                                dispatch(cartActions(item, item.quantity+1, item.varient))
                                            }
                                        }} style={{color: "green"}} className="fa fa-plus" aria-hidden="true"/>
                                        <span style={{marginLeft: "10px", marginRight: "10px"}}>{item.quantity}</span>
                                        <i onClick={()=>{
                                            item._id = item.id
                                            if(item.quantity - 1 === 0){
                                                dispatch(deleteFromCartAction(item))
                                            }else{
                                                dispatch(cartActions(item, item.quantity-1, item.varient))
                                            }
                                        }} style={{color: "red"}} className="fa fa-minus" aria-hidden="true"/>
                                        </h1> 
                                    </div>
                                </div>
                                <div>
                                    <img src={item.image} alt="cart-pizza" height="100px" width="100px" />
                                    <i onClick={()=> deleteFromCart(item)} style={{marginLeft: "15px", color: "red"}} className="fas fa-trash"/>
                                </div>
                            </div>
                        ))}
                        </div>
                    <div className="col-md-4">
                        <div style={{marginLeft: "50px"}} >
                            <h2 style={{fontSize: "40px"}}>SubTotal</h2>
                            <h2 style={{fontSize: "40px"}}>₹ {getTotal()}</h2>
                            {user ? <React.Fragment><button className="btn btn-danger" onClick={()=> {
                                if(cart.length === 0){
                                    toast.info("Cart is empty")
                                    return
                                }
                                setShowModal(true)
                            }} ><i style={{marginRight: "5px"}} className="fas fa-shopping-cart" />CHECKOUT</button></React.Fragment> : <Link to="/login"><button className="btn btn-danger">LOGIN</button></Link>}
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={showModal} onHide={()=> setShowModal(false)}>
                <Modal.Header closeButton>  
                    <Modal.Title>Enter address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-12">
                        <input type="text" placeholder = "Address Line 1" className="form-control" onChange={(e)=> setLine1(e.target.value)} />
                        <input type="text" placeholder = "Address Line 2" className="form-control" onChange={(e)=> setLine2(e.target.value)} />
                        <input type="text" placeholder = "City" className="form-control" onChange={(e)=> setCity(e.target.value)} />
                        <input type="text" placeholder = "State" className="form-control" onChange={(e)=> setState(e.target.value)} />
                        <input type="text" placeholder = "PIN Code" className="form-control" onChange={(e)=> setPincode(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={checkout}>Place Order</button>                 
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default Cart