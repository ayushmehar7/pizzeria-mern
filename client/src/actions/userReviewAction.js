import axios from "axios"
import { toast } from "react-toastify"
import { API_ENDPOINT } from "../utils/api"

export const addReviewAction = (token, text, pizza, rating)=> dispatch=>{
    dispatch({
        type: "ADD_REVIEW_REQUEST"
    })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.post(`${API_ENDPOINT}/reviews/`, {text, pizza, rating}, config).then(()=>{
        toast.success("Review added")
        dispatch({
            type: "ADD_REVIEW_REQUEST_SUCCESS"
        })
    }).catch(err =>{
        toast.error(err.response.data.message)
        dispatch({
            type: "ADD_REVIEW_REQUEST_FAILED"
        })
    })
}

export const getReviewAction = (token)=> dispatch=>{
    dispatch({
        type: "GET_REVIEWS_REQUEST"
    })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.get(`${API_ENDPOINT}/reviews/`, config).then(res=>{
        dispatch({
            type: "GET_REVIEWS_REQUEST_SUCCESS",
            payload: res.data.reviews
        })
    }).catch(err=>{
        toast.error(err.response.data.message)
        dispatch({
            type: "GET_REVIEWS_REQUEST_FAILED"
        })
    })
}

export const deleteReviewAction = (token, id)=> (dispatch, getState)=>{
    const {reviews} = getState().userReviewReducer
    dispatch({
        type: "DELETE_REVIEW_REQUEST"
    })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.delete(`${API_ENDPOINT}/reviews/${id}`, config).then(()=>{
        const newReviews = reviews.filter(r => r._id !== id)
        dispatch({
            type: "DELETE_REVIEW_REQUEST_SUCCESS",
            payload: newReviews
        })
    }).catch(err =>{
        toast.error(err.response.data.message)
        dispatch({
            type: "DELETE_REVIEW_REQUEST_FAILED"
        })
    })
}

export const editReviewAction = (token, id, text, rating)=> (dispatch, getState)=>{
    let {reviews} = getState().userReviewReducer
    dispatch({
        type: "EDIT_REVIEW_REQUEST"
    })
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.patch(`${API_ENDPOINT}/reviews/`,{id, text, rating} ,config).then((res)=>{
        const index = reviews.findIndex(r=> r._id === id)
        const newReview = res.data.review
        let newReviews = [...reviews]
        newReviews[index] = newReview
        dispatch({
            type: "EDIT_REVIEW_REQUEST_SUCCESS",
            payload: newReviews
        })
    }).catch(err =>{
        toast.error(err.response.data.message)
        dispatch({
            type: "EDIT_REVIEW_REQUEST_FAILED"
        })
    })
}