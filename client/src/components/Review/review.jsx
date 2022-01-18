import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/loader";
import Error from "../Error/error";
import cookie from "js-cookie";
import { deleteReviewAction, editReviewAction, getReviewAction } from "../../actions/userReviewAction";
import { Redirect } from "react-router-dom";
import {Modal} from "react-bootstrap"
import { toast } from "react-toastify";

const Review = ()=>{
    const token = cookie.get("jwt")
    const {reviews, loading, error} = useSelector(state => state.userReviewReducer)
    const {user} = useSelector(state => state.userLoginReducer)
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [id, setId] = useState("")
    const [text, setText] = useState("")
    const [rating, setRating] = useState("")
    const dispatch = useDispatch()
    useEffect(()=>{
        if(user){
            dispatch(getReviewAction(token))   
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
    const deleteReview = ()=>{
        dispatch(deleteReviewAction(token, id))
        setShowDelete(false)
    }
    const editReview = ()=>{
        if(!text){
            toast.error("Review cannot be empty")
            return
        }
        if(rating === 0 || rating > 5 || rating < 1){
            toast.error("Provide a valid rating!")
            return
        }
        dispatch(editReviewAction(token, id, text, rating))
        setText("")
        setRating(0)
        setShowEdit(false)
        setId("")
    }
    return(
        <React.Fragment>
            <div className="section">
                <div className="container">
                    <h2 style={{fontSize: "35px"}}>My Reviews</h2>
                    <div className="row">
                        {reviews ? reviews.map((review, i) => (
                        <div key={i} className="col-md-8 d-flex justify-content-around align-items-center shadow p-3 mb-5 bg-white rounded">
                            <div>
                                {review.text}
                            </div>
                            <div>
                                <i className="fas fa-star"/> {review.rating}/5
                            </div>
                            <div>
                                <img src={review.pizza.image} width="75px" height="75px" alt="pizza" />
                            </div>
                            <div>
                                <button style={{marginRight: "10px"}} onClick={()=> {
                                    setId(review._id)
                                    setShowEdit(true)
                                }} className="btn btn-danger"><i className="fa fa-pencil" /></button>
                                <button onClick={()=> {
                                    setId(review._id)
                                    setShowDelete(true)
                                    }} className="btn btn-danger"><i className="fa fa-trash" /></button>
                            </div>
                        </div>)) : ""}
                    </div>
                </div>
            </div>
            <Modal show={showDelete} onHide={()=> setShowDelete(false)}>
                <Modal.Header closeButton>
                    Delete Review
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your review?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={deleteReview} >Confirm</button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEdit} onHide={()=> setShowEdit(false)}>
                <Modal.Header closeButton>
                    Edit Review
                </Modal.Header>
                <Modal.Body>
                    <div className="w-75">
                        <input className="form-control" type="text" placeholder="Review" onChange={(e)=> setText(e.target.value)} />
                        <input className="form-control" type="number" placeholder="Rating" onChange={(e)=> setRating(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={editReview} >Confirm</button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default Review;