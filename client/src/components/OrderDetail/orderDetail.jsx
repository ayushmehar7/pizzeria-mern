import React, { useState } from "react";
import {Modal} from "react-bootstrap"
import cookie from "js-cookie";
import Loader from "../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import {addReviewAction} from "../../actions/userReviewAction";
import { toast } from "react-toastify";


const OrderDetail = ({currItem, show, handleClose, handleButton})=>{
    const token = cookie.get("jwt")
    const [showR, setShowR] = useState(false)
    const [text, setText] = useState("")
    const [rating, setRating] = useState(0)
    const [pizza, setPizza] = useState("")
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.userReviewReducer)
    const addReview = ()=>{
        if(!text){
            toast.error("Review text cannot be empty")
            return 
        }
        if(rating === 0 || rating < 1 || rating > 5){
            toast.error("Provide a valid rating between 1 and 5")
            return 
        }
        dispatch(addReviewAction(token, text, pizza, rating))
        setText("")
        setRating(0)
        setPizza("")
        setShowR(false)
    }
    if(loading){
        return <Loader />
    }
    return(
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currItem.map((item, i) =>(<React.Fragment key={i}>
                        <div className="d-flex justify-content-around align-items-center">
                            <div>
                                {item.name}
                            </div>
                            <div>
                                <img src={item.image} width="75px" height="75px" alt="order-item" />
                            </div>
                            <div>
                                <button onClick={()=> {
                                    setShowR(true)
                                    setPizza(item.name)
                                    handleButton()
                                    }} className="btn btn-danger">Add Review</button>
                            </div>
                        </div>
                        <hr className="solid" />
                    </React.Fragment>))}
                </Modal.Body>
            </Modal>
            <Modal show={showR} onHide={()=> setShowR(false)}>
                <Modal.Header closeButton>
                        Add Pizza Review
                </Modal.Header>
                <Modal.Body>
                    <div className="w-75">
                        <input className="form-control" type='text' placeholder="Add Review" onChange={(e)=> setText(e.target.value)} />
                        <input className="form-control" type='number' step="0.1" placeholder="Rating" min="1" max="5" onChange={(e)=> setRating(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={addReview} >Add Review</button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default OrderDetail