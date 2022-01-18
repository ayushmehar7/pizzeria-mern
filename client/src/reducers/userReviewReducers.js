export const userReviewReducer = (state={reviews: []}, action)=>{
    switch(action.type){
        case "ADD_REVIEW_REQUEST": return {
            loading: true
        }
        case "ADD_REVIEW_REQUEST_SUCCESS": return {
            loading: false
        }
        case "ADD_REVIEW_REQUEST_FAILED": return {
            loading: false
        }
        case "GET_REVIEWS_REQUEST": return {
            loading: true
        }
        case "GET_REVIEWS_REQUEST_SUCCESS": return {
            loading: false,
            reviews: action.payload
        }
        case "GET_REVIEWS_REQUEST_FAILED": return {
            ...state,
            loading: false,
            error: true
        }
        case "DELETE_REVIEW_REQUEST": return {
            ...state,
            loading: true
        }
        case "DELETE_REVIEW_REQUEST_SUCCESS": return {
            ...state,
            loading: false,
            reviews: action.payload
        }
        case "DELETE_REVIEW_REQUEST_FAILED": return {
            ...state,
            loading: false
        }
        case "EDIT_REVIEW_REQUEST": return{
            ...state,
            loading: true
        }
        case "EDIT_REVIEW_REQUEST_SUCCESS": return {
            ...state,
            loading: false,
            reviews: action.payload
        }
        case "EDIT_REVIEW_REQUEST_FAILED": return {
            ...state,
            loading: false
        }
        default: return state
    }
}