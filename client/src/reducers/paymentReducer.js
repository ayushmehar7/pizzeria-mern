export const paymentReducer = (state={}, action)=>{
    switch(action.type){
        case "RAZORPAY_REQUEST": return{
            ...state,
            loading: true,
        }
        case "RAZORPAY_REQUEST_SUCCESS": return{
            ...state,
            loading: false,
            rpInstance: action.payload,
        }
        case "RAZORPAY_REQUEST_FAILED": return{
            ...state,
            loading: false,
            rpInstance: undefined
        }
        case "RAZORPAY_REQUEST_COMPLETE": return{
            ...state,
            loading:false,
            rpInstance: undefined
        }
        case "PAYMENT__VERIFICATION_REQUEST" : return{
            ...state,
            rpInstance: undefined,
            loading: true
        }
        case "PAYMENT_VERIFICATION_SUCCESS": return {
            ...state,
            loading: false,
            rpInstance: undefined
        }
        case "PAYMENT_VERIFICATION_FAILED": return {
            ...state,
            loading: false,
            rpInstance: undefined
        }
        default : return state
    }
}