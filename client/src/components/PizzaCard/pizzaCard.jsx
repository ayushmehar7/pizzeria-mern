import React, {useState} from "react"
import {Modal} from "react-bootstrap"
import { useDispatch} from "react-redux"
import { cartActions } from "../../actions/cartActions"
import {toast} from "react-toastify"
import "./pizzaCard.css"
import PizzaReview from "../PizzaReview/pizzaReview"

const PizzaCard = ({pizza})=>{
    const [quantity, setQuantity] = useState(1)
    const [varient, setVarient] = useState("small") 
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const addToCart = ()=>{
        try{
            dispatch(cartActions(pizza, quantity, varient))
            toast.success("Added to cart")
        }catch(err){
            toast.error(err)
        }
    }
    return(
        <React.Fragment>
        <div className="col-md-4 p-3" >
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <h1>{pizza.name}</h1>
                <div className="text-center">
                    <img style={{cursor: "pointer"}} src={pizza.image} width="300px" height="300px" alt="pizza" className="img-fluid" onClick={()=> setShow(true)} />
                </div>
                <div className="flex-container">
                    <div className="m-1 w-100">
                        <p>Varients</p>
                        <select className="form-control" onChange={(e)=> setVarient(e.target.value)}>
                            {pizza.varients.map((v, i) => (
                                <option value={v} key = {i}>{v} </option>
                            ))}
                        </select>
                    </div>
                    <div className="m-1 w-100">
                        <p>Quantity</p>
                        <select className="form-control" onChange={(e)=> setQuantity(e.target.value)}>
                            {[...Array(10).keys()].map((i) => (
                                <option value={i+1} key = {i}>{i+1}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex-container">
                    <div className="m-1 w-100">
                        <h1 className="mt-2">Price : ₹ {pizza.prices[varient]*quantity}</h1>
                    </div>
                    <div className="m-1 w-100">
                        <button className="btn btn-danger" onClick={addToCart} >ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={()=> setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>{pizza.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <img src={pizza.image} alt="pizza" />
                </div>
                <hr className="solid" />
                <div>
                    {pizza.description}
                </div>
                <hr className="solid" />
                <div className="review-container">
                    {pizza.reviews.map((review, i) => <PizzaReview review={review} key={i} />)}
                </div>
            </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-danger" onClick={()=> setShow(false)}>Close</button>
            </Modal.Footer>
        </Modal>  
        </React.Fragment>
    )
}

export default PizzaCard;
